"use client"

import { ReactNode, useState } from "react"
import PostList from "./components/PostList";

type CommunityLayoutProps = {
    children: ReactNode; // 여기서 ReactNode를 사용해 children의 타입을 지정합니다.
  };

const CommunityLayout = ({children}: CommunityLayoutProps) => {

    return (
        <div className="lg:flex-grow space-y-6">
            {children}
            <PostList />
        </div>

    )
}

export default CommunityLayout;