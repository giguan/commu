'use client'; // CSR로 변경

import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { format } from 'date-fns';
import DetailExp from '../components/DetailExp';
import DetailList from '../components/DetailList';
import DetailBtn from '../components/DetailBtn';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { fetchPosts } from '@/app/utils/queryHelpers';
import PostList from '../components/PostList';
import { Post } from '../../../../typings/db';
import Reply from '../components/Reply';



const fetchPostById = async (id: number) => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/post/detail/${id}`);
  return data;
};

const fetchPostRecentListById = async (id: string) => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/post/recentList/${id}`);
  return data;
};

const PostDetailPage = () => {

  const { id } = useParams();

  const postId = Number(id);

  const router = useRouter();

  const { data: post, isLoading: postLoading, error: postError } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchPostById(postId),
    enabled: !!postId,
  });

  const { data: userRecentPostList, isLoading: recentPostLoading, error: recentPostError } = useQuery({
    queryKey: ['userRecentPostList', post?.author?.id],
    queryFn: () => fetchPostRecentListById(post?.author?.id),
    enabled: !!post?.author?.id,  // author.id가 존재할 때만 실행
  });

  // 조회수 증가를 중복 실행하지 않도록 ref 사용
  const hasViewed = useRef(false);

  useEffect(() => {
    if (!hasViewed.current) {
      // 조회수 증가 API 요청
      axios.put(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/post/${postId}/view`)
        .then(() => {
          console.log('조회수 증가 성공');
          hasViewed.current = true; // 조회수 증가 완료 후 다시 실행되지 않도록 설정
        })
        .catch((error) => {
          console.error('조회수 증가 중 오류 발생:', error);
        });
    }
  }, [postId]);

  const { data: posts } = useQuery<Post[], Error>({
    queryKey: ['post'], 
    queryFn: fetchPosts}
  );

  if (postLoading || recentPostLoading) return <p>Loading...</p>;
  if (postError) return <p>Error loading post: {postError.message}</p>;
  if (recentPostError) return <p>Error loading recent posts: {recentPostError.message}</p>;

  return (
    <>
    <div className="lg:flex-grow space-y-6">
      <Toaster position="top-center" />

      <div className="flex justify-start items-center">
        <button
          onClick={() => router.back()}
          className="bg-white px-4 py-2 rounded-lg text-sm font-semibold focus:outline-none w-35 text-black"
        >
          {`< 뒤로가기`}
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        {/* 제목 및 기본 정보 */}
        <div className="flex mb-2 flex flex-col">
          <div className="text-gray-700 text-xs px-2 py-1 mr-2">{post.board.name}</div>
          <h1 className="text-xl font-bold text-black ml-2">{post.title}</h1>
        </div>

        <div className="flex items-center text-gray-500 text-sm mb-4 ml-2">
          <span className="mr-4"><strong>{post.author.nickname}</strong></span>
          <span className="mr-4">{format(new Date(post.createdAt), 'yyyy-MM-dd HH:mm')}</span>
          <span className="mr-4">좋아요 {post.likes}</span>
          <span className="mr-4">싫어요 {post.dislikes}</span>
          <span className="mr-4">조회수 {post.views}</span>
          <span>댓글 {post.commentCount ? post.commentCount : 0}</span>
        </div>

        <div className="my-4 border-t border-gray-200"></div>

        {/* 본문 내용 */}
        <div className="mb-6 min-h-[200px]">
          <div 
            className="text-gray-800 whitespace-pre-line break-words" 
            dangerouslySetInnerHTML={{ __html: post.content  }}
            style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
          </div>
        </div>

        <DetailBtn postId={postId} authorId={post.author.id} />

        <div className="flex justify-between items-start mb-6 space-x-4">
          <div className="flex-1 flex flex-col items-start space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex justify-center items-center">
                <span className="text-black text-lg">🧑‍💼</span>
              </div>
              <div>
                <p className="text-black font-semibold">{post.author.nickname}</p>
                <p className="text-sm text-gray-600">보유 포인트 : {post.author.points}P</p>
              </div>
            </div>
            <DetailExp userExp={post.author.experience} userLevel={post.author.level} />
          </div>

          <DetailList userRecenPosttList={userRecentPostList} />
        </div>

        <Reply postId={post.id}/>
      </div>


    </div>

    {posts && <PostList posts={posts}/>}
    </>
  );
};

export default PostDetailPage;
