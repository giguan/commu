"use client";

import axios from "axios";
import { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
  description: string;
  order: number;
}

interface PostCategoryProps {
  excludeAll?: boolean; // 전체 카테고리를 제외할지 결정하는 prop
  onCategorySelect?: (categoryId: number) => void; // 선택한 카테고리의 id를 전달
  selectedCategory?: number | null; // 선택된 카테고리, 있을 수도 없을 수도 있음
}

const PostCategory = ({
  excludeAll = false,
  onCategorySelect,
  selectedCategory,
}: PostCategoryProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    selectedCategory ?? null // selectedCategory가 있으면 초기값으로 설정
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>(
          `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/post/tabs`
        );
        let fetchedCategories = response.data;

        // excludeAll이 true인 경우 첫 번째 카테고리(전체)를 제외
        if (excludeAll) {
          fetchedCategories = fetchedCategories.slice(1);
        }

        setCategories(fetchedCategories);

        // selectedCategory가 없으면 첫 번째 카테고리를 기본 선택
        if (!selectedCategory && fetchedCategories.length > 0) {
          setSelectedCategoryId(fetchedCategories[0].id);
          if (onCategorySelect) {
            onCategorySelect(fetchedCategories[0].id);
          }
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [excludeAll, selectedCategory, onCategorySelect]);

  const handleCategorySelect = (id: number) => {
    setSelectedCategoryId(id);
    if (onCategorySelect) {
      onCategorySelect(id);
    }
  };

  if (categories.length === 0) {
    return <div>Loading categories...</div>;
  }

  return (
    <div className="flex space-x-4 mb-4">
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          className={`py-2 px-4 rounded-md ${
            selectedCategoryId === category.id
              ? "bg-gray-400 text-white"
              : "bg-gray-200 text-black"
          }`}
          onClick={() => handleCategorySelect(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default PostCategory;
