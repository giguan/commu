"use client"

import { useState } from "react";
import Image from "next/image";
import Link from 'next/link';

const Bookmark = () => {

    const [category, setCategory] = useState('all');


    //이미지 도메인을 next.config.js 에 등록해놓음 테스트니까 후에 삭제필요
    const bookmarks = [
        {
          id: 1,
          image: "/coupang-logo.png", // 여기에 실제 이미지 경로를 설정하세요
          siteName: "쿠팡",
          code: "bg123",
          linkref: "https://picsum.photos/700/700",
        },
        {
          id: 2,
          image: "/upbit-logo.png", // 여기에 실제 이미지 경로를 설정하세요
          siteName: "업비트",
          code: "final123",
          linkref: "https://picsum.photos/700/700",

        },
        {
          id: 3,
          image: "/binance-logo.png", // 여기에 실제 이미지 경로를 설정하세요
          siteName: "바이낸스",
          code: "1234",
          linkref: "https://picsum.photos/700/700",

        },
    ]

    return (
        <div className="lg:flex-grow space-y-6">

            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold text-black">북마크</h2>
                </div>
            </div>

            {/* 카테고리 선택 */}
            <div className="flex space-x-4 mb-4">
                <button
                    type="button"
                    className={`py-2 px-4 rounded-md w-28 hover:bg-gray-400 ${category === "all" ? "bg-gray-400 text-white" : "bg-gray-300 text-black"}`}
                    onClick={() => setCategory("all")}
                >
                    전체
                </button>
                <button
                    type="button"
                    className={`py-2 px-4 rounded-md w-28 hover:bg-gray-400 hover:text-white ${category === "1" ? "bg-gray-400 text-white" : "bg-gray-300 text-black"}`}
                    onClick={() => setCategory("1")}
                >
                    1
                </button>
                <button
                    type="button"
                    className={`py-2 px-4 rounded-md w-28 hover:bg-gray-400 hover:text-white ${category === "2" ? "bg-gray-400 text-white" : "bg-gray-300 text-black"}`}
                    onClick={() => setCategory("2")}
                >
                    2
                </button>
                <button
                    type="button"
                    className={`py-2 px-4 rounded-md w-28 hover:bg-gray-400 hover:text-white ${category === "3" ? "bg-gray-400 text-white" : "bg-gray-300 text-black"}`}
                    onClick={() => setCategory("3")}
                >
                    3
                </button>
                <button
                    type="button"
                    className={`py-2 px-4 rounded-md w-28 hover:bg-gray-400 hover:text-white ${category === "4" ? "bg-gray-400 text-white" : "bg-gray-300 text-black"}`}
                    onClick={() => setCategory("4")}
                >
                    4
                </button>
                <button
                    type="button"
                    className={`py-2 px-4 rounded-md w-28 hover:bg-gray-400 hover:text-white ${category === "5" ? "bg-gray-400 text-white" : "bg-gray-300 text-black"}`}
                    onClick={() => setCategory("5")}
                >
                    5
                </button>
                <button
                    type="button"
                    className={`py-2 px-4 rounded-md w-28 hover:bg-gray-400 hover:text-white ${category === "6" ? "bg-gray-400 text-white" : "bg-gray-300 text-black"}`}
                    onClick={() => setCategory("6")}
                >
                    6
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {bookmarks.map((bookmark) => (
                <div key={bookmark.id} className="bg-white p-4 rounded-lg shadow-md">
                    <Image src={bookmark.linkref} alt={bookmark.siteName} width={200} height={100} className="mx-auto" />
                    <div className="mt-4">
                    <p className="text-sm font-bold text-gray-600">사이트 이름</p>
                    <p className="text-lg font-bold text-black">{bookmark.siteName}</p>
                    <p className="text-sm font-bold text-gray-600 mt-2">코드</p>
                    <p className="text-lg font-bold text-red-500">{bookmark.code}</p>
                    </div>
                    <div className="flex justify-between mt-4">
                    <button className="text-sm text-gray-600 border rounded-md px-4 py-2">상세 +</button>
                    <Link href="#">
                        <button className="text-sm text-red-500 border border-red-500 rounded-md px-4 py-2">
                        바로가기 <span>&#x1F517;</span>
                        </button>
                    </Link>
                    </div>
                </div>
                ))}
            </div>

        </div>
    );
}

export default Bookmark;