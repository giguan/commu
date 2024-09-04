// import { PrismaClient } from "@prisma/client";
import axios, { AxiosResponse } from "axios";
import { compare } from "bcrypt";
import { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// const prisma = new PrismaClient();

type UserResponse = {
  id: string;
  nickname: string;
  email: string;
  password: string;
  points: number;
  postCount: number;
  commentCount: number;
  experience: number;
  isAdmin: boolean;
  isEmailVerified: boolean;
  updatedAt: Date;
};

export const authOptions: any = {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          username: { label: "Username", type: "text", placeholder: "jsmith"  },
          password: { label: "Password", type: "password" },
        },
        authorize: async (credentials: Record<string, string> | undefined): Promise<User | null> => {
                    
          if (!credentials) {
            throw new Error("No credentials provided");
          }


          // Prisma 사용법 연습
          // const user = await prisma.user.findUnique({
          //   where: {
          //     id: credentials.username,
          //   },
          // });

          let user: UserResponse | null = null;

          try {
            const response: AxiosResponse<UserResponse> = await axios.post(`${process.env.BACKEND_SERVER}/api/user/find`, {
              id: credentials.username,
            });
            user = response.data;

            console.log(user)

          } catch (error) {
            throw new Error("사용자를 찾을 수 없습니다.");
          }
  
          if (!user) {
            throw new Error("사용자를 찾을 수 없습니다.");
          }
  
          // 비밀번호를 비교합니다.
          const isValid = await compare(credentials.password, user.password);
          if (!isValid) {
            throw new Error("비밀번호가 일치하지 않습니다.");
          }
  
          // 사용자가 인증되면 사용자 객체를 반환합니다.
          return { 
            id: user.id,
            name: user.nickname,
            email: user.email,
            points: user.points,
            postCount: user.postCount,
            commentCount: user.commentCount,
            experience: user.experience,
            isAdmin: user.isAdmin,
            isEmailVerified: user.isEmailVerified,
            updatedAt: user.updatedAt,
          };
        },
      }),
    ],
    pages: {
      // signIn: "/",
      signIn: "/",
      // error: "/auth/error",  // 이 경로에 페이지가 있는지 확인하세요.
      error: "/",
    },
    callbacks: {
      async session({ session, token }: { session: any, token: any}) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.points = token.points;
        session.user.postCount = token.postCount;
        session.user.commentCount = token.commentCount;
        session.user.experience = token.experience;
        session.user.isAdmin = token.isAdmin;
        session.user.isEmailVerified = token.isEmailVerified;
        session.user.updatedAt = token.updatedAt;
  
        return session;
      },
      async jwt({ token, user }: { token: any, user: any }) {
        if (user) {
          token.id = user.id;
          token.name = user.name;
          token.email = user.email;
          token.points = user.points;
          token.postCount = user.postCount;
          token.commentCount = user.commentCount;
          token.experience = user.experience;
          token.isAdmin = user.isAdmin;
          token.isEmailVerified = user.isEmailVerified;
          token.updatedAt = user.updatedAt;
        }
        return token;
      },
    },
    debug: true,
  };