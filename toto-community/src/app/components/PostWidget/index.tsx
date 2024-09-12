"use client"

import Link from "next/link";
import { Post } from "../../../../typings/db";
import { format } from "date-fns";
import { fetchPosts } from "@/app/utils/queryHelpers";
import { useQuery } from "@tanstack/react-query";

interface PostWidgetProps {
    initialPosts: Post[]; // 서버에서 받아온 posts 데이터를 props로 받음
  }

  const PostWidget = ({ initialPosts }: PostWidgetProps) => {
    
    const { data: posts } = useQuery({
        queryKey: ["posts"], 
        queryFn: fetchPosts,
        placeholderData: initialPosts
    });
    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-black">자유게시판</h2>
                <Link href="/community" className="text-primary-main">
                    더보기
                </Link>
            </div>
            
            <ul className="text-sm text-gray-600 space-y-2">
            
            {posts.slice(0,6).map((post: Post) => {
                return (
                <li key={post.id} className="border-b border-gray-200 py-2 flex justify-between">
                    <div>
                    <span className="bg-grayscale-200 text-gray-700 text-xs px-2 py-1 rounded-lg mr-2 font-semibold">{post.board.name}</span>
                    <Link href={`/community/${post.id}`} className="text-xs font-semibold hover:text-primary-main">
                        {post.title}
                    </Link>
                    <span className="text-red-500 text-xs font-bold ml-2">N</span>
                    </div>
                    
                    <span className="block text-xs text-gray-400 mt-1">
                    {format(new Date(post.createdAt), 'yyyy-MM-dd')}
                    </span>
                </li>
                )
            })}
            </ul>
      </div>
    )
}

export default PostWidget;