import axios from 'axios';
import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

export async function POST(req: Request) {
    const { nickname } = await req.json();


    if (!nickname) {
        return NextResponse.json({ error: '닉네임을 입력하세요.' }, { status: 400 });
    }

    const existingUser = await axios.post(`${process.env.BACKEND_SERVER}/api/user/nickname`, {
        nickname: nickname
    })

    if (existingUser.data !== 0) {
        return NextResponse.json({ error: '이미 사용 중인 닉네임입니다.' }, { status: 409 });
    }

    return NextResponse.json({ available: true });
}
