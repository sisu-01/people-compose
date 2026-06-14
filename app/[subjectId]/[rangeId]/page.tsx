import type { Metadata } from "next";
import PostAccordion from "@/components/postItem";
import prisma from "@/lib/prisma";
import Link from "next/link";

interface PostPageProps {
  params: Promise<{ subjectId: string, rangeId: string }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { rangeId } = await params;
  const id = Number(rangeId);

  const range = await prisma.range.findUnique({
    where: { id: id },
    include: { subject: true }, // subject 정보를 가져와야 타이틀에 사용 가능
  });

  const title = range?.desc ? range.desc : `${range?.start_num} ~ ${range?.end_num}`;
  const subjectTitle = range?.subject?.title || "기록 보관소";

  return {
    title: title, // 브라우저 탭에 표시될 제목
    description: subjectTitle, // 페이지 설명
    openGraph: {
      title: title,
      description: `${subjectTitle} - ${title}`,
    },
  };
}
export default async function PostPage({ params }: PostPageProps) {
  const { subjectId, rangeId } = await params;
  const id = Number(rangeId);

  // range를 가져오면서 그 안에 속한 모든 post와 
  // 각 post가 가진 user 정보까지 한 번에 로드합니다.
  const range = await prisma.range.findUnique({
    where: { id: id },
    include: {
      subject: true,
      posts: {
        include: {
          user: true,
        },
      },
    },
  });
  
  if (!range) {
    return <div>해당 범위를 찾을 수 없습니다.</div>
  }

  // range 자체가 없거나(데이터 없음), posts가 비어있어도 안전하게 처리
  const posts = range?.posts ?? [];
  const adminPosts = posts.filter((p) => p.user.isParent === null);
  const childPosts = posts.filter((p) => p.user.isParent === 0);
  const parentsPosts = posts.filter((p) => p.user.isParent === 1);

  console.log(range.subject?.title);

  // subjectId를 기준으로 이전/다음 레코드를 조회합니다.
  const [prevRange, nextRange] = await Promise.all([
    prisma.range.findFirst({
      where: { 
        subjectId: range.subjectId, 
        id: { lt: id } 
      },
      orderBy: { id: 'desc' }
    }),
    prisma.range.findFirst({
      where: { 
        subjectId: range.subjectId, 
        id: { gt: id } 
      },
      orderBy: { id: 'asc' }
    }),
  ]);

  return (
    <div className="max-w-3xl mx-auto">
      <Link href={`/${subjectId}`} className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors mb-6">
        &larr; 목록으로
      </Link>
      <div className="flex">
        {prevRange? (
          <Link href={`/${subjectId}/${prevRange.id}`}>
            이전
          </Link>
        ):(
          '비활성화'
        )}
        <h1 className="text-2xl font-bold text-gray-900">
          <span className="text-blue-600">{range?.desc ? range.desc : `${range?.start_num} ~ ${range?.end_num}`}</span>
        </h1>
        {nextRange? (
          <Link href={`/${subjectId}/${nextRange.id}`}>
            다음
          </Link>
        ):(
          '비활성화'
        )}
      </div>
      <PostAccordion title="자료" data={adminPosts} />
      <PostAccordion title="청년" data={childPosts} />
      <PostAccordion title="부모" data={parentsPosts} />
    </div>
  );
}