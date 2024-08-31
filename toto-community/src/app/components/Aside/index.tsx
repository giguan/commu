"use client"

import Link from "next/link"
import { useCallback, useState } from "react"
import { toast, Toaster } from "react-hot-toast"

const Aside = () => {

    const [loginCheck, setLoginCheck] = useState(false)

    const handleLogin = useCallback(() => {
      setLoginCheck((prev) => !prev);

      if(loginCheck) {
        toast.success('안녕히가세요 관리자님')
      } else {
        toast.success('안녕하세요 관리자님')
      }

    }, [loginCheck])

    return (

        <div className="lg:w-[30%] flex-shrink-0 space-y-4 mb-6 lg:mb-0">
          <Toaster position="top-center" />
          {
            loginCheck ? 
              <div className="bg-white p-4 rounded-lg shadow-inner">
                <h2 className="text-lg font-bold text-black mb-4">관리자 님</h2>
                <ul className="text-sm text-gray-600 mb-4">
                  <li>포인트 0점</li>
                  <li>게시글 0개</li>
                  <li>댓글 0개</li>
                  <li>쪽지 0개</li>
                  <li>저장한 글 0개</li>
                </ul>
                <div className="flex space-x-4">
                  <button className="w-full bg-[#f5f6f9] text-[#697183] p-2 rounded-md">
                    정보수정
                  </button>
                  <button className="w-full bg-[#f5f6f9] text-[#697183] p-2 rounded-md">
                    나의 활동
                  </button>
                </div>
                <button className="w-full bg-[#f5f6f9] text-[#697183] p-2 rounded-md mt-2">
                  관리자
                </button>
                <button className="w-full bg-[#f5f6f9] text-[#697183] p-2 rounded-md mt-2" onClick={handleLogin}>
                  로그아웃
                </button>
              </div>
              :
              <div className="bg-gray-100 p-2 rounded-lg">
                <input
                  type="text"
                  placeholder="아이디 또는 이메일"
                  className="w-full p-3 text-black font-semibold mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-main"
                />
                <input
                  type="password"
                  placeholder="비밀번호"
                  className="w-full p-3 text-black font-semibold mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-main"
                />
                <button className="w-full  bg-gray-700 text-white p-3 rounded-md" onClick={handleLogin}>
                  로그인
                </button>
                <div className="flex justify-between mt-4 text-xs text-gray-400">
                  <Link href="/find-password" className="hover:text-primary-main">
                    비밀번호 찾기
                  </Link>
                  <Link href="/signup" className="hover:text-primary-main">
                    회원가입
                  </Link>
                </div>
              </div>
          
          }

          {/* 실시간 채팅 위젯 */}
          <div className="bg-white p-4 rounded-lg shadow-inner">
            <h3 className="text-lg font-bold text-black mb-2">실시간채팅 (2)</h3>
            <p className="text-xs text-grayscale-400 mb-2">2024. 8. 29.</p>
            <div className="space-y-2 overflow-y-auto max-h-80 p-1 rounded-md">
              
              <p className="text-xs text-gray-500">
                <span className="text-green-500 font-bold ml-1">4 빠르밍</span> 04:00:10
              </p>
              <div className="bg-[#F2F2F2] p-2 rounded-lg shadow">
                <p className="text-xs text-black">스토리지도 더 늘어났던데, 용량 걱정 덜겠음 ㅋㅋ</p>
              </div>


              <p className="text-xs text-gray-500">
                <span className="text-orange-500 font-bold ml-1">5 달타령</span> 04:00:10
              </p>
              <div className="bg-[#F2F2F2] p-2 rounded-lg shadow">
                <p className="text-xs text-black">맞음요, 1TB 모델도 나왔잖아요ㅎㅎ</p>
              </div>

              <p className="text-xs text-gray-500">
                <span className="text-orange-500 font-bold ml-1">5 달타령</span> 04:00:10
              </p>
              <div className="bg-[#F2F2F2] p-2 rounded-lg shadow">
                <p className="text-xs text-black">맞음요, 1TB 모델도 나왔잖아요ㅎㅎ</p>
              </div>

              <p className="text-xs text-gray-500">
                <span className="text-orange-500 font-bold ml-1">5 달타령</span> 04:00:10
              </p>
              <div className="bg-[#F2F2F2] p-2 rounded-lg shadow">
                <p className="text-xs text-black">맞음요, 1TB 모델도 나왔잖아요ㅎㅎ</p>
              </div>

              <p className="text-xs text-gray-500">
                <span className="text-orange-500 font-bold ml-1">5 달타령</span> 04:00:10
              </p>
              <div className="bg-[#F2F2F2] p-2 rounded-lg shadow">
                <p className="text-xs text-black">맞음요, 1TB 모델도 나왔잖아요ㅎㅎ</p>
              </div>
            </div>
            
            <input
              type="text"
              placeholder="메시지를 입력하세요"
              className="w-full p-2 mt-2 border border-gray-300 rounded-md bg-[#E9EBF1] text-sm text-black"
            />

          </div>

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