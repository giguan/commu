import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      nickname: string;
      id: string;
      name: string;
      email: string;
      points: number;
      postCount: number;
      commentCount: number;
      experience: number;
      isAdmin: boolean;
      isEmailVerified: boolean;
      updatedAt: Date;
    };
  }

  interface User {
    id: string;
    nickname: string;
    email: string;
    points: number;
    postCount: number;
    commentCount: number;
    experience: number;
    isAdmin: boolean;
    isEmailVerified: boolean;
    updatedAt: Date;
  }

  interface JWT {
    id: string;
    name: string;
    email: string;
    points: number;
    postCount: number;
    commentCount: number;
    experience: number;
    isAdmin: boolean;
    isEmailVerified: boolean;
    updatedAt: Date;
  }
}