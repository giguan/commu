"use client"; // Next.js 13 이상에서 클라이언트 전용으로 설정

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";

// Quill을 동적으로 로드합니다.
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const TextEditor = ({ value, onChange }: TextEditorProps) => {
  return (
    <div>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange} // 부모로부터 받은 onChange 핸들러를 사용
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
    </div>
  );
};

export default TextEditor;
