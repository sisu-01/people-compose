import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const subjects = await prisma.subject.findMany();

  // 각 타입별로 데이터를 미리 필터링합니다.
  const bookSubjects = subjects.filter((s) => s.type === 'B');
  const dramaSubjects = subjects.filter((s) => s.type === 'D');
  const rangeSubjects = subjects.filter((s) => s.type === 'R');

  return (
    <div>
      <div>
        책
        {bookSubjects.map((subject) => (
          <li key={subject.id}>
            <Link href={`/${subject.id}`}>
              {subject.insert? (
                <div>
                  new
                </div>
              ):('')}
              {subject.title}
            </Link>
          </li>
        ))}
      </div>
      <div>
        드라마
        {dramaSubjects.map((subject) => (
          <li key={subject.id}>
            <Link href={`/${subject.id}`}>{subject.title}</Link>
          </li>
        ))}
      </div>
      <div>
        인지
        {rangeSubjects.map((subject) => (
          <li key={subject.id}>
            <Link href={`/${subject.id}`}>{subject.title}</Link>
          </li>
        ))}
      </div>
    </div>
  );
}