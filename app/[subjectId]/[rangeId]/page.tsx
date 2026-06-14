import prisma from "@/lib/prisma";
import Link from "next/link";

interface PostPageProps {
  params: Promise<{ subjectId: string, rangeId: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { subjectId, rangeId } = await params;
  const id = Number(rangeId);
  const posts = await prisma.post.findMany({
    where: {
      rangeId: id
    },
    include: {
      user: true, // 이 부분이 중요합니다!
    },
  });
  const childPosts = posts.filter((p) => p.user.parents === false);
  const parentsPosts = posts.filter((p) => p.user.parents === true);

  return (
    <div>
      <Link href={`/${subjectId}`}>목록으로</Link>
      <div>자녀</div>
      {childPosts.map((post) => (
        <div key={post.id}>
          <div>
            {post.user.name}
          </div>
          <div>
            {post.contents}
          </div>
        </div>
      ))}
      <div>부모</div>
      {parentsPosts.map((post) => (
        <div key={post.id}>
          <div>
            {post.user.name}
          </div>
          <div>
            {post.contents}
          </div>
        </div>
      ))}
    </div>
  );
}