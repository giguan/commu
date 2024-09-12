"use client"; // Next.js 13 이상에서 클라이언트 전용으로 설정

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline"; // 밑줄 기능 추가
import Heading from "@tiptap/extension-heading"; // 헤딩 기능 추가
import Link from "@tiptap/extension-link"; // 링크 기능 추가
import BulletList from "@tiptap/extension-bullet-list"; // 불릿 리스트
import OrderedList from "@tiptap/extension-ordered-list"; // 번호 매긴 리스트
import ListItem from "@tiptap/extension-list-item"; // 리스트 아이템
import CodeBlock from "@tiptap/extension-code-block"; // 코드 블록
import Blockquote from "@tiptap/extension-blockquote"; // 블록 인용구
import { AiOutlineBold, AiOutlineItalic, AiOutlineUnderline, AiOutlineStrikethrough, AiOutlinePicture } from "react-icons/ai";
import { useEffect } from "react";

interface TextEditorProps {
  value: string;
  onChange: any;
}

const TextEditor = ({ value, onChange }: TextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,        // 이미지를 인라인으로 표시
        allowBase64: true,   // Base64 이미지를 허용
      }),
      Underline,
      Heading.configure({ levels: [1, 2, 3] }), // H1, H2, H3 사용 가능
      Link,
      BulletList,
      OrderedList,
      ListItem,
      CodeBlock,
      Blockquote,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);


  // 드래그 앤 드롭 핸들러
  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result as string; // Base64 URL
        editor?.chain().focus().setImage({ src: url }).run();
      };
      reader.readAsDataURL(files[0]);
    }
  };

  // 이미지 업로드 핸들러 (Base64)
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result as string; // Base64 URL
        editor?.chain().focus().setImage({ src: url }).run();
      };
      reader.readAsDataURL(files[0]);
    }
  };

  if (!editor) {
    return null; // editor가 null일 때 null 반환
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-md" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
      {/* 툴바 구현 */}
      <div className="toolbar mb-4 flex space-x-2 bg-gray-100 p-2 rounded-md">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          <AiOutlineBold size={20} /> {/* Bold 아이콘 */}
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="px-3 py-1 rounded-md bg-green-500 text-white hover:bg-green-600 transition"
        >
          <AiOutlineItalic size={20} /> {/* Italic 아이콘 */}
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className="px-3 py-1 rounded-md bg-purple-500 text-white hover:bg-purple-600 transition"
        >
          <AiOutlineUnderline size={20} /> {/* Underline 아이콘 */}
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className="px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
        >
          <AiOutlineStrikethrough size={20} /> {/* Strikethrough 아이콘 */}
        </button>
        {/* 이미지 추가 버튼 */}
        <label className="px-3 py-1 rounded-md bg-gray-500 text-white hover:bg-gray-600 transition cursor-pointer">
          <AiOutlinePicture size={20} />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* 텍스트 에리어 */}
      <EditorContent editor={editor} className="editor-content border border-gray-300 rounded-md p-4 text-black" />
    </div>
  );
};

export default TextEditor;
