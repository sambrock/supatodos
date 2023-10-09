import { InitializeListStore } from '@/components/InitializeListStore';
import { ListTitleEditable } from '@/components/list/ListTitleEditable';
import { getInitialListData } from '@/lib/api/getInitialListData';

type Props = {
  params: {
    username: string;
    publicId: string;
  };
};

export default async function UserListPage({ params }: Props) {
  const { publicId } = params;

  const response = await getInitialListData(publicId);

  if (!response.success) return <div>error</div>;
  const { data } = response;

  return (
    <main className="min-h-screen justify-between p-24">
      <ListTitleEditable initialTitle={data.initialList.title || ''} />
      <InitializeListStore initialList={data.initialList} initialTasks={data.initialTasks} />
    </main>
  );
}
