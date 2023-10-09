import { getInitialListData } from '@/lib/api/getInitialListData';

type Props = {
  params: {
    username: string;
    publicId: string;
  };
};

export default async function UserListPage({ params }: Props) {
  const { username, publicId } = params;

  const response = await getInitialListData(publicId);

  if (!response.success) return <div>error</div>;
  const { data } = response;

  return (
    <main className="min-h-screen justify-between p-24">
      page: {username} {publicId} {data.title}
    </main>
  );
}
