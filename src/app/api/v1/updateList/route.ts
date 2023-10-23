import { type POST_UpdateList, updateList } from '@/lib/api/list/update-list';

export async function POST(request: Request) {
  const body = (await request.json()) as POST_UpdateList['body'];

  await updateList(body);

  return new Response(JSON.stringify({}));
}
