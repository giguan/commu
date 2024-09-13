"use client"

import Link from "next/link";
import { Post } from "../../../../typings/db";
import { format } from "date-fns";
import { fetchPosts } from "@/app/utils/queryHelpers";
import { useQuery } from "@tanstack/react-query";

interface PostWidgetProps {
    initialPosts: Post[]; // 서버에서 받아온 posts 데이터를 props로 받음
    title: string;
  }

  const PostWidget = ({ initialPosts, title }: PostWidgetProps) => {
    
    const { data: posts, isLoading } = useQuery({
        queryKey: ["posts"], 
        queryFn: fetchPosts,
        placeholderData: initialPosts
    });


    // Filter posts based on title or postsType
    const filteredPosts = title === "뉴스"
        ? posts.filter((post: Post) => post.board.id === 3)
        : posts;

    if(isLoading) {
        return (
            <div>로딩중</div>
        )
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-black">{title}</h2>
            <Link href="/community" className="text-primary-main">
              더보기
            </Link>
          </div>
    
          <ul className="text-sm text-gray-600 space-y-2">
            {filteredPosts.slice(0, 6).map((post: Post) => (
              <li
                key={post.id}
                className="border-b border-gray-200 py-2 flex justify-between items-center"
              >
                <div className="truncate max-w-[75%]">
                  <span className="bg-grayscale-200 text-gray-700 text-xs px-2 py-1 rounded-lg mr-2 font-semibold">
                    {post.board.name}
                  </span>
                  <Link
                    href={`/community/${post.id}`}
                    className="text-xs font-semibold hover:text-primary-main truncate"
                  >
                    {post.title}
                  </Link>
                  <span className="text-red-500 text-xs font-bold ml-2">N</span>
                </div>
    
                <span className="block text-xs text-gray-400">
                  {format(new Date(post.createdAt), "yyyy-MM-dd")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      );
    };

export default PostWidget;