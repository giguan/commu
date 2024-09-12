import axios from "axios";
import { Metadata } from "next";
import { Post } from "../../../typings/db";
import PostList from "./components/PostList";
import { fetchPosts } from "../utils/queryHelpers";

// 서버에서 메타데이터를 생성하는 함수
export async function generateMetadata(): Promise<Metadata> {
  // 서버에서 게시글 데이터를 패칭하여 메타데이터 생성
  const { data: posts } = await axios.get<Post[]>(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/post`);

  // 메타데이터 생성 로직
  if (!posts || posts.length === 0) {
    return {
      title: '게시글을 찾을 수 없습니다',
      description: '존재하지 않는 게시글입니다.',
    };
  }

  return {
    title: "커뮤니티 목록",
    description: "커뮤니티 목록입니다.", // 설명에 게시글 요약 등을 추가 가능
    openGraph: {
      title: "커뮤니티 자유 게시판",
      description: "커뮤니티 자유 게시판 입니다.",
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: "커뮤니티 목록",
      description: "커뮤니티 자유 게시판입니다.",
    },
  };
}


export default async function Community() {

  const posts = await fetchPosts();
  
  return (
    <>
      <PostList posts={posts}/>
    </>
  );
}
