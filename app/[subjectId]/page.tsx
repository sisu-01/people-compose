import prisma from "@/lib/prisma";
import Link from "next/link";

interface RangeListPageProps {
  params: Promise<{ subjectId: string }>;
}

export default async function RangeListPage({ params }: RangeListPageProps) {
  const { subjectId } = await params;
  const id = Number(subjectId)
  const ranges = await prisma.range.findMany({
    where: {
      subjectId: id,
    }
  });
  return (
    <div>
      <Link href="/">목록으로</Link>
      {subjectId}의 range 목록
      {ranges.map((range) => (
        <li key={range.id}>
          <Link href={`/${subjectId}/${range.id}`}>
            {range.desc? (
              <>
                {range.desc}
              </>
            ): (
              <>
                {range.start_num}~{range.end_num}
              </>
            )}
            <div>
              {range.date?.toLocaleDateString('ko-KR') ?? "날짜 없음"}
            </div>
          </Link>
        </li>
      ))}
    </div>
  );
}