"use client"

import { useState } from "react";
import { Post, Comment } from "../../../../typings/db";
import NewPosts from "./NewPosts";
import NewComments from "./NewComments";
import { useQuery } from "@tanstack/react-query";
import { fetchComments, fetchPosts } from "@/app/utils/queryHelpers";

export default function RecentPostAndComment({initialPosts, initialComments}: {initialPosts: Post[], initialComments: Comment[]}) {

  const { data: posts } = useQuery({
    queryKey: ["posts"], 
    queryFn: fetchPosts,
    placeholderData: initialPosts
  });

  const { data: comments } = useQuery({
    queryKey: ["comments"],
    queryFn: fetchComments,
    placeholderData: initialComments, // 서버 사이드에서 전달받은 데이터 사용
  });

  const [activeTab, setActiveTab] = useState('newPosts'); // 클라이언트 상태 관리

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex border-b border-gray-200">
        <button
          className={`w-1/2 text-center py-2 font-semibold ${activeTab === 'newPosts' ? 'text-red-500 border-b-2 border-red-500' : 'text-black'}`}
          onClick={() => setActiveTab('newPosts')}
        >
          새 글
        </button>
        <button
          className={`w-1/2 text-center py-2 font-semibold ${activeTab === 'newComments' ? 'text-red-500 border-b-2 border-red-500' : 'text-black'}`}
          onClick={() => setActiveTab('newComments')}
        >
          새 댓글
        </button>
      </div>

      <div className="mt-4">
        {activeTab === 'newPosts' && (
          <NewPosts posts={posts}/>
          
        )}

        {activeTab === 'newComments' && (
          <NewComments comments={comments}/>
        )}
      </div>
    </div>
  );
}
