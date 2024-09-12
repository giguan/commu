import { differenceInDays, differenceInHours } from "date-fns";
import Link from "next/link";
import React from "react";

const formatTimeAgo = (date: string | Date) => {
    const now = new Date();
    const postDate = new Date(date);
  
    // 현재 시간과 게시글 작성 시간의 차이를 시간 단위로 계산
    const hoursDifference = differenceInHours(now, postDate);
  
    // 24시간 이내일 경우, 시간 단위로 표시
    if (hoursDifference < 24) {
        if(hoursDifference < 1) {
            return `방금 전`
        }

      return `${hoursDifference}시간 전`;
    }
  
    // 24시간을 넘긴 경우, 일 단위로 표시
    const daysDifference = differenceInDays(now, postDate);
    return `${daysDifference}일 전`;
  };

const DetailList = ({userRecenPosttList}: {userRecenPosttList: any}) => {

    return (
        <div className="flex-1 space-y-1 text-sm">
            {userRecenPosttList.map((item: any) => {
                return (
                    <div key={item.id} className="flex justify-between items-center">
                        <p className="text-gray-700 truncate hover:text-blue-500 hover:font-bold"><Link href={`/community/${item.id}`}>{item.title}</Link></p>
                        <span className="text-gray-400 text-xs whitespace-nowrap ml-4">{formatTimeAgo(item.createdAt)}</span>
                    </div>
                )
            })}
        </div>
    )
}

export default React.memo(DetailList);