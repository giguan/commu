import Link from "next/link"
import { Toaster } from "react-hot-toast"
// import ChatList from "../ChatList";
// import RecentPostAndComment from "../RecentPostAndComment";
// import UserInfo from "../UserInfo";
import { fetchComments, fetchPosts } from "@/app/utils/queryHelpers";
import dynamic from "next/dynamic";
import { useQueryClient } from "@tanstack/react-query";

const ChatList = dynamic(() => import("../ChatList"), { ssr: false });
const RecentPostAndComment = dynamic(() => import("../RecentPostAndComment"), { ssr: false });
const UserInfo = dynamic(() => import("../UserInfo"), { ssr: false });

export default async function Aside () {

    const posts = await fetchPosts()
    const comments = await fetchComments()

    return (

        <div className="lg:w-[30%] flex-shrink-0 space-y-4 mb-6 lg:mb-0">
          <Toaster position="top-center" />
          <UserInfo/>

          {/* 실시간 채팅 위젯 */}
          <ChatList />
          

          {/* 자유게시판 위젯 */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base font-semibold text-black">자유게시판</h2>
              <Link href="/community" className="text-primary-main text-xs font-medium">
                더보기
              </Link>
            </div>
            <ul className="text-xs text-gray-800 space-y-1.5">
              <li className="flex justify-between items-center border-b border-gray-200 py-1.5">
                <div className="flex items-center">
                  <span className="bg-grayscale-200 text-gray-700 text-xs px-2 py-1 rounded-lg mr-2 font-semibold">일반</span>
                  <Link href="/community/1" className="hover:text-primary-main truncate font-medium">
                    애플 키보드 트랙패드 기타 구입
                  </Link>
                </div>
                <span className="text-xs text-gray-400 font-medium">2024.08.29</span>
              </li>
              <li className="flex justify-between items-center border-b border-gray-200 py-1.5">
                <div className="flex items-center">
                  <span className="bg-grayscale-200 text-gray-700 text-xs px-2 py-1 rounded-lg mr-2 font-semibold">일반</span>
                  <Link href="/community/2" className="hover:text-primary-main truncate font-medium">
                    애플티비가 은근히 볼게 많습니다
                  </Link>
                </div>
                <span className="text-xs text-gray-400 font-medium">2024.08.29</span>
              </li>
              <li className="flex justify-between items-center border-b border-gray-200 py-1.5">
                <div className="flex items-center">
                  <span className="bg-grayscale-200 text-gray-700 text-xs px-2 py-1 rounded-lg mr-2 font-semibold">일반</span> 
                  <Link href="/community/3" className="hover:text-primary-main truncate font-medium">
                    아이폰 14 프로 맥스 팀 퍼플
                  </Link>
                </div>
                <span className="text-xs text-gray-400 font-medium">2024.08.29</span>
              </li>
              <li className="flex justify-between items-center border-b border-gray-200 py-1.5">
                <div className="flex items-center">
                  <span className="bg-grayscale-200 text-gray-700 text-xs px-2 py-1 rounded-lg mr-2 font-semibold">일반</span>
                  <Link href="/community/4" className="hover:text-primary-main truncate font-medium">
                    블룸버그 밤 맥 프로, 아이맥 프로, 맥 미니
                  </Link>
                </div>
                <span className="text-xs text-gray-400 font-medium">2024.08.29</span>
              </li>
              <li className="flex justify-between items-center py-1.5">
                <div className="flex items-center">
                  <span className="bg-grayscale-200 text-gray-700 text-xs px-2 py-1 rounded-lg mr-2 font-semibold">일반</span>
                  <Link href="/community/5" className="hover:text-primary-main truncate font-medium">
                    스튜디오 듀오와 데스크셋업
                  </Link>
                  <span className="text-red-500 text-xs font-bold ml-2">N</span>
                </div>
                <span className="text-xs text-gray-400 font-medium">2024.08.29</span>
              </li>
            </ul>
          </div>

          {/* 새 글 및 새 댓글 위젯 */}
          <RecentPostAndComment initialPosts={posts} initialComments={comments}/>

        </div>
    )
}