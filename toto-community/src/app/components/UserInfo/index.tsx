"use client"

import { signOut, useSession } from "next-auth/react";
import LoginForm from "../LoginForm";
import Link from "next/link";

const UserInfo = () => {
    const { data: session } = useSession();
    
    return (
        <>
            {
            session
                ? 
                <div className="bg-white p-4 rounded-lg shadow-inner">
                    <h2 className="text-lg font-bold text-black mb-4">{session.user.nickname}</h2>
                    <ul className="text-sm text-gray-600 mb-4">
                    <li>포인트 {session.user.points}점</li>
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
        </>
    )
}

export default UserInfo;