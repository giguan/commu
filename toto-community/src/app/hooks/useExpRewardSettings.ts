// src/app/hooks/useExpRewardSettings.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

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
const fetchExpRewardSettings = async () => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/exp-settings`);
  return data;
};

// 경험치 설정을 캐시하여 여러 컴포넌트에서 재사용할 수 있는 훅
export const useExpRewardSettings = () => {
    return useQuery<ExpRewardSettings, Error>({
      queryKey: ['expRewardSettings'], // 쿼리 키 명시
      queryFn: fetchExpRewardSettings, // 데이터 가져오는 함수 명시
      staleTime: Infinity, // 데이터를 한 번만 가져오고 캐시로 계속 사용
    });
  };
