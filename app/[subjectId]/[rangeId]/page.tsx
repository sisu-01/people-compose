import prisma from "@/lib/prisma";
import Link from "next/link";
import { Prisma } from "@/generated/prisma/client";

interface PostPageProps {
  params: Promise<{ subjectId: string, rangeId: string }>;
}

type PostWithUser = Prisma.PostGetPayload<{
  include: { user: true }
}>;

// 아코디언 재사용 컴포넌트
const PostAccordion = ({ title, data }: { title: string, data: PostWithUser[] }) => (
  <section className="mb-8">
    <h2 className="text-lg font-bold text-gray-800 mb-4 px-1">{title}</h2>
    <div className="space-y-3">
      {data.map((post) => (
        <details 
          key={post.id} 
          className="group bg-white border border-gray-200 rounded-lg shadow-sm [&_summary::-webkit-details-marker]:hidden"
        >
          <summary className="flex cursor-pointer items-center justify-between p-4 font-semibold text-gray-800 hover:bg-gray-50 transition-colors">
            {post.user.name}
            <span className="text-gray-400 transition-transform duration-200 group-open:rotate-180">
              ▼
            </span>
          </summary>
          <div className="px-4 pb-4 pt-2 border-t border-gray-100 text-gray-600 whitespace-pre-wrap leading-relaxed">
            {post.contents}
          </div>
        </details>
      ))}
      {data.length === 0 && (
        <div className="p-4 text-sm text-gray-400 bg-gray-50 rounded-lg border border-dashed border-gray-200">
          등록된 포스트가 없습니다.
        </div>
      )}
    </div>
  </section>
);

export default async function PostPage({ params }: PostPageProps) {
  const { subjectId, rangeId } = await params;
  const id = Number(rangeId);
  const posts = await prisma.post.findMany({
    where: {
      rangeId: id
    },
    include: {
      user: true, 
    },
  });

  const childPosts = posts.filter((p) => p.user.parents === false);
  const parentsPosts = posts.filter((p) => p.user.parents === true);


  return (
    <div className="max-w-3xl mx-auto">
      <Link href={`/${subjectId}`} className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors mb-6">
        &larr; 목록으로
      </Link>
      
      <PostAccordion title="청년" data={childPosts} />
      <PostAccordion title="부모" data={parentsPosts} />
    </div>
  );
}