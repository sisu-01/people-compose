"use client";

import { useState } from "react";
import { Prisma } from "@/generated/prisma/client";

type PostWithUser = Prisma.PostGetPayload<{
  include: { user: true };
}>;

interface PostAccordionProps {
  title: string;
  data: PostWithUser[];
}

export default function PostAccordion({
  title,
  data,
}: PostAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>

      <div className="space-y-2">
        {data.map((post, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={post.id}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggle(index)}
                className="
                  w-full
                  flex
                  items-center
                  justify-between
                  px-4
                  py-3
                  text-left
                  bg-white
                  hover:bg-gray-50
                  transition-colors
                "
              >
                <span className="font-medium">{post.user.name}</span>

                <span
                  className={`
                    transition-transform duration-200
                    ${isOpen ? "rotate-180" : ""}
                  `}
                >
                  ▼
                </span>
              </button>

              <div
                className={`
                  grid
                  transition-all
                  duration-300
                  ease-in-out
                  ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }
                `}
              >
                <div className="overflow-hidden">
                  <div className="px-4 py-4 bg-gray-50 whitespace-pre-wrap">
                    {post.contents}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {data.length === 0 && (
          <div className="text-gray-500 py-4">
            등록된 게시글이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}