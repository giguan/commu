"use client";

import React, { useCallback, useState } from "react";
import { toast, Toaster } from 'react-hot-toast';
import PostCategory from "../components/PostCatogory";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import dynamic from "next/dynamic";


const TextEditor = dynamic(() => import('../../components/@TextEditor/page'), { ssr: false })
// import TextEditor from "@/app/components/@TextEditor/page";

// 작성할 게시글 데이터 타입 정의
interface NewPost {
  title: string;
  content: string;
  authorId: string;
  boardId: number;
  category: number;
}

const PostForm = () => {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const router = useRouter();

  const [category, setCategory] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");

  const [editorContent, setEditorContent] = useState('');

  const handleEditorChange = (content: string) => {
    setEditorContent(content); // 에디터에서 받은 HTML 값을 상태로 저장
  };

  const onChangeTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);

  // useMutation에 타입을 명시적으로 지정
  const createPostMutation = useMutation({
    mutationFn: async (newPost: NewPost) => {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/post/${newPost.category}`, newPost);
      return data;
    },
    onSuccess: (data) => {
      // 글 작성 성공 시 캐시 무효화하여 최신 게시글 목록을 가져옴
      queryClient.invalidateQueries({queryKey: ['post']});
      toast.success('글 작성이 완료되었습니다!');
      
      setTitle("");
      setEditorContent("");

      // 새로 작성된 글로 리다이렉트
      setTimeout(() => {
        router.push(`/community/${data.id}`);
      }, 1000);
    },
    onError: () => {
      toast.error('글 작성 중 오류가 발생했습니다.');
    }
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!category || !title || !editorContent) {
      toast.error('모든 필드를 입력하세요.');
      return;
    }

    // 세션에서 id를 확인합니다.
    if (!session) {
      toast.error('로그인이 필요합니다.');
      return;
    }

    

    // useMutation 실행 (글 작성)
    createPostMutation.mutate({
      title,
      content: editorContent,
      authorId: (session.user as any).id,
      boardId: category,
      category,
    });
  };

  if (!session) {
    return null;
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
        <PostCategory excludeAll={true} onCategorySelect={setCategory} />
      </div>

      <form className="bg-white p-6 rounded-lg shadow-md space-y-4" onSubmit={handleSubmit}>
        {/* 제목 입력 */}
        <input
          type="text"
          placeholder="제목"
          className="w-full p-2 border border-gray-300 rounded-md text-black"
          value={title}
          onChange={onChangeTitle}
        />

        {/* 내용 입력 */}
        <div className="border border-gray-300 rounded-md p-2">
          <TextEditor value={editorContent} onChange={handleEditorChange}/>
        </div>

        {/* 작성 버튼 */}
        <button type="submit" className="w-full bg-gray-700 text-white p-3 rounded-md">
          작성
        </button>
      </form>
    </>
  );
};

export default PostForm;
