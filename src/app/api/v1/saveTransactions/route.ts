import { getInitialListData } from '@/lib/api/getInitialListData';

export async function POST(request: Request) {
  const data = await getInitialListData('qm9aqdsbpo6j');
  return new Response(JSON.stringify({}));
}
