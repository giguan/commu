import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import Modal from "@/app/components/@ConfirmModla/default";
import Image from 'next/image';
import { 
    AiOutlineDislike ,
    AiOutlineDelete,
    AiOutlineLike,
    AiTwotoneEdit, 
    AiFillLike,
    AiFillDislike
} 
from "react-icons/ai";

const fetchCommentListByPost = async (id: number) => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/comment/${id}`);
    return data;
  };

const ReplyList = ({postId}: {postId: number}) => {

    const { data: session } = useSession();
    const queryClient = useQueryClient();

    const [activeReplyBox, setActiveReplyBox] = useState<number | null>(null);
    const [childComment, setChildComment] = useState("");
    const [activeParentId, setActiveParentId] = useState<number | null>(null); // 현재 답글을 작성 중인 부모 댓글 ID

    const [editCommentId, setEditCommentId] = useState<number | null>(null); // 수정 중인 댓글 ID
    const [editContent, setEditContent] = useState<string>("")

    const [likeAnimating, setLikeAnimating] = useState(false);
    const [dislikeAnimating, setDislikeAnimating] = useState(false);

    // 댓글 리스트 가져오기 (useQuery 사용)
    const { data: comments, isLoading: postLoading, error: postError } = useQuery({
        queryKey: ["comment", postId],
        queryFn: () => fetchCommentListByPost(postId),
        enabled: !!postId,
    });

    // 댓글 작성 API 요청 함수
    const submitReply = async (newComment: { postId: number; authorId: string; parentId: number; comment: string }) => {
        return await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/comment`, newComment);
    };

    // 댓글 작성 useMutation
    const { mutate } = useMutation<AxiosResponse<any>, Error, { postId: number; authorId: string; parentId: number; comment: string }>({
        mutationFn: submitReply,
        onSuccess: () => {

            toast.success(`댓글이 성공적으로 작성되었습니다.`);
            queryClient.refetchQueries({ queryKey: ["comment", postId] }); // 댓글 쿼리 갱신
            queryClient.invalidateQueries({queryKey: ["post", postId]})
            queryClient.invalidateQueries({queryKey: ["comments"]})
            setChildComment(""); // 입력 필드 초기화
            setActiveReplyBox(null); // 답글 입력창 닫기
        },
        onError: (error) => {
            toast.error("댓글 작성 중 오류가 발생했습니다.");
            console.error(error);
        },
    });

    // 답글 입력창을 열거나 닫는 함수
    const toggleReplyBox = (commentId: number) => {
        if (activeReplyBox === commentId) {
            setActiveReplyBox(null); // 이미 열려 있으면 닫기
        } else {
            setActiveReplyBox(commentId); // 새로운 답글 박스 열기
        }
    };

    // 답글 제출 함수
    const onSubmitReplyForm = (e: React.FormEvent, commentId: number | null) => {
        e.preventDefault();

        if (!childComment) {
            toast.error("내용을 작성하세요.");
            return;
        }
        
        if (!commentId || !session?.user.id) {
            toast.error("부모 댓글 ID를 찾을 수 없습니다.");
            return;
        }

        // 댓글 작성 mutation 호출
        mutate({
            postId,
            authorId: session.user.id,
            parentId: commentId,
            comment: childComment,
        });
    };

    // Enter 키로 답글 제출
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>, commentId: number) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // 줄바꿈 방지

            onSubmitReplyForm(e, commentId); // Enter로 폼 제출
        }
    };


    /** 답글을 수정 모드로 전환 */
    const toggleEditMode = (commentId: number, currentContent: string) => {
        setEditCommentId(commentId);
        setEditContent(currentContent);
    };

    /** 
     * 답글 수정 
     * @Param postId - 필요없어보임
     * @Param authorId - 필요없어보임
     * */
    const handleEditSubmit = (e: React.FormEvent, commentId: number) => {
        e.preventDefault();

        axios.put(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/comment`, {
            postId,
            authorId: session?.user.id,
            comment: editContent,
            commentId,
            parentId: activeParentId ? activeParentId : null,
        })
        .then((res) => {
            // 성공 메시지 출력
            toast.success("댓글이 성공적으로 수정되었습니다.");

            // 쿼리 무효화 및 갱신
            queryClient.invalidateQueries({ queryKey: ["comment", postId] });

            // 수정 모드 종료
            setEditCommentId(null);
            setEditContent("")
            setActiveParentId(null)
        })
        .catch((error) => {
            toast.error("댓글 수정 중 오류가 발생했습니다.");
            console.error(error);
        });
    }

    const [commentReactions, setCommentReactions] = useState<{ [key: number]: string | null }>({});


    useEffect(() => {
        // 서버에서 사용자의 반응 상태를 받아와서 userReaction을 설정
        const fetchReaction = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/reaction/statusComment`, {
                    params: {
                        userId: session?.user.id,  // session에서 userId 가져오기
                        postId: postId,  // postId는 컴포넌트에서 받는 props나 상태
                    },
                });

                setCommentReactions(response.data)

            } catch (error) {
                console.error('Failed to fetch user reaction:', error);
            }
        };

        if (session?.user?.id) {
            fetchReaction();
        }
    }, [session, postId]);

    // 리액션 처리 로직
    const { mutate: reactMutate } = useMutation({
        mutationFn: ({ reactionType, commentId }: { reactionType: 'like' | 'dislike', commentId: number }) => {
            return axios.post(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/reaction/`, {
                postId,
                commentId,
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
            queryClient.invalidateQueries({ queryKey: ['comment', postId] });

            setCommentReactions((prevData) => {
                
                const newReactions = { 
                    ...prevData,    // 기존의 상태 유지
                    [res.data.commentId]: res.data.reactionType  // 새로 들어온 데이터를 추가
                };
                return newReactions;  // 새로운 상태 반환
            });
        },
    });

    const handleReactionClick = (reactionType: 'like' | 'dislike', commentId: number) => {
        if (!session) {
            toast.error('로그인 사용자만 할 수 있는 기능입니다.');
        } else {
            reactMutate({ reactionType, commentId });
        }
    };

    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    // useMutation을 사용하여 삭제 작업 처리
    const deleteCommentMutation = useMutation({
        mutationFn: async () => {
            return await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/comment`, {
                params: {
                    commentId: deleteCommentTd
                }
            });
        },
        onSuccess: () => {
            toast.success('댓글이 삭제되었습니다!');
            queryClient.invalidateQueries({ queryKey: ["comment", postId] });
            setDeleteCommentId(0)
        },
        onError: () => {
            toast.error('댓글 삭제 중 오류가 발생했습니다.');
        },
    });

    const [deleteCommentTd, setDeleteCommentId ] = useState(0)
    
    const handleCommentDelete = (commentId: number) => {

        const commentToDelete = comments?.find((comment: any) => comment.id === commentId);

        if (commentToDelete && commentToDelete.replies && commentToDelete.replies.length > 0) {
            toast.error('답글이 있는 댓글은 삭제할 수 없습니다.');
            return;
        }

        // 삭제 버튼 클릭 시 모달 열기
        setDeleteModalOpen(true);

        setDeleteCommentId(commentId)
      };
    
    const handleCloseModal = () => {

        setDeleteModalOpen(false);
    };
    
    const handleConfirmDelete = () => {
        // 실제 삭제 작업 처리 (API 호출 또는 로직 추가)
        deleteCommentMutation.mutate(); // 삭제 진행
        
        // 모달 닫기
        setDeleteModalOpen(false);
    };

    if (postLoading) return <p>댓글을 불러오는 중입니다...</p>;
    if (postError) return <p>댓글을 불러오는 중 오류가 발생했습니다.</p>;

    console.log("###########",comments)

    return (
        <div>
            {/* 댓글 리스트 */}
            <div className="space-y-4">
                {/* 댓글과 답글 */}
                {comments && comments.map((comment: any) => (
                    <div key={comment.id}>
                        <div className="flex items-start space-x-2">
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex justify-center items-center">
                                <span className="text-red-600 text-lg">🧑‍💼</span>
                            </div>
                            <div>
                                <div className="flex items-center">
                                    <p className="text-gray-800 font-semibold mr-2">{comment.author.nickname}</p>
                                    
                                    <button 
                                        onClick={() => toggleEditMode(comment.id, comment.content)}
                                        className="flex items-center ml-1 text-red-500 cursor-pointer hover:text-blue-500 transition-colors"
                                    >
                                        <AiTwotoneEdit/>
                                        <p className="pl-2 text-black text-sm hover:text-blue-500 transition-color s">수정</p>
                                    </button>

                                    <button
                                        onClick={() => handleCommentDelete(comment.id)}
                                        className="flex items-center ml-2 text-red-500 cursor-pointer hover:text-blue-500 transition-colors"
                                    >
                                        <AiOutlineDelete />
                                        <p className="pl-2 text-black text-sm hover:text-blue-500 transition-colors">삭제</p>
                                    </button>
                                </div>

                                {/* 수정 모드인지 확인 */}
                                {editCommentId === comment.id ? (
                                    <form onSubmit={(e) => handleEditSubmit(e, comment.id)}>
                                        <textarea
                                            className="w-full p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                                            rows={2}
                                            value={editContent}
                                            onChange={(e) => setEditContent(e.target.value)}
                                        ></textarea>
                                        <div className="flex justify-end">
                                            <button
                                                type="submit"
                                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md cursor-pointer hover:bg-blue-500 hover:text-white transition-colors"
                                            >
                                                수정 완료
                                            </button>
                                        </div>
                                    </form>
                                ) : (

                                    <p className="text-sm text-gray-600 break-all">
                                        {comment.image && (
                                            <Image
                                                src={process.env.NEXT_PUBLIC_BACKEND_SERVER+comment.image?.imageDetails[0].url}
                                                alt={""}
                                                width={100}
                                                height={100}
                                            />
                                        )}
                                        {comment.content}
                                    </p>
                                )}


                                <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                                    <span>{format(new Date(comment.updatedAt), 'yyyy-MM-dd HH:mm')}</span>
    
                                    <button
                                        className="hover:underline hover:text-blue-500 transition-colors cursor-pointer"
                                        onClick={() => toggleReplyBox(comment.id)}
                                    >
                                        답글
                                    </button>
    
                                    <button
                                        onClick={() => handleReactionClick('like', comment.id)}
                                        disabled={commentReactions[comment.id] === 'like'} // 이미 좋아요를 눌렀으면 비활성화
                                        className="flex items-center hover:text-blue-500 transition-colors"
                                    >
                                        {commentReactions[comment.id] === 'like' ? (
                                            <AiFillLike />  // 이미 좋아요를 눌렀다면 채워진 아이콘
                                        ) : (
                                            <AiOutlineLike /> // 아직 누르지 않았다면 빈 아이콘
                                        )}
                                        <p className="pl-2">{comment.likes}</p>
                                    </button>

                                    {/* 싫어요 버튼 */}
                                    <button
                                        onClick={() => handleReactionClick('dislike', comment.id)}
                                        disabled={commentReactions[comment.id] === 'dislike'} // 이미 싫어요를 눌렀으면 비활성화
                                        className="flex items-center hover:text-blue-500 transition-colors"
                                    >
                                        {commentReactions[comment.id] === 'dislike' ? (
                                            <AiFillDislike />  // 이미 싫어요를 눌렀다면 채워진 아이콘
                                        ) : (
                                            <AiOutlineDislike /> // 아직 누르지 않았다면 빈 아이콘
                                        )}
                                        <p className="pl-2">{comment.dislikes}</p>
                                    </button>
                                </div>
    
                                <div className="ml-10 mt-2 space-y-2">
                                    {comment?.replies && comment.replies.map((reply: any) => (
                                        <div key={reply.id} className="flex items-start space-x-2">
                                            <div className="w-8 h-8 bg-gray-200 rounded-full flex justify-center items-center">
                                                <span className="text-red-600 text-lg">🧑‍💼</span>
                                            </div>
                                            <div>
                                                <div className="flex items-center">
                                                    <p className="text-gray-800 font-semibold mr-2">{comment.author.nickname}</p>
                                                    
                                                    {/* 수정 테스토좀 하고 삭제 넘어가자 */}
                                                    <span 
                                                        onClick={() => toggleEditMode(reply.id, reply.content)}
                                                        className="flex items-center ml-1 text-red-500 cursor-pointer hover:text-blue-500 transition-colors"
                                                    >
                                                        <AiTwotoneEdit/>
                                                        <p className="pl-2 text-black text-sm hover:text-blue-500 transition-colors">수정</p>
                                                    </span>

                                                    <span
                                                        onClick={() => handleCommentDelete(reply.id)}
                                                        className="flex items-center ml-2 text-red-500 cursor-pointer hover:text-blue-500 transition-colors"
                                                    >
                                                        <AiOutlineDelete />
                                                        <p className="pl-2 text-black text-sm hover:text-blue-500 transition-colors">삭제</p>
                                                    </span>
                                                </div>


                                                {editCommentId === reply.id ? (
                                                    <form onSubmit={(e) => handleEditSubmit(e, reply.id)}>
                                                        <textarea
                                                            className="w-full p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                                                            rows={2}
                                                            value={editContent}
                                                            onChange={(e) => setEditContent(e.target.value)}
                                                        ></textarea>
                                                        <div className="flex justify-end">
                                                            <button
                                                                type="submit"
                                                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md cursor-pointer hover:bg-blue-500 hover:text-white transition-colors"
                                                            >
                                                                수정 완료
                                                            </button>
                                                        </div>
                                                    </form>
                                                ) : (
                                                    <p 
                                                        className="text-sm text-gray-600 break-all">{reply.content}</p>
                                                )}
                                                <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                                                    <span>{format(new Date(reply.updatedAt), 'yyyy-MM-dd HH:mm')}</span>

                                                    <button
                                                        onClick={() => handleReactionClick('like', reply.id)}
                                                        disabled={commentReactions[reply.id] === 'like'} // 이미 좋아요를 눌렀으면 비활성화
                                                        className="flex items-center hover:text-blue-500 transition-colors"
                                                    >
                                                        {commentReactions[reply.id] === 'like' ? (
                                                            <AiFillLike />  // 이미 좋아요를 눌렀다면 채워진 아이콘
                                                        ) : (
                                                            <AiOutlineLike /> // 아직 누르지 않았다면 빈 아이콘
                                                        )}
                                                        <p className="pl-2">{reply.likes}</p>
                                                    </button>

                                                    {/* 싫어요 버튼 */}
                                                    <button
                                                        onClick={() => handleReactionClick('dislike', reply.id)}
                                                        disabled={commentReactions[reply.id] === 'dislike'} // 이미 싫어요를 눌렀으면 비활성화
                                                        className="flex items-center hover:text-blue-500 transition-colors"
                                                    >
                                                        {commentReactions[reply.id] === 'dislike' ? (
                                                            <AiFillDislike />  // 이미 싫어요를 눌렀다면 채워진 아이콘
                                                        ) : (
                                                            <AiOutlineDislike /> // 아직 누르지 않았다면 빈 아이콘
                                                        )}
                                                        <p className="pl-2">{reply.dislikes}</p>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
    
                        {activeReplyBox === comment.id && (
                            <div className="ml-10 mt-4">
                                <form onSubmit={(e) => onSubmitReplyForm(e, comment.id)}>
                                    <textarea
                                        className="w-full p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                                        rows={2}
                                        placeholder="답글을 입력하세요."
                                        value={childComment} // 상태를 값으로 연결
                                        onChange={(e) => setChildComment(e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(e, comment.id!)}
                                    ></textarea>
                                    <div className="flex justify-end">
                                        <button 
                                            type="submit"
                                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md cursor-pointer hover:bg-blue-500 hover:text-white transition-colors"
                                        >
                                            답글 작성
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                ))}

                {/* 모달 컴포넌트 */}
                <Modal 
                    isOpen={isDeleteModalOpen} 
                    onClose={handleCloseModal} 
                    onConfirm={handleConfirmDelete} 
                    title="삭제 확인" 
                    content="정말로 이 댓글을 삭제하시겠습니까?" 
                />
            </div>
        </div>
    )
}

export default ReplyList;