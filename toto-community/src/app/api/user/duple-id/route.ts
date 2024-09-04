import axios from 'axios';
import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

export async function POST(req: Request) {
    const { id } = await req.json();

    if (!id) {
        return NextResponse.json({ error: 'ID를 입력하세요.' }, { status: 400 });
    }

    const existingUser = await axios.post(`${process.env.BACKEND_SERVER}/api/user/id`, {
        id: id
    })

    if (existingUser.data !== 0) {
        return NextResponse.json({ error: '이미 사용 중인 ID입니다.' }, { status: 409 });
    }

    return NextResponse.json({ available: true });
}
