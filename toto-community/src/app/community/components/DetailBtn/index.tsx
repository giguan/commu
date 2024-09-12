import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Modal from '@/app/components/@ConfirmModla/default';

const DetailBtn = ({ postId, authorId }: { postId: number; authorId: string }) => {
    const router = useRouter();

    const { data: session } = useSession();
    
    const queryClient = useQueryClient();

    const [userReaction, setUserReaction] = useState<'like' | 'dislike' | null>(null);
    const [likeAnimating, setLikeAnimating] = useState(false);
    const [dislikeAnimating, setDislikeAnimating] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false); // 드롭다운 상태

    const [isModalOpen, setModalOpen] = useState(false);

    const handleDropdownToggle = () => {
        setShowDropdown(!showDropdown); // 더보기 버튼 토글
    };

    const handleReactionClick = (reactionType: 'like' | 'dislike' ) => {
        if (!session) {
            toast.error('로그인 사용자만 할 수 있는 기능입니다.');
        } else {
            reactMutate({ reactionType });
        }
    };

    // 리액션 처리 로직 (생략)
    const { mutate: reactMutate } = useMutation({
        mutationFn: ({ reactionType }: { reactionType: 'like' | 'dislike' }) => {
            return axios.post(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/reaction`, {
                postId,
                userId: session?.user.id,
                reactionType,
            });
        },
        onSuccess: (res: any) => {
            if (res.data.reactionType === 'like') {
                setLikeAnimating(true);
                setTimeout(() => setLikeAnimating(false), 600);
            } else {
                setDislikeAnimating(true);
                setTimeout(() => setDislikeAnimating(false), 600);
            }
            queryClient.invalidateQueries({ queryKey: ['post', postId] });
            setUserReaction(res.data.reactionType);
        },
    });

    // 컴포넌트 내부에서
    useEffect(() => {
        // 서버에서 사용자의 반응 상태를 받아와서 userReaction을 설정
        const fetchReaction = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/reaction/status`, {
                    params: {
                        userId: session?.user.id,  // session에서 userId 가져오기
                        postId: postId,  // postId는 컴포넌트에서 받는 props나 상태
                    },
                });
                setUserReaction(response.data.reactionType); // 서버에서 받은 반응 설정
            } catch (error) {
                console.error('Failed to fetch user reaction:', error);
            }
        };

        if (session?.user?.id) {
            fetchReaction();
        }
    }, [postId, session?.user.id]);

    // useMutation을 사용하여 삭제 작업 처리
    const deletePostMutation = useMutation({
        mutationFn: async () => {
            return await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/post/delete/${postId}`);
        },
        onSuccess: () => {
            toast.success('글이 삭제되었습니다!');
            queryClient.invalidateQueries({ queryKey: ['post'] }); // 캐시 무효화
            router.push('/community'); // 커뮤니티 리스트로 리다이렉트
        },
        onError: () => {
            toast.error('글 삭제 중 오류가 발생했습니다.');
        },
    });

    const handleDelete = () => {
        // 삭제 버튼 클릭 시 모달 열기
        setModalOpen(true);
      };
    
    const handleCloseModal = () => {

    setModalOpen(false);
    };
    
    const handleConfirmDelete = () => {
    // 실제 삭제 작업 처리 (API 호출 또는 로직 추가)
    deletePostMutation.mutate(); // 삭제 진행
        
    // 모달 닫기
    setModalOpen(false);
    };

    return (
        <div className="flex space-x-4 mb-6 justify-between">
            <Toaster position="top-center" />
            <button
                onClick={() => router.push('/community')}
                className="bg-gray-100 px-4 py-2 rounded-lg text-sm text-gray-500 font-semibold focus:outline-none w-35 text-black border hover:bg-gray-200"
            >
                목록으로
            </button>

            {/* 데스크탑에서는 버튼 그룹으로 */}
            <div className="hidden lg:flex space-x-2">
                {session && session.user.id === authorId && (
                    <>
                        <button className="bg-gray-100 px-4 py-2 rounded-lg text-sm text-gray-500 font-semibold focus:outline-none text-black hover:bg-gray-200">
                            <Link href={`/community/${postId}/edit`}>수정</Link>
                        </button>
                        <button 
                            onClick={handleDelete}
                            className="bg-gray-100 px-4 py-2 rounded-lg text-sm text-gray-500 font-semibold focus:outline-none text-black hover:bg-gray-200"
                        >
                            삭제
                        </button>
                    </>
                )}

                <button className="bg-gray-100 px-4 py-2 rounded-lg text-sm text-gray-500 font-semibold focus:outline-none text-black hover:bg-gray-200">
                    저장
                </button>
                <button className="bg-gray-100 px-4 py-2 rounded-lg text-sm text-gray-500 font-semibold focus:outline-none text-black hover:bg-gray-200">
                    공유
                </button>

                {session && session.user.id !== authorId && (
                    <>
                        <button
                            onClick={() => handleReactionClick('like')}
                            disabled={userReaction === 'like'}
                            className={`relative px-4 py-2 rounded-lg text-sm text-gray-500 font-semibold focus:outline-none ${userReaction === 'like' ? 'bg-[#EF4444] text-white' : 'bg-gray-100'
                                }`}
                        >
                            좋아요
                            {likeAnimating && (
                                <span className="absolute top-0 left-1/2 transform -translate-x-1/2 animate-bounce-in text-red-500 text-2xl">
                                    👍
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => handleReactionClick('dislike')}
                            disabled={userReaction === 'dislike'}
                            className={`relative px-4 py-2 rounded-lg text-sm text-gray-500 font-semibold focus:outline-none ${userReaction === 'dislike' ? 'bg-[#EF4444] text-white' : 'bg-gray-100'
                                }`}
                        >
                            싫어요
                            {dislikeAnimating && (
                                <span className="absolute top-0 left-1/2 transform -translate-x-1/2 animate-fade-out text-blue-500 text-2xl">
                                    👎
                                </span>
                            )}
                        </button>
                    </>
                )}
            </div>

            {/* 모바일에서는 더보기 버튼으로 */}
            <div className="relative lg:hidden">
                <button
                    onClick={handleDropdownToggle}
                    className="bg-gray-100 px-4 py-2 rounded-lg text-sm text-gray-500 font-semibold focus:outline-none text-black hover:bg-gray-200"
                >
                    더보기
                </button>

                {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10">
                        <div className="py-1">
                            {session && session.user.id === authorId && (
                                <>
                                    <Link href={`/community/${postId}/edit`} passHref className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                                        수정
                                    </Link>
                                    <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                        삭제
                                    </button>
                                </>
                            )}
                            <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                저장
                            </button>
                            <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                공유
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* 모달 컴포넌트 */}
            <Modal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal} 
                onConfirm={handleConfirmDelete} 
                title="삭제 확인" 
                content="정말로 이 항목을 삭제하시겠습니까?" 
            />
        </div>
    );
};

export default React.memo(DetailBtn);
