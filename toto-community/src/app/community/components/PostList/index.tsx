"use client"

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { posts, Post } from "../../data/posts";
import PostCategory from "../PostCatogory";

const PostList = () => {
  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState("전체");

  const [category, setCategory] = useState<number | null>(null);

  return (
    <>
        <div className="lg:flex-grow space-y-6">
        
            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold text-black">자유게시판</h2>
                </div>
            </div>
        
            <div className="container mx-auto max-w-screen-xl">

                <div className="flex space-x-4 mb-4">
                    <PostCategory onCategorySelect={setCategory}  />
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">

                <ul className="space-y-4 divide-y divide-gray-200">
                    {posts
                    .filter((post) => selectedTab === "전체" || post.category === selectedTab)
                    .map((post) => (
                        <li key={post.id} className="flex justify-between items-center p-2 rounded-lg">
                        <div>
                            <div className="flex items-center space-x-2 mb-1">
                            <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-lg font-bold">{post.category}</span>
                            <Link href={`/community/${post.id}`} className="text-black text-medium font-bold hover:text-primary-main truncate">
                                {post.title}
                            </Link>
                            <span className="text-red-500 text-xs font-bold ml-2">N</span>
                            </div>
                            <div className="text-xs text-gray-500 space-x-2">
                            <span>{post.author}</span>
                            <span>조회수 {post.views}</span>
                            <span>추천 {post.likes}</span>
                            <span>{post.date}</span>
                            </div>
                        </div>
                        </li>
                    ))}
                </ul>
                </div>
            </div>

            
        </div>

        <div className="flex justify-end items-center">
            <button
                onClick={() => router.push('/community/write')} 
                className="bg-gray-700 px-4 py-2 rounded-lg text-sm font-semibold focus:outline-none w-20"
            >
                작성
            </button>
        </div>
    </>
  );
}

export default PostList;