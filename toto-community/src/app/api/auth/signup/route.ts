// src/app/api/auth/signup/route.ts

// import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

// const prisma = new PrismaClient();

export async function POST(request: Request) {
    const { id, email, password, nickname } = await request.json();

    // 비밀번호 해시화
    const hashedPassword = await hash(password, 10);

    try {
        // 새로운 사용자 생성
        const response  = await axios.post(`${process.env.BACKEND_SERVER}/api/user/signup`, {
            id,  // 사용자가 입력한 id를 사용
            email,
            password: hashedPassword,
            nickname,
        });

        const user = response.data;


        return NextResponse.json({ user });
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json({ error: "Signup failed" }, { status: 500 });
    }
}
