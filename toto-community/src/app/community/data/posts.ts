// src/app/community/data/posts.ts

export interface Post {
    id: number;
    category: string;
    title: string;
    author: string;
    views: number;
    likes: number;
    date: string;
  }
  
  export const posts: Post[] = [
    { id: 1, category: "일반", title: "애플 키보드 트랙패드 기타 구입", author: "달타령", views: 924, likes: 0, date: "2024.08.30" },
    { id: 2, category: "일반", title: "애플티비가 은근히 볼게 많습니다", author: "태양석", views: 446, likes: 0, date: "2024.08.30" },
    { id: 3, category: "일반", title: "아이폰 14 프로 맥스 팀 퍼플", author: "달타령", views: 379, likes: 1, date: "2024.08.30" },
    { id: 4, category: "일반", title: "블룸버그 밤 맥 프로, 아이맥 프로, 맥 미니 등 최신 루머", author: "태양석", views: 729, likes: 2, date: "2024.08.30" },
    { id: 5, category: "일반", title: "스튜디오 듀오와 데스크셋업", author: "빠르밍", views: 123, likes: 0, date: "2024.08.30" },
    { id: 6, category: "뉴스", title: "아이패드프로 12.9 5세대+애플펜슬 질렀는데 매우만족합니다", author: "달타령", views: 132, likes: 0, date: "2024.08.30" },
    { id: 7, category: "일반", title: "아이맥 27인치 출시하나... 애플 공홈에 24인치 표기 추가", author: "태양석", views: 477, likes: 2, date: "2024.08.30" },
    { id: 8, category: "일반", title: "유럽, 이번엔 탈착형 배터리 압박", author: "달타령", views: 311, likes: 0, date: "2024.08.30" },
  ];
  