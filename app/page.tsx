import { Subject } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import Link from "next/link";

const Section = ({ title, data }: { title: string, data: Subject[] }) => (
  <div className="mb-10">
    <h2 className="text-xl font-bold text-gray-800 border-b-2 border-gray-900 pb-2 mb-5">
      {title}
    </h2>
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {data.map((subject) => (
        <li key={subject.id}>
          <Link 
            href={`/${subject.id}`}
            className="group flex flex-col justify-center min-h-20 p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-400 transition-all"
          >
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                {subject.title}
              </span>
              {subject.insert && (
                <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-red-100 text-red-600 rounded-full">
                  new
                </span>
              )}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default async function Home() {
  const subjects = await prisma.subject.findMany({
    orderBy: {
      id: 'desc',
    },
  });

  // 각 타입별로 데이터를 미리 필터링합니다.
  const bookSubjects = subjects.filter((s) => s.type === 'B');
  const dramaSubjects = subjects.filter((s) => s.type === 'D');
  const rangeSubjects = subjects.filter((s) => s.type === 'R');


  return (
    <div className="space-y-6">
      <Section title="인지" data={rangeSubjects} />
      <Section title="드라마" data={dramaSubjects} />
      <Section title="책" data={bookSubjects} />
    </div>
  );
}