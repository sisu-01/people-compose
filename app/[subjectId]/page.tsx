interface RangeListPageProps {
  params: Promise<{ subjectId: number }>;
}

export default async function RangeListPage({ params }: RangeListPageProps) {
  const { subjectId } = await params;
  return (
    <div>
      {subjectId}의 range 목록
    </div>
  );
}