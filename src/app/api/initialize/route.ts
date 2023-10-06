import { db } from '@/lib/db';
import { list, task } from '@/lib/db/schema';
import { generatePublicId } from '@/lib/utils';

export async function POST(request: Request) {
  await db.insert(task).values({
    publicId: generatePublicId(),
    listId: 2,
    title: 'Task',
  });
  return new Response('Hello, Next.js!');
}
