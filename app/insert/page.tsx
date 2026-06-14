import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function InsertListPage() {
  const subjects = await prisma.subject.findMany({
    where: {
      insert: true
    },
    orderBy: [
      { type: 'desc' },
      { id: 'desc' },
    ]
  });

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        등록할 주제 선택
      </h1>
      <div className="flex flex-col gap-3">
        {subjects.map((subject) => (
          <Link 
            key={subject.id}
            href={`/insert/${subject.id}`}
            className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm text-center font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors"
          >
            {subject.title}
          </Link>
        ))}
      </div>
    </div>
  );
}