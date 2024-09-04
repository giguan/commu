"use client";

import axios from "axios";
import React, { useState } from "react";

export default function PostForm() {
  const [category, setCategory] = useState("일반");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    
    const res = axios.post(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/post/`)

    console.log({ category, title, content });
  };

  return (
    <form className="bg-white p-6 rounded-lg shadow-md space-y-4" onSubmit={handleSubmit}>
      {/* 카테고리 선택 */}
      <div className="flex space-x-4 mb-4">
        <button
          type="button"
          className={`py-2 px-4 rounded-md ${category === "일반" ? "bg-gray-400 text-white" : "bg-gray-200 text-black"}`}
          onClick={() => setCategory("일반")}
        >
          일반
        </button>
        <button
          type="button"
          className={`py-2 px-4 rounded-md ${category === "뉴스" ? "bg-gray-400 text-white" : "bg-gray-200 text-black"}`}
          onClick={() => setCategory("뉴스")}
        >
          뉴스
        </button>
      </div>

      {/* 제목 입력 */}
      <input
        type="text"
        placeholder="제목"
        className="w-full p-2 border border-gray-300 rounded-md"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* 내용 입력 */}
      <div className="border border-gray-300 rounded-md p-2">
        <textarea
          placeholder="내용을 입력하세요"
          className="w-full h-40 p-2 border-none focus:ring-0"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>

      {/* 작성 버튼 */}
      <button type="submit" className="w-full bg-gray-700 text-white p-3 rounded-md">
        작성
      </button>
    </form>
  );
}
