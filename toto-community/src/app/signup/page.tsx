"use client";

import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import router, { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const SignUp = () => {

    const router = useRouter();

    const { data:session } = useSession();

    if(session) {
        // <button onClick={showConfirmToast}>확인 메시지 띄우기</button>
        router.push('/');
    }


    const [username, setUsername] = useState("");
    const [usernameYn, setUsernameYn] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [nicknameYn, setNicknameYn] = useState(false);

    const [email, setEmail] = useState("");
    const [agreed, setAgreed] = useState(false);

    const [errors, setErrors] = useState({
        username: "",
        usernameYn: "",
        password: "",
        confirmPassword: "",
        nickname: "",
        nicknameYn: "",
        email: "",
        agreed: ""
    });

    const [isUsernameValid, setIsUsernameValid] = useState(false);
    const [isNicknameValid, setIsNicknameValid] = useState(false);

    const validateField = (name: string, value: any) => {
        let errorMessage = "";

        // 특수 문자 정규식
        const specialCharRegex = /[!@#\$%\^\&*\)\(+=._-]+/g;
        // 공백 정규식
        const spaceRegex = /\s/g;

        switch (name) {
            case "username":
                if (!value) {
                    errorMessage = "아이디를 입력하세요.";
                } else if (specialCharRegex.test(value)) {
                    errorMessage = "아이디에 특수 문자를 포함할 수 없습니다.";
                } else if (spaceRegex.test(value)) {
                    errorMessage = "아이디에 공백을 포함할 수 없습니다.";
                }
                break;
            case "password":
                if (value.length < 6) {
                    errorMessage = "비밀번호는 6자리 이상이어야 합니다.";
                } else if (spaceRegex.test(value)) {
                    errorMessage = "비밀번호에 공백을 포함할 수 없습니다.";
                }
                break;
            case "confirmPassword":
                if (value !== password) {
                    errorMessage = "비밀번호가 일치하지 않습니다.";
                } else if (spaceRegex.test(value)) {
                    errorMessage = "비밀번호 확인에 공백을 포함할 수 없습니다.";
                }
                break;
            case "nickname":
                if (!value) {
                    errorMessage = "닉네임을 입력하세요.";
                } else if (specialCharRegex.test(value)) {
                    errorMessage = "닉네임에 특수 문자를 포함할 수 없습니다.";
                } else if (spaceRegex.test(value)) {
                    errorMessage = "닉네임에 공백을 포함할 수 없습니다.";
                }
                break;
            case "email":
                if (!value) {
                    errorMessage = "이메일을 입력하세요.";
                } else if (!/\S+@\S+\.\S+/.test(value)) {
                    errorMessage = "올바른 이메일 형식을 입력하세요.";
                } else if (spaceRegex.test(value)) {
                    errorMessage = "이메일에 공백을 포함할 수 없습니다.";
                }
                break;
            default:
                break;
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errorMessage,
        }));
    };

    useEffect(() => {
        // 공백과 특수문자가 없을 때만 유효한 상태로 설정
        const spaceRegex = /\s/g;

        setIsUsernameValid(username !== "" && !spaceRegex.test(username));
        setIsNicknameValid(nickname !== "" && !spaceRegex.test(nickname));
    }, [username, nickname]);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        // 마지막으로 모든 필드를 한 번에 체크합니다.
        validateField("username", username);
        validateField("password", password);
        validateField("confirmPassword", confirmPassword);
        validateField("nickname", nickname);
        validateField("email", email);

        if(!usernameYn) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                usernameYn: "아이디 중복 확인을 해주세요."
            }))
            return
        }

        if(!nicknameYn) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                nicknameYn: "닉네임 중복 확인을 해주세요."
            }))
            return
        }

        if (!agreed) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                agreed: "이용 약관에 동의해 주세요.",
            }));
            return;
        }

        const hasErrors = Object.values(errors).some((error) => error);
        if (hasErrors) return;

        // Proceed with signup
        try {
            await axios.post("/api/auth/signup", {
                id: username,
                password,
                email,
                nickname
            });

            toast.success("회원가입이 완료되었습니다.");

            const result = await signIn("credentials", {
                redirect: false,
                username,
                password,
            });

            if (result?.error) {
                toast.error("로그인에 실패했습니다.");
            } else {
                toast.success("로그인에 성공했습니다.");
                router.push('/') // 로그인 성공 시 메인 화면으로 이동
            }

        } catch (error) {
            toast.error("회원가입 중 문제가 발생했습니다.");
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        validateField(name, value);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        switch (name) {
            case "username":
                setUsername(value);
                break;
            case "password":
                setPassword(value);
                break;
            case "confirmPassword":
                setConfirmPassword(value);
                break;
            case "nickname":
                setNickname(value);
                break;
            case "email":
                setEmail(value);
                break;
            default:
                break;
        }

        // 실시간으로 유효성 검사를 수행하지 않으려면 여기서 validateField를 호출하지 마세요.
    };

    const checkUsername = async () => {
        try {
            const response = await axios.post("/api/user/duple-id", {
                id: username,
            });

            if (response.data.available) {
                setUsernameYn(true);  // 유효한 경우 상태 업데이트
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    usernameYn: "",  // 기존 오류 메시지 제거
                }));
                toast.success("사용 가능한 ID입니다.");
            } 
        } catch (error: any) {
            
            console.log(error)

            if(error.request.status === 409) {
                setUsernameYn(false);
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    usernameYn: "이미 사용 중인 ID입니다.",
                }));
                toast.error("이미 사용 중인 ID입니다.");
            } else {
                setUsernameYn(false);
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    usernameYn: error.response?.data?.error || "중복 검사 중 문제가 발생했습니다.",
                }));
            }

        }
    }

    const checkNickname = async () => {
        try {
            const response = await axios.post("/api/user/duple-nickname", {
                nickname,
            });
    
            if (response.data.available) {
                setNicknameYn(true);  // 유효한 경우 상태 업데이트
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    nicknameYn: "",  // 기존 오류 메시지 제거
                }));
                toast.success("사용 가능한 닉네임입니다.");
            } 
        } catch (error: any) {

            if(error.request.status === 409) {
                setNicknameYn(false);
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    nicknameYn: "이미 사용 중인 닉네임입니다.",
                }));
                toast.error("이미 사용 중인 닉네임입니다.");
            } else {
                setNicknameYn(false);
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    nicknameYn: error.response?.data?.error || "중복 검사 중 문제가 발생했습니다.",
                }));
            }

        }
    };

    return (
        <div className="lg:flex-grow space-y-6">
            <Toaster position="top-center" />
            <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold text-black">회원가입</h2>
                </div>
            </div>
            
            <form onSubmit={handleSignup} className="max-w-md mx-auto mt-10 p-8 rounded-lg space-y-6">
                <h2 className="text-center text-2xl font-bold text-gray-900">회원가입</h2>

                <div className="flex items-center space-x-4">
                    <div className="flex-grow">
                        <input
                            type="text"
                            placeholder="아이디"
                            name="username"
                            value={username}
                            onChange={handleChange}
                            onBlur={handleBlur}  // 포커스가 벗어날 때 유효성 검사
                            className={`w-full px-4 py-2 border ${errors.username ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-main text-black`}
                            required
                        />
                    </div>
                    <button
                        type="button"
                        onClick={checkUsername}
                        disabled={!isUsernameValid}
                        className="bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none"
                    >
                        중복 검사
                    </button>
                </div>
                <div>
                    {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                    {errors.usernameYn && <p className="text-red-500 text-sm mt-1">{errors.usernameYn}</p>}
                </div>

                <div>
                    <input
                        type="password"
                        placeholder="비밀번호 (6자리 이상)"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        onBlur={handleBlur}  // 포커스가 벗어날 때 유효성 검사
                        className={`w-full px-4 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-main text-black`}
                        required
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <div>
                    <input
                        type="password"
                        placeholder="비밀번호 확인"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}  // 포커스가 벗어날 때 유효성 검사
                        className={`w-full px-4 py-2 border ${errors.confirmPassword ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-main text-black`}
                        required
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>

                <div className="flex items-center space-x-4">
                    <div className="flex-grow">
                        <input
                            type="text"
                            placeholder="닉네임 (2~10)"
                            name="nickname"
                            value={nickname}
                            onChange={handleChange}
                            onBlur={handleBlur}  // 포커스가 벗어날 때 유효성 검사
                            className={`w-full px-4 py-2 border ${errors.nickname ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-main text-black`}
                            required
                        />
                    </div>
                    <button
                        type="button"
                        onClick={checkNickname}
                        disabled={!isNicknameValid}
                        className="bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none"
                    >
                        중복 검사
                    </button>
                </div>
                <div>
                    {errors.nickname && <p className="text-red-500 text-sm mt-1">{errors.nickname}</p>}
                    {errors.nicknameYn && <p className="text-red-500 text-sm mt-1">{errors.nicknameYn}</p>}
                </div>

                <div>
                    <input
                        type="email"
                        placeholder="이메일"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        onBlur={handleBlur}  // 포커스가 벗어날 때 유효성 검사
                        className={`w-full px-4 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-main text-black`}
                        required
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => {
                            setAgreed(e.target.checked);
                            validateField("agreed", e.target.checked);
                        }}
                        className="h-4 w-4 text-primary-main focus:ring-primary-main border-gray-300 rounded text-black"
                    />
                    <label htmlFor="agreed" className="ml-2 text-sm text-gray-600">
                        위 내용을 모두 확인하였으며, 모두 동의합니다
                    </label>
                </div>
                {errors.agreed && <p className="text-red-500 text-sm mt-1">{errors.agreed}</p>}

                <button
                    type="submit"
                    className="w-full bg-gray-700 text-white py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-main text-black"
                >
                    회원가입
                </button>
            </form>
        </div>
    );
}

export default SignUp;
