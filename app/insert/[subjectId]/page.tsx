import { createPost } from "@/app/actions/post";
import prisma from "@/lib/prisma";

interface insertPostPageProps {
  params: Promise<{ subjectId: string }>;
}

export default async function insertPostPage({ params }: insertPostPageProps) {
  const { subjectId } = await params;
  const id = Number(subjectId)
  const ranges = await prisma.range.findMany({
    where: {
      subjectId: id
    }
  })
  const users = await prisma.user.findMany();

  const createPostSubjectId = createPost.bind(null, id);

  return (
    <div>
      insertPostPage
      {subjectId}
      <form action={createPostSubjectId} >
        <select name="rangeId">
          {ranges.map((range) => (
            <option key={range.id} value={range.id}>
              {range.desc? (
                <>
                  {range.desc}
                </>
              ): (
                <>
                  {range.start_num}~{range.end_num}
                </>
              )}
            </option>
          ))}
        </select>
        <select name="userId">
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <textarea
          name="contents" // FormData.get('content')로 받을 이름
          rows={5}
        />
        <button type="submit">
          등록
        </button>
      </form>
    </div>
  );
}