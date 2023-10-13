import { getInitialListData } from '@/lib/api/getInitialListData';

export async function GET(request: Request) {
  const data = await getInitialListData('qm9aqdsbpo6j');
  return new Response(JSON.stringify(data));
}
