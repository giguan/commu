"use client"

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import TextEditor from "@/app/components/@TextEditor/page";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import PostCategory from "../../components/PostCatogory";
import { Post } from "../../../../../typings/db";
import { getQueryClient } from "@/app/utils/queryHelpers";


// 작성할 게시글 데이터 타입 정의
interface NewPost {
    title: string;
    content: string;
    authorId: string;
    postId: number;
    boardId: number;
    category: number;
  }

  const fetchPostById = async (id: number) => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/post/detail/${id}`);
    return data;
  };

const PostEditPage = () => {

    const { data: session } = useSession();

    const params = useParams();  // useParams 훅으로 동적 파라미터 가져오기
    const { id } = params;  // URL에서 id 파라미터 추출

    const postId = Number(id);

    const router = useRouter();

    const queryClient = getQueryClient();

    const [editorContent, setEditorContent] = useState('');

    const handleEditorChange = (content: string) => {
        setEditorContent(content); // 에디터에서 받은 HTML 값을 상태로 저장
    };
    
    // 동일한 queryKey로 캐시된 데이터를 불러옴

    const { data: post, isLoading: postLoading, error: postError } = useQuery({
        queryKey: ['post', postId],
        queryFn: () => fetchPostById(postId),
        enabled: !!postId,
      });

      console.log("%%%%%%%%%%%%%%",post)

    const [category, setCategory] = useState<number | null>();
    const [title, setTitle] = useState();
    // const [content, setContent] = useState(post.board.content);

    // 게시글 수정 시 초기값 설정
    useEffect(() => {
        if (!postLoading && post) {
            setCategory(post.board.id);
            setTitle(post.title);
            setEditorContent(post.content);
            console.log(post.content)
        }
    }, [postLoading, post]);


    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        return setTitle(e.target.value);
      };


    const updatePostMutation = useMutation({
        mutationFn: async (updatedPost: NewPost) => {
            const { data } = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/post/${updatedPost.category}`, updatedPost);
            return data;
        },
        onSuccess: (data) => {
            // 캐시된 'post' 리스트에서 수정된 포스트 업데이트
            queryClient.setQueryData(['post'], (oldPosts: Post[] | undefined) => {
                if (!oldPosts) return [];
                return oldPosts.map((post) => post.id === data.id ? data : post);
            });
    
            toast.success('글 수정이 완료되었습니다!');

            // 페이지 전환 후 캐시를 무효화하여 최신 데이터를 가져오도록 함
            queryClient.invalidateQueries({
                queryKey: ['post']
            });
            
            // 수정 후 해당 게시글 상세 페이지로 리다이렉트
            router.push(`/community/${data.id}`);

        },
        onError: (error) => {

            console.log("Error", error)

            toast.error('글 수정 중 오류가 발생했습니다.');
        }
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (!category || !title || !editorContent) {
            toast.error('모든 필드를 입력하세요.');
            return;
        }

        if (!session) {
            toast.error('로그인이 필요합니다.');
            return;
        }

        updatePostMutation.mutate({
            title,
            content: editorContent,
            authorId: (session.user as any).id,
            boardId: category!,
            category: category!,
            postId: post.id,
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
                <PostCategory excludeAll={true} onCategorySelect={setCategory} selectedCategory={category} />
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
                <TextEditor value={editorContent} onChange={handleEditorChange} />
                </div>

                {/* 작성 버튼 */}
                <button type="submit" className="w-full bg-gray-700 text-white p-3 rounded-md">
                    수정
                </button>
            </form>
        </>
    )
}

export default PostEditPage;