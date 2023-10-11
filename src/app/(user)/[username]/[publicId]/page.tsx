import { getInitialListData } from '@/lib/api/getInitialListData';
import { InitializeListStore } from '@/components/InitializeListStore';
import { ListHeader } from '@/components/list/ListHeader';
import { Task } from '@/components/task/Task';
import { NewTask } from '@/components/new-task/NewTask';

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
    <main className="justify-between py-8 container mx-auto">
      <ListHeader
        username={username}
        title={data.initialList.title || ''}
        updatedAt={data.initialList.updatedAt || new Date()}
      />
      <ul className="my-4 space-y-2">
        {data.initialTasks.map((task, index) => (
          <Task key={index} index={index} initialTask={task} />
        ))}
      </ul>

      <NewTask className="bottom-6 z-50 fixed max-w-lg" />

      <InitializeListStore initialList={data.initialList} initialTasks={data.initialTasks} />
    </main>
  );
}
