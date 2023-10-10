import { getInitialListData } from '@/lib/api/getInitialListData';
import { InitializeListStore } from '@/components/InitializeListStore';
import { EditListTitle } from '@/components/list/EditListTitle';
import { EditTask } from '@/components/task/EditTask';

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
    <main className="min-h-screen justify-between px-24 py-12 space-y-8">
      <EditListTitle initialTitle={data.initialList.title || ''} />

      <ul className="space-y-3">
        {data.initialTasks.map((task, index) => (
          <EditTask key={index} index={index} initialTask={task} />
        ))}
      </ul>

      <InitializeListStore initialList={data.initialList} initialTasks={data.initialTasks} />
    </main>
  );
}
