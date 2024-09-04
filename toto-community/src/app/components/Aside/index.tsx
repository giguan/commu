"use client"

import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { toast, Toaster } from "react-hot-toast"

import { signOut, useSession } from "next-auth/react";
import LoginForm from "../LoginForm";
import ChatList from "../ChatList";


const Aside = () => {
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);

    return (

        <div className="lg:w-[30%] flex-shrink-0 space-y-4 mb-6 lg:mb-0">
          <Toaster position="top-center" />
          {
            session ? 
              <div className="bg-white p-4 rounded-lg shadow-inner">
                <h2 className="text-lg font-bold text-black mb-4">{session.user?.name}</h2>
                <ul className="text-sm text-gray-600 mb-4">
                  <li>포인트 0점</li>
                  <li>게시글 0개</li>
                  <li>댓글 0개</li>
                  <li>쪽지 0개</li>
                  <li>저장한 글 0개</li>
                </ul>
                <div className="flex space-x-4">
                  <button className="w-full bg-[#f5f6f9] text-[#697183] p-2 rounded-md">
                    <Link href={'/Userinfo'}>
                      정보수정
                    </Link>
                  </button>
                  <button className="w-full bg-[#f5f6f9] text-[#697183] p-2 rounded-md">
                    나의 활동
                  </button>
                </div>
                <button className="w-full bg-[#f5f6f9] text-[#697183] p-2 rounded-md mt-2">
                  관리자
                </button>
                <button 
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="w-full bg-[#f5f6f9] text-[#697183] p-2 rounded-md mt-2"
                >
                  로그아웃
                </button>
              </div>
              :
              <LoginForm />
          }

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
          <NewPostsComments/>

        </div>
    )
}

export function NewPostsComments() {
    const [activeTab, setActiveTab] = useState('newPosts');
  
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex border-b border-gray-200">
          <button
            className={`w-1/2 text-center py-2 font-semibold ${activeTab === 'newPosts' ? 'text-red-500 border-b-2 border-red-500' : 'text-black'}`}
            onClick={() => setActiveTab('newPosts')}
          >
            새 글
          </button>
          <button
            className={`w-1/2 text-center py-2 font-semibold ${activeTab === 'newComments' ? 'text-red-500 border-b-2 border-red-500' : 'text-black'}`}
            onClick={() => setActiveTab('newComments')}
          >
            새 댓글
          </button>
        </div>
        <div className="mt-4">
          {activeTab === 'newPosts' && (
            <ul className="text-sm space-y-2">
              <li className="flex justify-between">
                <div className="flex items-center whitespace-nowrap max-w-[75%]">
                  <span className="text-red-500 font-semibold">[맛집]</span> 
                  <span className="text-black ml-1 truncate">부모님 생신 기념 오마카세 방문 후기 🍣</span>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap">12시간전</span>
              </li>
              <li className="flex justify-between">
                <div className="flex items-center whitespace-nowrap max-w-[75%]">
                  <span className="text-red-500 font-semibold">[맛집]</span> 
                  <span className="text-black ml-1 truncate">무지개 떡 크레이프 카페에서 생일 케이크 🍰</span>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap">12시간전</span>
              </li>
              <li className="flex justify-between">
                <div className="flex items-center whitespace-nowrap max-w-[75%]">
                  <span className="text-red-500 font-semibold">[맛집]</span> 
                  <span className="text-black ml-1 truncate">삼겹살 제대로 먹을 수 있는 곳!</span>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap">12시간전</span>
              </li>
              <li className="flex justify-between">
                <div className="flex items-center whitespace-nowrap max-w-[75%]">
                  <span className="text-red-500 font-semibold">[맛집]</span> 
                  <span className="text-black ml-1 truncate">서울에서 묵은지 두부 김치찌개 맛집</span>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap">12시간전</span>
              </li>
              <li className="flex justify-between">
                <div className="flex items-center whitespace-nowrap max-w-[75%]">
                  <span className="text-red-500 font-semibold">[쿠팡파트너스]</span> 
                  <span className="text-black ml-1 truncate">사무실과 집 셋업 (이케아 추천)</span>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap">12시간전</span>
              </li>
            </ul>
          )}
          {activeTab === 'newComments' && (
            <ul className="text-sm space-y-2">
              <li className="flex justify-between">
                <div className="flex items-center whitespace-nowrap max-w-[75%]">
                  <span className="text-red-500 font-semibold">[유튜브]</span> 
                  <span className="text-black ml-1 truncate">ㅋㅋㅋㅋㅋㅋ</span>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap">12시간전</span>
              </li>
              <li className="flex justify-between">
                <div className="flex items-center whitespace-nowrap max-w-[75%]">
                  <span className="text-red-500 font-semibold">[갤러리]</span> 
                  <span className="text-black ml-1 truncate">ㅋㅋㅋㅋㅋㅋ</span>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap">12시간전</span>
              </li>
              <li className="flex justify-between">
                <div className="flex items-center whitespace-nowrap max-w-[75%]">
                  <span className="text-red-500 font-semibold">[자유게시판]</span> 
                  <span className="text-black ml-1 truncate">ㅋㅋㅋㅋㅋㅋ</span>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap">12시간전</span>
              </li>
              <li className="flex justify-between">
                <div className="flex items-center whitespace-nowrap max-w-[75%]">
                  <span className="text-red-500 font-semibold">[자유게시판]</span> 
                  <span className="text-black ml-1 truncate">ㅋㅋㅋㅋㅋㅋ</span>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap">12시간전</span>
              </li>
            </ul>
          )}
        </div>
      </div>
    );
  }

  export default Aside;