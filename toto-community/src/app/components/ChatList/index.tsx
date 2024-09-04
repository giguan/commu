"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import io, { Socket } from "socket.io-client";
import dotenv from 'dotenv';

// 소켓과 메시지 타입 정의
interface Message {
    username: string;
    text: string;
    time: string;
}

interface ServerToClientEvents {
    previousMessages: { username: string; text: string; time: string }[]; 
    message: (message: Message) => void;
    onlineUsers: (count: number) => void;
}

interface ClientToServerEvents {
    message: (message: Message) => void;
}


dotenv.config();

let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

const ChatList = () => {
    const { data: session } = useSession();

    const [messages, setMessages] = useState<{ username: string; text: string; time: string }[]>([]);
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("Guest");
    const [onlineUsers, setOnlineUsers] = useState(0);

    const chatContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // 로그인된 사용자의 닉네임을 설정
        if (!socket) {
            socket = io(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}`); // 서버 주소
        }

        if (session?.user?.name) {
            setUsername(session.user.name);
        }

        // 서버에서 이전 메시지를 받을 때
        socket.on("previousMessages", (previousMessages) => {
            setMessages(previousMessages);
        });

        // 서버에서 'message' 이벤트를 받을 때
        socket.on("message", (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        // 서버에서 'onlineUsers' 이벤트를 받을 때
        socket.on("onlineUsers", (count) => {
            setOnlineUsers(count); // 접속자 수 업데이트
        });

        // 컴포넌트가 언마운트 될 때 소켓 연결 해제
        return () => {
            socket.off("previousMessages");
            socket.off("message");
            socket.off("onlineUsers");
        };
    }, [session]); // session이 변경될 때마다 useEffect 재실행

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = (e: any) => {

        e.preventDefault();

        if (message.trim() === "") return toast.error('공백 메시지를 보낼 수 없습니다.');

        const currentTime = new Date().toLocaleTimeString();

        // 서버로 메시지 전송
        socket.emit("message", { username, text: message, time: currentTime });

        setMessage(""); // 메시지 입력 필드 비우기
    };


    return (
        <div className="bg-white p-4 rounded-lg shadow-inner">
            <Toaster position="top-center" />
            <h3 className="text-lg font-bold text-black mb-2">실시간채팅 ({onlineUsers})</h3>
            <p className="text-xs text-grayscale-400 mb-2">{new Date().toLocaleDateString()}</p>
            <div 
                ref={chatContainerRef}
                className="space-y-2 overflow-y-auto max-h-80 p-1 rounded-md h-80"
            >
                {messages.map((msg, index) => (
                    <div key={index}>
                        <p className="text-xs text-gray-500 mb-1">
                            <span className="font-bold text-green-500">{msg.username}</span> {msg.time}
                        </p>
                        <div className="bg-[#F2F2F2] p-2 rounded-lg shadow">
                            <p className="text-xs text-black">{msg.text}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    placeholder="메시지를 입력하세요"
                    className="w-full p-2 mt-2 border border-gray-300 rounded-md bg-[#E9EBF1] text-sm text-black"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <div className="flex">
                    {/* <button className="w-20 p-2 mt-2 mr-1 border-gray-300 rounded-md bg-gray-700 text-sm text-white">
                        ...
                    </button> */}
                    <button
                        className="w-full p-2 mt-2 border border-gray-300 rounded-md bg-gray-700 text-sm text-white"
                    >
                        전송
                    </button>

                </div>
            </form>

        </div>
    )
}

export default ChatList;