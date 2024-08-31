"use client"

import { getDisplayName } from "next/dist/shared/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Autoplay, Navigation, Pagination } from 'swiper/modules';

const games = [
  {
    teamA: { name: '한화', score: 0, logo: '/logo/sports/kbo/hanwha.png' },
    teamB: { name: '롯데', score: 5, logo: '/logo/sports/kbo/lotte.png' },
    inning: '4회초',
  },
  {
    teamA: { name: 'KT', score: 3, logo: '/logo/sports/kbo/kt.png' },
    teamB: { name: 'LG', score: 5, logo: '/logo/sports/kbo/lg.png' },
    inning: '6회말',
  },
  {
    teamA: { name: '두산', score: 2, logo: '/logo/sports/kbo/doosan.png' },
    teamB: { name: 'NC', score: 4, logo: '/logo/sports/kbo/nc.png' },
    inning: '7회초',
  },
  {
    teamA: { name: 'SSG', score: 7, logo: '/logo/sports/kbo/ssg.png' },
    teamB: { name: 'KIA', score: 4, logo: '/logo/sports/kbo/kia.png' },
    inning: '7회초',
  },
  {
    teamA: { name: '삼성', score: 0, logo: '/logo/sports/kbo/samsung.png' },
    teamB: { name: '키움', score: 0, logo: '/logo/sports/kbo/kiwoom.png' },
    inning: '8회초',
  },
  {
    teamA: { name: '삼성', score: 0, logo: '/logo/sports/kbo/samsung.png' },
    teamB: { name: '키움', score: 0, logo: '/logo/sports/kbo/kiwoom.png' },
    inning: '8회초',
  },
  {
    teamA: { name: '삼성', score: 0, logo: '/logo/sports/kbo/samsung.png' },
    teamB: { name: '키움', score: 0, logo: '/logo/sports/kbo/kiwoom.png' },
    inning: '8회초',
  },
  {
    teamA: { name: '삼성', score: 0, logo: '/logo/sports/kbo/samsung.png' },
    teamB: { name: '키움', score: 0, logo: '/logo/sports/kbo/kiwoom.png' },
    inning: '8회초',
  },
];

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
        <div id="b" className="lg:flex-grow space-y-6" style={{width: '100%'}}>
          
          {/* 야구 일정 위젯 */}
          <div className="relative bg-gray-100 p-4 rounded-lg mb-32">
            <div className="absolute top-0 left-0 right-0 mx-auto h-[200px] w-full max-w-7xl">
              <Swiper
                  modules={[Navigation, Pagination, Autoplay]} 
                  spaceBetween={10}
                  slidesPerView={5}
                  breakpoints={{
                      340: {
                        slidesPerView: 2,
                      },
                      640: {
                          slidesPerView: 2,
                      },
                      768: {
                          slidesPerView: 3,
                      },
                      1024: {
                          slidesPerView: 5,
                      },
                  }}
                  // navigation
                  // pagination={{ clickable: true }}
                  loop={true}
                  // navigation
                  autoplay={{ 
                    delay: 3000, // 슬라이드가 자동으로 넘어가는 시간 (밀리초)
                }}
              >
              {games.map((game, index) => (
                <SwiperSlide key={index}>
                  <div className="p-4 bg-gray-300 rounded-lg shadow-md text-center">
                    <div className="mb-2 text-sm font-bold">KBO</div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex flex-col items-center">
                        <Image src={game.teamA.logo} alt={game.teamA.name} width={30} height={30} />
                        <span className="text-xs mt-1">{game.teamA.name}</span>
                      </div>
                      <div className="text-xl font-bold whitespace-nowrap">
                        {game.teamA.score} <span className="mx-2">VS</span> {game.teamB.score}
                      </div>
                      <div className="flex flex-col items-center">
                        <Image src={game.teamB.logo} alt={game.teamB.name} width={30} height={30} />
                        <span className="text-xs mt-1">{game.teamB.name}</span>
                      </div>
                    </div>
                    <div className="text-red-500 text-xs">{game.inning}</div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            </div>
          </div>


        <div className="lg:w-full space-y-6">
          {/* 배너 영역 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 배너 1 */}
            <div className="relative bg-black rounded-lg overflow-hidden">
              <Image
                src="/yRJgR8z.png" // 첫 번째 배너 이미지 경로
                alt="배너 이미지 1"
                className="w-full h-full object-cover"
                width={200}
                height={200}
              />
            </div>

            {/* 배너 2 */}
            <div className="relative bg-black rounded-lg overflow-hidden">
              <Image
                src="/RgOVh0g.png" // 두 번째 배너 이미지 경로
                alt="배너 이미지 2"
                className="w-full h-full object-cover"
                width={200}
                height={200}
              />
            </div>
          </div>
        </div>


          {/* 공지 및 인사 */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-sm text-gray-600">
              🎉 이렇게 만들어도 훨씬 더 이쁜 듯. 🎉
              <br />
              테스트를 위한 관리자 계정은 <strong>admin / 123</strong> 입니다.
            </p>
          </div>

          {/* 자유게시판 및 갤러리 위젯들 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 자유게시판 위젯 */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-black">자유게시판</h2>
                <Link href="/community" className="text-primary-main">
                  더보기
                </Link>
              </div>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="border-b border-gray-200 py-2 flex justify-between">
                  <div>
                    <span className="bg-grayscale-200 text-gray-700 text-xs px-2 py-1 rounded-lg mr-2 font-semibold">일반</span>
                    <Link href="/community/1" className="text-xs font-semibold hover:text-primary-main">
                      애플 키보드 트랙패드 기타 구입
                    </Link>
                    <span className="text-red-500 text-xs font-bold ml-2">N</span>
                  </div>
                  
                  <span className="block text-xs text-gray-400 mt-1">
                    2024.08.29
                  </span>
                </li>

                <li className="border-b border-gray-200 py-2 flex justify-between">
                  <div>
                    <span className="bg-grayscale-200 text-gray-700 text-xs px-2 py-1 rounded-lg mr-2 font-semibold">일반</span>
                    <Link href="/community/1" className="text-xs font-semibold hover:text-primary-main">
                    애플티비가 은근히 볼게 많습니다
                    </Link>
                    <span className="text-red-500 text-xs font-bold ml-2">N</span>
                  </div>
                  <span className="block text-xs text-gray-400 mt-1">
                    2024.08.29
                  </span>
                </li>

                <li className="border-b border-gray-200 py-2 flex justify-between">
                  <div>
                    <span className="bg-grayscale-200 text-gray-700 text-xs px-2 py-1 rounded-lg mr-2 font-semibold">일반</span>
                    <Link href="/community/1" className="text-xs font-semibold hover:text-primary-main">
                    아이폰 14 프로 맥스 팀 퍼플
                    </Link>
                  </div>
                  <span className="block text-xs text-gray-400 mt-1">
                    2024.08.29
                  </span>
                </li>

                <li className="border-b border-gray-200 py-2 flex justify-between">
                  <div>
                    <span className="bg-grayscale-200 text-gray-700 text-xs px-2 py-1 rounded-lg mr-2 font-semibold">일반</span>
                    <Link href="/community/1" className="text-xs font-semibold hover:text-primary-main">
                    블룸버그 밤 맥 프로, 아이맥 프로, 맥 미니
                    </Link>
                  </div>
                  <span className="block text-xs text-gray-400 mt-1">
                    2024.08.29
                  </span>
                </li>

                <li className="border-b border-gray-200 py-2 flex justify-between">
                  <div>
                    <span className="bg-grayscale-200 text-gray-700 text-xs px-2 py-1 rounded-lg mr-2 font-semibold">뉴스</span>
                    <Link href="/community/1" className="text-xs font-semibold hover:text-primary-main">
                    스튜디오 듀오와 데스크셋업
                    </Link>
                  </div>
                  <span className="block text-xs text-gray-400 mt-1">
                    2024.08.29
                  </span>
                </li>
              </ul>
            </div>

            {/* 갤러리 위젯 */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-black">갤러리</h2>
                <Link href="/gallery" className="text-primary-main">
                  더보기
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-8">
                <div className="flex flex-col items-center">
                  <Image
                    src="/gallery/0n0EQJw.png"
                    alt="아이폰14 스크린"
                    className="object-cover rounded-md w-28 h-24"
                    width={150}
                    height={100}
                    layout="fixed"
                  />
                  <span className="text-sm text-grayscale-700 font-semibold text-center mt-2">아이폰14 스크린</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image
                    src="/gallery/ATA6szZ.png"
                    alt="M1 맥북프로 14"
                    className="object-cover rounded-md w-28 h-24"
                    width={150}
                    height={100}
                    layout="fixed"
                  />
                  <span className="text-sm text-grayscale-700 font-semibold text-center mt-2">M1 맥북프로 14</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image
                    src="/gallery/B6lsz7V.png"
                    alt="드디어 제 아이폰"
                    className="object-cover rounded-md w-28 h-24"
                    width={150}
                    height={100}
                    layout="fixed"
                  />
                  <span className="text-sm text-grayscale-700 font-semibold text-center mt-2">드디어 제 아이폰</span>
                </div>
                <div className="flex flex-col items-center ">
                  <Image
                    src="/gallery/V664SgM.png"
                    alt="예비 고3 사진"
                    className="object-cover rounded-md w-28 h-24"
                    width={150}
                    height={100}
                    layout="fixed"
                  />
                  <span className="text-sm text-grayscale-700 font-semibold text-center mt-2">예비 고3 사진</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image
                    src="/gallery/V664SgM.png"
                    alt="재택근무 데스크"
                    className="object-cover rounded-md w-28 h-24"
                    width={150}
                    height={100}
                    layout="fixed"
                  />
                  <span className="text-sm text-grayscale-700 font-semibold text-center mt-2">재택근무 데스크</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image
                    src="/gallery/V664SgM.png"
                    alt="오딧트 트위크 프..."
                    className="object-cover rounded-md w-28 h-24"
                    width={150}
                    height={100}
                    layout="fixed"
                  />
                  <span className="text-sm text-grayscale-700 font-semibold text-center mt-2">오딧트 트위크 프...</span>
                </div>
              </div>
            </div>
          </div>

          

          {/* 유튜브 및 뉴스 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* 유튜브 위젯 */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-black">유튜브</h2>
                <Link href="/gallery" className="text-primary-main">
                  더보기
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-8">
                <div className="flex flex-col items-center">
                  <Image
                    src="/gallery/8kVYy5P.png"
                    alt="아이폰14 스크린"
                    className="object-cover rounded-md w-28 h-24"
                    width={150}
                    height={100}
                    layout="fixed"
                  />
                  <span className="text-sm text-grayscale-700 font-semibold text-center mt-2 w-full truncate">NEWJEANS(뉴진스)</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image
                    src="/gallery/A27009B.png"
                    alt="M1 맥북프로 14"
                    className="object-cover rounded-md w-28 h-24"
                    width={150}
                    height={100}
                    layout="fixed"
                  />
                  <span className="text-sm text-grayscale-700 font-semibold text-center mt-2 w-full truncate">BTS(방탄소년단)</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image
                    src="/gallery/ai5yU8U.png"
                    alt="드디어 제 아이폰"
                    className="object-cover rounded-md w-28 h-24"
                    width={150}
                    height={100}
                    layout="fixed"
                  />
                  <span className="text-sm text-grayscale-700 font-semibold text-center mt-2 w-full truncate">EXO(엑소)</span>
                </div>
                <div className="flex flex-col items-center ">
                  <Image
                    src="/gallery/Jg0FF69.png"
                    alt="예비 고3 사진"
                    className="object-cover rounded-md w-28 h-24"
                    width={150}
                    height={100}
                    layout="fixed"
                  />
                  <span className="text-sm text-grayscale-700 font-semibold text-center mt-2 w-full truncate">NEWJEANS(뉴진스)</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image
                    src="/gallery/Rs5dd6y.png"
                    alt="재택근무 데스크"
                    className="object-cover rounded-md w-28 h-24"
                    width={150}
                    height={100}
                    layout="fixed"
                  />
                  <span className="text-sm text-grayscale-700 font-semibold text-center mt-2 w-full truncate">BLACKPINK(블랙핑크)</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image
                    src="/gallery/V664SgM.png"
                    alt="오딧트 트위크 프..."
                    className="object-cover rounded-md w-28 h-24"
                    width={150}
                    height={100}
                    layout="fixed"
                  />
                  <span className="text-sm text-grayscale-700 font-semibold text-center mt-2 w-full truncate">오딧트 트위크 프</span>
                </div>
              </div>
            </div>

            {/* 뉴스 위젯 */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-black">뉴스</h2>
                <Link href="/community" className="text-primary-main">
                  더보기
                </Link>
              </div>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="border-b border-gray-200 py-2 flex justify-between items-center">
                  <div className="flex items-center space-x-2 w-4/5">
                    <span className="bg-grayscale-200 text-gray-700 text-xs px-2 py-1 rounded-lg font-semibold flex-shrink-0">
                      스포츠
                    </span>
                    <Link
                      href="/post/1"
                      className="text-xs font-semibold truncate hover:text-primary-main w-full"
                    >
                      LG 방출신화 또 맞았다 ... 결국 1군 투수코치 변경, 152km 우승청부사불펜 대기 승부수
                    </Link>
                    <span className="text-red-500 text-xs font-bold ml-2 flex-shrink-0">N</span>
                  </div>
                  <span className="block text-xs text-gray-400 mt-1 w-1/5 text-right">
                    2024.08.29
                  </span>
                </li>

                <li className="border-b border-gray-200 py-2 flex justify-between items-center">
                  <div className="flex items-center space-x-2 w-4/5">
                    <span className="bg-grayscale-200 text-gray-700 text-xs px-2 py-1 rounded-lg font-semibold flex-shrink-0">
                      스포츠
                    </span>
                    <Link
                      href="/post/1"
                      className="text-xs font-semibold truncate hover:text-primary-main w-full"
                    >
                      KIA전 코앞인데 삼성 대형 악재 발생, 25홈런 타자 부상 이탈…송은범 엔트리 합류
                    </Link>
                    <span className="text-red-500 text-xs font-bold ml-2 flex-shrink-0">N</span>
                  </div>
                  <span className="block text-xs text-gray-400 mt-1 w-1/5 text-right">
                    2024.08.29
                  </span>
                </li>

                <li className="border-b border-gray-200 py-2 flex justify-between items-center">
                  <div className="flex items-center space-x-2 w-4/5">
                    <span className="bg-grayscale-200 text-gray-700 text-xs px-2 py-1 rounded-lg font-semibold flex-shrink-0">
                      스포츠
                    </span>
                    <Link
                      href="/post/1"
                      className="text-xs font-semibold truncate hover:text-primary-main w-full"
                    >
                      현역 은퇴→403일 만의 1군 복귀 통산 88승 베테랑 감격 감회가 새롭다, 팀 분위기 망칠까 걱정 [고척 현장]
                    </Link>
                    <span className="text-red-500 text-xs font-bold ml-2 flex-shrink-0">N</span>
                  </div>
                  <span className="block text-xs text-gray-400 mt-1 w-1/5 text-right">
                    2024.08.29
                  </span>
                </li>

                <li className="border-b border-gray-200 py-2 flex justify-between items-center">
                  <div className="flex items-center space-x-2 w-4/5">
                    <span className="bg-grayscale-200 text-gray-700 text-xs px-2 py-1 rounded-lg font-semibold flex-shrink-0">
                      스포츠
                    </span>
                    <Link
                      href="/post/1"
                      className="text-xs font-semibold truncate hover:text-primary-main w-full"
                    >
                      선발 전날 음주 논란 롯데 나균안, 징계 해제 이후 첫 실전 등판...2이닝 2실점 최고 146km
                    </Link>
                    <span className="text-red-500 text-xs font-bold ml-2 flex-shrink-0">N</span>
                  </div>
                  <span className="block text-xs text-gray-400 mt-1 w-1/5 text-right">
                    2024.08.29
                  </span>
                </li>

                <li className="border-b border-gray-200 py-2 flex justify-between items-center">
                  <div className="flex items-center space-x-2 w-4/5">
                    <span className="bg-grayscale-200 text-gray-700 text-xs px-2 py-1 rounded-lg font-semibold flex-shrink-0">
                      스포츠
                    </span>
                    <Link
                      href="/post/1"
                      className="text-xs font-semibold truncate hover:text-primary-main w-full"
                    >
                      갑작스럽게 왜 대거 4명이나 2군으로 내려보냈나, 짜릿한 역전승에도... 사령탑이 밝힌 이유는 [잠실 현장]
                    </Link>
                    <span className="text-red-500 text-xs font-bold ml-2 flex-shrink-0">N</span>
                  </div>
                  <span className="block text-xs text-gray-400 mt-1 w-1/5 text-right">
                    2024.08.29
                  </span>
                </li>

              </ul>
            </div>
          </div>

          {/* 꽉 찬 위젯 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-black mb-4">전체 화면을 사용하는 꽉 찬 위젯</h2>
            <div className="text-sm text-gray-600">
              <p>
                이 위젯은 전체 화면을 사용하여 내용을 표시합니다. 필요에 따라
                다양한 컨텐츠를 여기에 포함할 수 있습니다.
              </p>
              <p className="mt-2">
                예를 들어, 긴 텍스트, 큰 이미지 또는 기타 콘텐츠를 이
                영역에 추가할 수 있습니다.
              </p>
            </div>
          </div>

          

      {/* 모바일 메뉴 버튼 */}
      <div className="lg:hidden p-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-primary-main text-white p-2 rounded-md w-full"
        >
          메뉴 열기
        </button>
      </div>

      {/* 모바일 메뉴 */}
      {isOpen && (
        <div className="lg:hidden bg-white p-4 rounded-lg shadow-md">
          <nav className="space-y-2">
            <Link href="/" className="block text-gray-800 hover:text-primary-main">
              홈
            </Link>
            <Link href="/about" className="block text-gray-800 hover:text-primary-main">
              소개
            </Link>
            <Link href="/contact" className="block text-gray-800 hover:text-primary-main">
              연락처
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}



export function SportsSchedule() {
  const games = [
    {
      teamA: { name: '한화', score: 0, logo: '/logo/sports/kbo/hanwha.png' },
      teamB: { name: '롯데', score: 5, logo: '/logo/sports/kbo/lotte.png' },
      inning: '4회초',
    },
    {
      teamA: { name: 'KT', score: 3, logo: '/logo/sports/kbo/kt.png' },
      teamB: { name: 'LG', score: 5, logo: '/logo/sports/kbo/lg.png' },
      inning: '6회말',
    },
    {
      teamA: { name: '두산', score: 2, logo: '/logo/sports/kbo/doosan.png' },
      teamB: { name: 'NC', score: 4, logo: '/logo/sports/kbo/nc.png' },
      inning: '7회초',
    },
    {
      teamA: { name: 'SSG', score: 7, logo: '/logo/sports/kbo/ssg.png' },
      teamB: { name: 'KIA', score: 4, logo: '/logo/sports/kbo/kia.png' },
      inning: '7회초',
    },
    {
      teamA: { name: '삼성', score: 0, logo: '/logo/sports/kbo/samsung.png' },
      teamB: { name: '키움', score: 0, logo: '/logo/sports/kbo/kiwoom.png' },
      inning: '8회초',
    },
    {
      teamA: { name: '삼성', score: 0, logo: '/logo/sports/kbo/samsung.png' },
      teamB: { name: '키움', score: 0, logo: '/logo/sports/kbo/kiwoom.png' },
      inning: '8회초',
    },
    {
      teamA: { name: '삼성', score: 0, logo: '/logo/sports/kbo/samsung.png' },
      teamB: { name: '키움', score: 0, logo: '/logo/sports/kbo/kiwoom.png' },
      inning: '8회초',
    },
    {
      teamA: { name: '삼성', score: 0, logo: '/logo/sports/kbo/samsung.png' },
      teamB: { name: '키움', score: 0, logo: '/logo/sports/kbo/kiwoom.png' },
      inning: '8회초',
    },
  ];

  return (
    <Swiper
      spaceBetween={10} // 슬라이드 간 간격을 10px로 설정
      slidesPerView={1} // 한 줄에 5개의 슬라이드가 보이도록 설정
      navigation
      pagination={{ clickable: true }}
      loop={true} 
      style={{ width: '100%' }}
    >
      {games.map((game, index) => (
        <SwiperSlide key={index}>
            <div style={{backgroundColor: 'red'}}>sss</div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}