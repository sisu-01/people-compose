// app/actions/post.ts
'use server'

// 1. 방금 보여주신 lib/prisma.ts를 불러옵니다.
import prisma from '@/lib/prisma'; 
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPost(subjectId: number, formData: FormData) {
  const rangeId = Number(formData.get('rangeId') as string);
  const userId = Number(formData.get('userId') as string);
  const contents = formData.get('contents') as string;

  if (!rangeId) {
    throw new Error('rangeId는 필수입니다.');
  }
  if (!userId) {
    throw new Error('userId는 필수입니다.');
  }
  if (!contents) {
    throw new Error('contents는 필수입니다.');
  }

  // 2. 불러온 prisma 객체로 바로 DB에 Insert 합니다!
  await prisma.post.create({
    data: {
      contents,
      rangeId,
      userId
    },
  });

  revalidatePath(`/${subjectId}/${rangeId}`);
  redirect(`/${subjectId}/${rangeId}`);
}