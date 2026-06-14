import PostAccordion from "@/components/postItem";
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