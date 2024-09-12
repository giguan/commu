// queryHelpers.ts
import axios from "axios";
import { QueryClient, useQuery } from "@tanstack/react-query";

// React Query 클라이언트 생성 함수
export const getQueryClient = () => new QueryClient();

// 데이터를 받아오는 함수
export const fetchPosts = async () => {
  const { data: postData } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/post`);

  return postData;
};

// 데이터를 받아오는 함수
export const fetchComments = async () => {
    const { data: commentData } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/comment`);

    return commentData;
};

// 경험치 관련 데이터 타입 정의
interface ExpRewardSettings {
  postPoints: number;
  commentPoints: number;
  postExp: number;
  commentExp: number;
  baseExpForLevelUp: number;
  levelMultiplier: number;
}

// 경험치 설정을 가져오는 함수
export const fetchExpRewardSettings = async () => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/exp-settings`);
  return data;
};

export const useExpRewardSettings = () => {
  return useQuery<ExpRewardSettings, Error>({
    queryKey: ['expRewardSettings'], // 쿼리 키 명시
    queryFn: fetchExpRewardSettings, // 데이터 가져오는 함수 명시
    staleTime: Infinity, // 데이터를 한 번만 가져오고 캐시로 계속 사용
  });
};
