interface PostPageProps {
  params: Promise<{ rangeId: number }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { rangeId } = await params;
  return (
    <div>
      {rangeId}
    </div>
  );
}