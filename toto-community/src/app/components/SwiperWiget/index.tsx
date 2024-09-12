"use client"

import Image from "next/image";

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

const SwiperWiget = () => {
    return (
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
    )
}

export default SwiperWiget;