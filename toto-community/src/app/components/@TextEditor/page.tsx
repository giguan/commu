"use client"; // Next.js 13 이상에서 클라이언트 전용으로 설정

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import CodeBlock from "@tiptap/extension-code-block";
import Blockquote from "@tiptap/extension-blockquote";
import TextAlign from "@tiptap/extension-text-align"; 
import HardBreak from "@tiptap/extension-hard-break";
import Placeholder from "@tiptap/extension-placeholder"; 
import { useEffect, useRef } from "react";

// 예쁜 아이콘 사용 (react-icons 라이브러리 활용)
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaImage,
} from "react-icons/fa";

interface TextEditorProps {
  value: string;
  onChange: any;
}

const TextEditor = ({ value = "", onChange }: TextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            class: "my-paragraph",
          },
        },
      }),
      HardBreak.extend({
        addKeyboardShortcuts() {
          return {
            Enter: () => this.editor.commands.setHardBreak(),
          };
        },
      }),
      Image.configure({
        inline: false,
        allowBase64: true,
        HTMLAttributes: {
          style: "display: block; margin: 0 auto; max-width: 100%; height:auto", // 이미지를 자동으로 가운데 정렬
        },
      }),
      Underline,
      Heading.configure({ levels: [1, 2, 3] }),
      Link,
      BulletList,
      OrderedList,
      ListItem,
      CodeBlock,
      Blockquote,
      TextAlign.configure({ types: ["heading", "paragraph", "image"] }),
      Placeholder.configure({
        placeholder: "클립보드에서 복사해서 업로드한 이미지는 썸네일 생성이 불가합니다!.", // 플레이스홀더 설정
        emptyEditorClass: 'cursor-text before:content-[attr(data-placeholder)] before:absolute before:top-2 before:left-2 before:text-gray-400 before:opacity-50',

      }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });


  const editorContainerRef = useRef(null);

  // Handle click outside the editor content to focus it
  const handleContainerClick = () => {
    if (editor) {
      editor.commands.focus();
    }
  };


  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result as string;
        editor?.chain().focus().setImage({ src: url }).run();
      };
      reader.readAsDataURL(files[0]);
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      {/* 툴바 구현 */}
      <div className="toolbar mb-4 flex space-x-2 bg-gray-100 p-2 rounded-md">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          <FaBold size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="px-3 py-1 rounded-md bg-green-500 text-white hover:bg-green-600 transition"
        >
          <FaItalic size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className="px-3 py-1 rounded-md bg-purple-500 text-white hover:bg-purple-600 transition"
        >
          <FaUnderline size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className="px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
        >
          <FaStrikethrough size={16} />
        </button>
        {/* 정렬 버튼 */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className="px-3 py-1 rounded-md bg-gray-500 text-white hover:bg-gray-600 transition"
        >
          <FaAlignLeft size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className="px-3 py-1 rounded-md bg-gray-500 text-white hover:bg-gray-600 transition"
        >
          <FaAlignCenter size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className="px-3 py-1 rounded-md bg-gray-500 text-white hover:bg-gray-600 transition"
        >
          <FaAlignRight size={16} />
        </button>
        {/* 이미지 업로드 */}
        <label className="px-3 py-1 rounded-md bg-gray-500 text-white hover:bg-gray-600 transition cursor-pointer">
          <FaImage size={16} />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* 에디터 컨텐츠 */}
      <div
        ref={editorContainerRef}
        onClick={handleContainerClick} // Focus the editor on click
        className="p-4 bg-white shadow-md rounded-md"
        style={{ minHeight: "300px", cursor: "text" }} // Cursor and height settings
      >
        <EditorContent
          editor={editor}
          className="editor-content border border-gray-300 rounded-md p-4 text-black whitespace-pre-line"
          style={{minHeight: '300px'}}
        />

      </div>

      <style jsx>{`
        .is-empty::before {
          content: attr(data-placeholder); /* Placeholder 텍스트 설정 */
          color: #999;  /* 텍스트 색상 회색 */
          font-style: italic; /* 기울임꼴로 설정 */
          position: absolute; /* 위치 고정 */
          top: 0; /* 위쪽에 배치 */
          left: 0; /* 왼쪽에 배치 */
          pointer-events: none; /* 클릭 불가 */
        }
      `}</style>

    </div>
  );
};

export default TextEditor;
