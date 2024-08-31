import { FC, useState } from "react";
import { Post } from "../../data/posts"; // Post 타입 임포트
import { useRouter } from "next/navigation";

type ReplyBoxState = {
    [key: number]: boolean;
};

interface PostDetailProps {
    post: Post;
}

const PostDetail: FC<PostDetailProps> = ({post}) => {

    const router = useRouter();

    const handleBack = () => {
        router.back();
      };

    const [replyBox, setReplyBox] = useState<ReplyBoxState>({});

    // 답글 입력창 표시 토글 함수
    const toggleReplyBox = (commentId: number): void => {
        setReplyBox((prevState) => ({
            ...prevState,
            [commentId]: !prevState[commentId],
        }));
    };

    return (
        <div className="lg:flex-grow space-y-6">
            <div className="flex justify-start items-center">
                <button
                    onClick={handleBack} 
                    className="bg-white px-4 py-2 rounded-lg text-sm font-semibold focus:outline-none w-35 text-black"
                >
                    {`< 목록으로`}
                </button>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                
                {/* 제목 및 기본 정보 */}
                <div className="flex mb-2 flex flex-col">
                    <div className="text-gray-700 text-xs px-2 py-1 mr-2">일반</div>
                    <h1 className="text-xl font-bold text-black ml-2">애플 키보드 트랙패드 기타 구입</h1>
                </div>

                <div className="flex items-center text-gray-500 text-sm mb-4 ml-2">
                    <span className="mr-4"><strong>달타령리</strong></span>
                    <span className="mr-4">2024.08.31</span>
                    <span className="mr-4">추천 0</span>
                    <span className="mr-4">조회수 18</span>
                    <span>댓글 0</span>
                </div>

                <div className="my-4 border-t border-gray-200"></div>

                {/* 본문 내용 */}
                <div className="mb-6 min-h-[200px]">
                    <p className="text-gray-800 ">sample</p>
                </div>

                {/* 버튼들 */}
                <div className="flex space-x-4 mb-6 justify-between">
                    <button
                        onClick={() => router.push('/community')} 
                        className="bg-gray-100 px-4 py-2 rounded-lg text-sm text-gray-500 font-semibold focus:outline-none w-35 text-black border  hover:bg-gray-200"
                    >
                        목록으로
                    </button>
                    <div className="flex space-x-2">
                        <button className="bg-gray-100 px-4 py-2 rounded-lg text-sm text-gray-500 font-semibold focus:outline-none text-black hover:bg-gray-200">저장</button>
                        <button className="bg-gray-100 px-4 py-2 rounded-lg text-sm text-gray-500 font-semibold focus:outline-none text-black hover:bg-gray-200">공유</button>
                        <button className="bg-gray-100 px-4 py-2 rounded-lg text-sm text-gray-500 font-semibold focus:outline-none text-black hover:bg-gray-200">추천</button>
                    </div>
                </div>

                {/* 프로필 및 추가 정보 */}
                <div className="flex justify-between items-start mb-6 space-x-4">
                    <div className="flex-1 flex flex-col items-start space-y-4">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gray-200 rounded-full flex justify-center items-center">
                                <span className="text-black text-lg">🧑‍💼</span>
                            </div>
                            <div>
                                <p className="text-black font-semibold">달타령리</p>
                                <p className="text-sm text-gray-600">보유 포인트 : 1,625P</p>
                            </div>
                        </div>
                        
                        <div className="bg-gray-100 p-2 rounded-lg shadow-inner w-full">
                            <div className="relative h-3 bg-gray-300 rounded-full">
                                <div className="absolute top-0 left-0 h-full bg-red-500 rounded-full flex items-center justify-center" style={{ width: '81.3%' }}></div>
                                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-semibold text-xs text-center w-full">
                                1,625P / 2,000P (81.3%)
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 space-y-1 text-sm">
                        <div className="flex justify-between items-center">
                            <p className="text-gray-700 truncate">부모님 생신 기념 오마카세 방문기 🍣🔥</p>
                            <span className="text-gray-400 text-xs whitespace-nowrap ml-4">9시간 전</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-gray-700 truncate">쿠팡</p>
                            <span className="text-gray-400 text-xs whitespace-nowrap ml-4">9시간 전</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-gray-700 truncate">LLM 리더보드 세계 1위의 시각으로 배우는 논문 선별법</p>
                            <span className="text-gray-400 text-xs whitespace-nowrap ml-4">9시간 전</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-gray-700 truncate">BTS(방탄소년단)</p>
                            <span className="text-gray-400 text-xs whitespace-nowrap ml-4">9시간 전</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-gray-700 truncate">M1 맥북프로 14</p>
                            <span className="text-gray-400 text-xs whitespace-nowrap ml-4">9시간 전</span>
                        </div>
                    </div>
                </div>

                {/* 댓글 작성 */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">댓글</h2>
                    {/* 댓글 리스트 */}
                    <div className="space-y-4">
                        {/* 댓글과 답글 */}
                        {[
                            {
                                id: 1,
                                author: "관리자",
                                text: "zzzz",
                                time: "2분전",
                                replies: [
                                    {
                                        id: 2,
                                        author: "관리자",
                                        text: "ㅇㅇ",
                                        time: "방금"
                                    }
                                ]
                            },
                            {
                                id: 3,
                                author: "관리자",
                                text: "test",
                                time: "1분전",
                                replies: []
                            },
                            {
                                id: 4,
                                author: "관리자",
                                text: "zzz",
                                time: "1분전",
                                replies: []
                            }
                        ].map((comment) => (
                            <div key={comment.id}>
                                <div className="flex items-start space-x-2">
                                    <div className="w-8 h-8 bg-gray-200 rounded-full flex justify-center items-center">
                                        <span className="text-red-600 text-lg">🧑‍💼</span>
                                    </div>
                                    <div>
                                        <p className="text-gray-800 font-semibold">{comment.author}</p>
                                        <p className="text-sm text-gray-600">{comment.text}</p>
                                        <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                                            <span>{comment.time}</span>
                                            <button
                                                className="hover:underline"
                                                onClick={() => toggleReplyBox(comment.id)}
                                            >
                                                답글
                                            </button>
                                            <span>추천</span>
                                            <span>수정</span>
                                            <span className="text-red-500">삭제</span>
                                        </div>
                                    </div>
                                </div>
                                {/* 답글 */}
                                {comment.replies.length > 0 && (
                                    <div className="ml-10 mt-2 space-y-2">
                                        {comment.replies.map((reply) => (
                                            <div key={reply.id} className="flex items-start space-x-2">
                                                <div className="w-8 h-8 bg-gray-200 rounded-full flex justify-center items-center">
                                                    <span className="text-red-600 text-lg">🧑‍💼</span>
                                                </div>
                                                <div>
                                                    <p className="text-gray-800 font-semibold">{reply.author}</p>
                                                    <p className="text-sm text-gray-600">{reply.text}</p>
                                                    <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                                                        <span>{reply.time}</span>
                                                        <span>답글</span>
                                                        <span>추천</span>
                                                        <span>수정</span>
                                                        <span className="text-red-500">삭제</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {/* 답글 입력창 */}
                                {replyBox[comment.id] && (
                                    <div className="ml-10 mt-4">
                                        <textarea
                                            className="w-full p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-main"
                                            rows={2}
                                            placeholder="답글을 입력하세요."
                                        ></textarea>
                                        <div className="flex justify-end">
                                            <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">
                                                답글 작성
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* 댓글 작성 영역 */}
                    <div className="bg-gray-100 p-4 rounded-lg shadow-inner mt-4">
                        {/* 텍스트 에리어 */}
                        <textarea
                            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-main"
                            rows={3}
                            placeholder="댓글을 입력하세요."
                        ></textarea>

                        <div className="flex justify-between items-center">
                            {/* 이미지 추가 버튼 */}
                            <button className="bg-gray-200 p-3 rounded-lg">
                                <span className="text-gray-500 text-xl">+</span>
                            </button>
                            
                            {/* 작성 버튼 */}
                            <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">
                                작성
                            </button>
                        </div>
                    </div>
                </div>



            </div>
            
        </div>
    )
}
export default PostDetail;