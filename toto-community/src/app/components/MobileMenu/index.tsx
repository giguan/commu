'use client'; // 클라이언트 컴포넌트로 선언

import { useState } from 'react';
import Link from 'next/link';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false); // 모바일 메뉴 상태 관리

  return (
    <div>
      {/* 모바일 메뉴 버튼 */}
      <div className="lg:hidden p-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen} // 접근성 향상
          className="bg-primary-main text-white p-2 rounded-md w-full"
        >
          {isOpen ? '메뉴 닫기' : '메뉴 열기'}
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
};

export default MobileMenu;
