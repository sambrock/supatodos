import { getInitialList } from '@/lib/api/list/get-initial-list';
import { type POST_UpdateList, updateList } from '@/lib/api/list/update-list';

export async function GET(request: Request) {
  const data = await getInitialList('qm9aqdsbpo6j');

  return new Response(JSON.stringify(data));
}
