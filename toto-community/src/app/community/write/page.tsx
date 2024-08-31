"use client";

import TextEditor from "@/app/components/TextEditor/page";
import React, { useState } from "react";
import { toast, Toaster } from 'react-hot-toast';

export default function PostForm() {
  const [category, setCategory] = useState("일반");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // 여기서 API 호출이나 데이터 처리 로직을 추가하세요.

    setTitle("");
    setContent("");
    toast.success('글 작성이 완료되었습니다!');

    console.log({ category, title, content });
  };

  return (
    <>
     <Toaster position="top-center" />
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-black">자유게시판</h2>
        </div>
    </div>

    {/* 카테고리 선택 */}
    <div className="flex space-x-4 mb-4">
        <button
            type="button"
            className={`py-2 px-4 rounded-md w-28 hover:bg-gray-400 ${category === "일반" ? "bg-gray-400 text-white" : "bg-gray-300 text-black"}`}
            onClick={() => setCategory("일반")}
        >
            일반
        </button>
        <button
            type="button"
            className={`py-2 px-4 rounded-md w-28 hover:bg-gray-400 hover:text-white ${category === "뉴스" ? "bg-gray-400 text-white" : "bg-gray-300 text-black"}`}
            onClick={() => setCategory("뉴스")}
        >
            뉴스
        </button>
    </div>

    <form className="bg-white p-6 rounded-lg shadow-md space-y-4" onSubmit={handleSubmit}>

      {/* 제목 입력 */}
      <input
        type="text"
        placeholder="제목"
        className="w-full p-2 border border-gray-300 rounded-md text-black" 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* 내용 입력 */}
      <div className="border border-gray-300 rounded-md p-2">
        {/* <textarea
          placeholder="내용을 입력하세요"
          className="w-full h-40 p-2 border-none focus:ring-0"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea> */}
        <TextEditor />
      </div>

      {/* 작성 버튼 */}
      <button type="submit" className="w-full bg-gray-700 text-white p-3 rounded-md">
        작성
      </button>
    </form>
    </>
  );
}
