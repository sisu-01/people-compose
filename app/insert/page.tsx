import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function insertListPage() {
  const subjects = await prisma.subject.findMany({
    where: {
      insert: true
    }
  })

  return (
    <div>
      insertListPage
      {subjects.map((subject) => (
        <div key={subject.id}>
          <Link href={`/insert/${subject.id}`}>
            {subject.title}
          </Link>
        </div>
      ))}
    </div>
  );
}