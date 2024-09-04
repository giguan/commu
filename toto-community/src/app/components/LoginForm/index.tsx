"use client"

import { signIn } from "next-auth/react";
import Link from "next/link";
import router, { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast"

const LoginForm = () => {

    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const result = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });

        console.log(result)
        
        if (result?.error) {
            toast.error(result.error);
        } else {
            toast.success("로그인 성공!");
        }

    };

    return (
        <div className="bg-gray-100 p-2 rounded-lg">
            <Toaster position="top-center" />
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="아이디"
                    className="w-full p-3 text-black font-semibold mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-main"
                    value={username}
                    pattern="[A-Za-z]+" 
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    className="w-full p-3 text-black font-semibold mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-main"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="w-full  bg-gray-700 text-white p-3 rounded-md">
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
            </form>
            </div>
    )
}

export default LoginForm;