import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./components/MobileMenu";
import SwiperWiget from "./components/SwiperWiget";
import PostWidget from "./components/PostWidget";
import { fetchComments, fetchPosts } from "./utils/queryHelpers";


export default async function Home() {

  // 서버에서 데이터를 prefetch
  const posts = await fetchPosts();

  return (
        <div className="lg:flex-grow space-y-6" style={{width: '100%'}}>
          
          {/* 야구 일정 위젯 */}
          <SwiperWiget/>

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
              테스트를 위한 관리자 계정은 <strong>admin / 123456</strong> 입니다.
            </p>
          </div>

          {/* 자유게시판 및 갤러리 위젯들 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 자유게시판 위젯 */}
                <PostWidget initialPosts={posts} />
            
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
      <MobileMenu/>
    </div>
  );
}