"use client"

import { useExpRewardSettings } from "@/app/hooks/useExpRewardSettings";
import React from "react";

// 경험치 계산 함수
function calculateExperienceForLevel(level: number, baseExp: number, multiplier: number): number {
    // 레벨 1에서 2로 가는 데 필요한 경험치는 baseExp 그대로 사용 (100)
    if (level === 1) {
        return baseExp;
    }
    // 레벨 2 이상에서는 증가 비율을 적용하여 계산
    return baseExp * Math.pow(multiplier, level - 1);
}

const DetailExp = ({userExp, userLevel}: {userExp : number, userLevel: number}) => {

    const { data: expSettings, isLoading, error } = useExpRewardSettings();

    
    // 초기값 설정 (expSettings가 없을 경우 대비)
    let progressPercent = 0;
    let currentExp = userExp;
    let nextLevelExp = 0;

    // 경험치 설정이 로딩 중이 아니고, 에러가 없으며 expSettings가 있을 때만 계산
    if (expSettings && !isLoading && !error) {
        // 현재 레벨 및 경험치
        const currentLevel = userLevel;

        // 레벨 1일 때는 다음 레벨로 가기 위한 경험치는 100으로 설정
        if (currentLevel === 1) {
            nextLevelExp = expSettings.baseExpForLevelUp; // 100
        } else {
            // 그 외의 레벨에서는 증가 비율을 적용
            nextLevelExp = calculateExperienceForLevel(
                currentLevel + 1,
                expSettings.baseExpForLevelUp,
                expSettings.levelMultiplier
            );
        }

        // 현재 레벨이 1인 경우 경험치 계산
        const currentLevelExp = currentLevel === 1 
            ? 0  // 레벨 1일 때는 시작 경험치는 0
            : calculateExperienceForLevel(
                currentLevel,
                expSettings.baseExpForLevelUp,
                expSettings.levelMultiplier
            );

        // 진행 퍼센트 계산 (Infinity 방지)
        if (nextLevelExp - currentLevelExp > 0) {
            progressPercent = ((currentExp - currentLevelExp) / (nextLevelExp - currentLevelExp)) * 100;
        } else {
            progressPercent = 0; // 분모가 0이 될 경우
        }
    }

    return (
        <div className="bg-gray-100 p-2 rounded-lg shadow-inner w-full">
            <div className="relative h-3 bg-gray-300 rounded-full">
                <div className="absolute top-0 left-0 h-full bg-red-500 rounded-full flex items-center justify-center" style={{ width: `${progressPercent}%` }}></div>
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-semibold text-xs text-center w-full">
                    {currentExp} / {nextLevelExp} ({progressPercent.toFixed(2)}%)
                </span>
            </div>
        </div>
    )
}

export default React.memo(DetailExp);