import { createPost } from "@/app/actions/post";
import prisma from "@/lib/prisma";

interface InsertPostPageProps {
  params: Promise<{ subjectId: string }>;
}

export default async function InsertPostPage({ params }: InsertPostPageProps) {
  const { subjectId } = await params;
  const id = Number(subjectId);
  const ranges = await prisma.range.findMany({
    where: {
      subjectId: id
    }
  });
  const users = await prisma.user.findMany({
    where: {
      activate: true
    }
  });

  const createPostSubjectId = createPost.bind(null, id);

  return (
    <div className="max-w-xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">포스트 등록</h1>
      <p className="text-sm text-gray-500 mb-8">주제 ID: {subjectId}</p>

      <form action={createPostSubjectId} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">범위 (Range)</label>
          <select 
            name="rangeId" 
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          >
            {ranges.map((range) => (
              <option key={range.id} value={range.id}>
                {range.desc ? range.desc : `${range.start_num} ~ ${range.end_num}`}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">작성자</label>
          <select 
            name="userId"
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">내용</label>
          <textarea
            name="contents"
            rows={5}
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none resize-y focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            placeholder="내용을 입력하세요..."
          />
        </div>

        <button 
          type="submit"
          className="w-full py-3.5 bg-blue-600 text-white font-bold rounded-lg shadow-sm hover:bg-blue-700 hover:shadow-md transition-all outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          등록하기
        </button>
      </form>
    </div>
  );
}