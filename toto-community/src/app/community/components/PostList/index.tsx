"use client"

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PostCategory from "../PostCatogory";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format } from 'date-fns';
import { Post } from "../../../../../typings/db";
import { fetchPosts, getQueryClient } from "@/app/utils/queryHelpers";


/** 게시글 1시간 이내면 "N"(new) 표시 */
const isNew = (postDate: Date) => {
    const oneHourInMs = 60 * 60 * 1000; // 1시간 = 3600000ms
    const currentTime = new Date().getTime();
    const postTime = new Date(postDate).getTime();

    return currentTime - postTime < oneHourInMs; // 1시간 이내면 true 반환
};


const PostList = ({ posts }: {posts: Post[]}) => {
  const router = useRouter();
  const queryClient = getQueryClient();
  queryClient.invalidateQueries({queryKey: ['posts']});


  // 리액트 쿼리로 클라이언트에서 데이터 패칭, 서버에서 받은 데이터를 initialData로 설정
  const { data: queryData, isLoading, error } = useQuery<Post[], Error>({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    initialData: posts,  // 서버에서 받은 데이터를 초기값으로 사용
  });

  const { data: session } = useSession();  // 세션 상태 관리
  const [category, setCategory] = useState<number | null>(1);  // 카테고리 상태 관리


  const displayPosts = queryData || posts;

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
                    {displayPosts?.filter((post) => category === 1 || post.board.id === category).length === 0 ? (
                        // 게시글이 없을 경우 나타내는 메시지
                        <li className="text-center text-gray-500">작성된 게시글이 없습니다.</li>
                    ) : (
                        // 게시글이 있을 경우 목록 출력
                        displayPosts
                        ?.filter((post) => category === 1 || post.board.id === category)
                        .map((post) => (
                            <li key={post.id} className="flex justify-between items-center p-2 rounded-lg">
                            <div>
                                <div className="flex items-center space-x-2 mb-1">
                                <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-lg font-bold">{post.board.name}</span>
                                <Link href={`/community/${post.id}`} className="text-black text-medium font-bold hover:text-primary-main truncate">
                                    {post.title}
                                </Link>
                                {isNew(post.createdAt) && (
                                    <span className="text-red-500 text-xs font-bold ml-2">N</span>
                                )}
                                </div>
                                <div className="text-xs text-gray-500 space-x-2">
                                <span>{post.author.nickname}</span>
                                <span>조회수 {post.views}</span>
                                <span>좋아요 {post.likes}</span>
                                <span>싫어요 {post.dislikes}</span>
                                <span>🗨️ {post.commentCount}</span>
                                <span>{format(new Date(post.createdAt), 'yyyy-MM-dd HH:mm')}</span>
                                </div>
                            </div>
                            <div className="w-12 h-12">
                                <Image 
                                src={"https://picsum.photos/250/250"} 
                                alt={"게시글 썸네일 이미지"}    
                                width={100}
                                height={100}   
                                className="rounded-lg"                         
                                />
                            </div>
                            </li>
                        ))
                    )}
                    </ul>
                </div>
            </div>

            
        </div>


        {session ?
            <div className="flex justify-end items-center">
                <button
                    onClick={() => router.push('/community/write')} 
                    className="bg-gray-700 px-4 py-2 rounded-lg text-sm font-semibold focus:outline-none w-20"
                >
                    작성
                </button>
            </div>
            : null
        }
    </>
  );
}

export default PostList;