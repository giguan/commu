"use client"

import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Toaster, toast } from "react-hot-toast";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useQueryClient } from "@tanstack/react-query";

const ReplyForm = ({ postId }: { postId: number }) => {
  const [reply, setReply] = useState("");
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  
  const queryClient = useQueryClient();

  const onSubmitReplyForm = async (e: any) => {
    e.preventDefault();


    if (!reply) {
      toast.error("내용을 입력하세요.");
      return;
    }

    let imageId: number | null = null;
    let imageUrl: string | null = null;

    // 이미지 업로드 로직
    if (selectedImage) {
      const formData = new FormData();
      formData.append("file", selectedImage);

      try {

        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/common/upload-image-reply`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        imageId = data.imageId;  // 서버에서 반환된 이미지 URL
        imageUrl = data.imageUrl;

      } catch (error) {
        console.error("이미지 업로드 실패:", error);
        toast.error("이미지 업로드 중 오류가 발생했습니다.");
        return;
      }
    }

    // 댓글 작성 요청
    axios
      .post(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/comment`, {
        postId,
        comment: reply,
        imageId, // 이미지 URL 추가
      })
      .then(() => {
        toast.success("댓글이 성공적으로 작성되었습니다.");

        // 사용자가 댓글을 성공적으로 작성했을 때 temp 디렉토리에서 실제 uploads 디렉토리로 이미지 이동 요청
        if (imageId) {
            axios.post(`${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/common/move-image`, { imageUrl, imageId });
          }

        setReply("");
        setSelectedImage(null);
        setThumbnail(null);
        queryClient.invalidateQueries({ queryKey: ["comment", postId] });
        queryClient.invalidateQueries({ queryKey: ["comments"] });

      })
      .catch((error) => {
        console.error("댓글 작성 실패:", error);
        toast.error("댓글 작성 중 오류가 발생했습니다.");
      });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);

      // 썸네일을 생성하는 로직 (이미지 미리보기)
      const reader = new FileReader();
      reader.onload = (event) => {
        setThumbnail(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setThumbnail(null);
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-inner mt-4">
      <Toaster position="top-center" />
      <form onSubmit={onSubmitReplyForm}>
        <textarea
          className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-main text-black"
          rows={3}
          placeholder="댓글을 입력하세요."
          value={reply}
          onChange={(e) => setReply(e.target.value)}
        ></textarea>

        <div className="flex justify-between items-center">
          {/* 이미지 추가 버튼 */}
          <label
            htmlFor="imageUpload"
            className="bg-gray-200 p-3 rounded-lg w-12 h-12 cursor-pointer flex items-center justify-center hover:bg-gray-400"
          >
            <span className="text-gray-500 text-2xl">+</span>
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

          {/* 썸네일 미리보기 */}
          {thumbnail && (
            <div className="relative">
              <Image
                src={thumbnail}
                alt="썸네일 미리보기"
                width={80}
                height={80}
                className="object-cover rounded-md"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-white rounded-full"
              >
                <AiOutlineCloseCircle size={24} className="text-red-500" />
              </button>
            </div>
          )}

          {/* 작성 버튼 */}
          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">
            작성
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReplyForm;
