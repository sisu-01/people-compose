import PostAccordion from "@/components/postItem";
import prisma from "@/lib/prisma";
import Link from "next/link";

interface PostPageProps {
  params: Promise<{ subjectId: string, rangeId: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { subjectId, rangeId } = await params;
  const id = Number(rangeId);

  // range를 가져오면서 그 안에 속한 모든 post와 
  // 각 post가 가진 user 정보까지 한 번에 로드합니다.
  const range = await prisma.range.findUnique({
    where: { id: id },
    include: {
      posts: {
        include: {
          user: true,
        },
      },
    },
  });

  // range 자체가 없거나(데이터 없음), posts가 비어있어도 안전하게 처리
  const posts = range?.posts ?? [];
  const adminPosts = posts.filter((p) => p.user.isParent === null);
  const childPosts = posts.filter((p) => p.user.isParent === 0);
  const parentsPosts = posts.filter((p) => p.user.isParent === 1);

  if (!range) {
    return <div>해당 범위를 찾을 수 없습니다.</div>
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link href={`/${subjectId}`} className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors mb-6">
        &larr; 목록으로
      </Link>
      <h1 className="text-2xl font-bold text-gray-900">
        <span className="text-blue-600">{range?.desc ? range.desc : `${range?.start_num} ~ ${range?.end_num}`}</span>
      </h1>
      <PostAccordion title="자료" data={adminPosts} />
      <PostAccordion title="청년" data={childPosts} />
      <PostAccordion title="부모" data={parentsPosts} />
    </div>
  );
}