"use client"

import { useState } from "react";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [agreed, setAgreed] = useState(false);

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();

        if (!agreed) {
        alert("이용 약관에 동의해 주세요.");
        return;
        }

        // TODO: 회원가입 로직 구현
        console.log({ username, password, confirmPassword, nickname, email });
    };

    const checkNickname = () => {
        // TODO: 닉네임 중복 검사 로직 구현
        console.log("닉네임 중복 검사 중...", nickname);
    };
    return (
        <div className="lg:flex-grow space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold text-black">회원가입</h2>
                </div>
            </div>
            
            <form onSubmit={handleSignup} className="max-w-md mx-auto mt-10 p-8 rounded-lg space-y-6">
                <h2 className="text-center text-2xl font-bold text-gray-900">회원가입</h2>

                <input
                    type="text"
                    placeholder="아이디"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-main text-black"
                    required
                />

                <input
                    type="password"
                    placeholder="비밀번호 (6자리 이상)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-main text-black"
                    required
                />

                <input
                    type="password"
                    placeholder="비밀번호 확인"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-main text-black"
                    required
                />

                <div className="flex items-center space-x-4">
                    <input
                    type="text"
                    placeholder="닉네임 (2~10)"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-main text-black"
                    required
                    />
                    <button
                    type="button"
                    onClick={checkNickname}
                    className="bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none"
                    >
                    중복 검사
                    </button>
                </div>

                <input
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-main text-black"
                    required
                />

                <div className="flex items-center">
                    <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="h-4 w-4 text-primary-main focus:ring-primary-main border-gray-300 rounded text-black"
                    />
                    <label htmlFor="agreed" className="ml-2 text-sm text-gray-600">
                    위 내용을 모두 확인하였으며, 모두 동의합니다
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full bg-gray-700 text-white py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-main text-black"
                >
                    회원가입
                </button>
                </form>
        </div>
    )
}

export default SignUp;