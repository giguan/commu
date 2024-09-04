"use client";

import TextEditor from "@/app/components/TextEditor/page";
import React, { useState } from "react";
import { toast, Toaster } from 'react-hot-toast';
import PostCategory from "../components/PostCatogory";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function PostForm() {

  const { data: session } = useSession();

  const [category, setCategory] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // 여기서 API 호출이나 데이터 처리 로직을 추가하세요.

    if (!category || !title || !content) {
      toast.error('모든 필드를 입력하세요.');
      return;
    }

    // 세션에서 id를 확인합니다.
    if (!session?.user?.id) {
      toast.error('로그인이 필요합니다.');
      return;
    }

    const res = axios.post(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/post/${category}`,{
      title,
      content,
      authorId: session.user.id
    })

    setTitle("");
    setContent("");

    toast.success('글 작성이 완료되었습니다!');

    console.log({ category, title, content });
  };

  if(!session) {
    return
  }

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
        <PostCategory excludeAll={true} onCategorySelect={setCategory}  />
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
        <TextEditor value={content} onChange={setContent} />
      </div>

      {/* 작성 버튼 */}
      <button type="submit" className="w-full bg-gray-700 text-white p-3 rounded-md">
        작성
      </button>
    </form>
    </>
  );
}
