import prisma from "@/lib/prisma";
import Link from "next/link";

interface RangeListPageProps {
  params: Promise<{ subjectId: string }>;
}

export default async function RangeListPage({ params }: RangeListPageProps) {
  const { subjectId } = await params;
  const id = Number(subjectId);
  const ranges = await prisma.range.findMany({
    where: {
      subjectId: id,
    }
  });

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex flex-col gap-2 mb-6">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">
          &larr; 목록으로
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">
          <span className="text-blue-600">{subjectId}</span>의 Range 목록
        </h1>
      </div>

      <ul className="flex flex-col gap-3">
        {ranges.map((range) => (
          <li key={range.id}>
            <Link 
              href={`/${subjectId}/${range.id}`}
              className="flex justify-between items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-blue-400 hover:shadow transition-all"
            >
              <span className="font-medium text-gray-800">
                {range.desc ? range.desc : `${range.start_num} ~ ${range.end_num}`}
              </span>
              <span className="text-sm text-gray-400">
                {range.date?.toLocaleDateString('ko-KR') ?? "날짜 없음"}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}