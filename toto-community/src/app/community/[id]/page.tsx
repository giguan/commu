"use client";

import { useParams, useRouter } from 'next/navigation';
import { posts } from '../data/posts';
import PostDetail from '../components/PostDetail';

const PostPage = () => {
  const params = useParams();  // useParams 훅으로 동적 파라미터 가져오기
  const { id } = params;  // URL에서 id 파라미터 추출

  // ID에 해당하는 게시글 데이터를 찾아서 PostDetail 컴포넌트에 전달
  const post = posts.find(p => p.id === Number(id));

  console.log(post)

  if (!post) {
    return <p>게시글을 찾을 수 없습니다.</p>;
  }

  return (
    <>
      <PostDetail post={post} />
    </>
  );
};

export default PostPage;
