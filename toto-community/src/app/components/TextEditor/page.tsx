"use client"; // Next.js 13 이상에서 클라이언트 전용으로 설정

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";

// Quill을 동적으로 로드합니다.
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const TextEditor = () => {
  const [value, setValue] = useState("");

  const insertHtml = () => {
    const editor = document.querySelector('.ql-editor');
    if (editor) {
      editor.innerHTML += "<p><strong>이것은 HTML 코드로 삽입된 텍스트입니다.</strong></p>";
    }
  };

  const logHtml = () => {
    console.log(value);
  };

  return (
    <div>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={{
          toolbar: [
            [{ header: '1'}, { header: '2'}, { font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, 
            {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image', 'video'],
            ['clean']  
          ],
          clipboard: {
            matchVisual: false,
          }
        }}
        formats={[
          'header', 'font', 'size',
          'bold', 'italic', 'underline', 'strike', 'blockquote',
          'list', 'bullet', 'indent',
          'link', 'image', 'video'
        ]}
      />
      {/* <button onClick={insertHtml} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
        HTML 코드 삽입
      </button>
      <button onClick={logHtml} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
        HTML 코드 출력
      </button> */}
    </div>
  );
};

export default TextEditor;
