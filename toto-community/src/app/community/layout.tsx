import { ReactNode, useState } from "react"

type CommunityLayoutProps = {
    children: ReactNode; // 여기서 ReactNode를 사용해 children의 타입을 지정합니다.
  };


const CommunityLayout = ({children}: CommunityLayoutProps) => {

    return (
        <div className="lg:flex-grow space-y-6">
            {children}
        </div>

    )
}

export default CommunityLayout;