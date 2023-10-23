import { getInitialListData } from '@/lib/api/list/get-initial-list-data';
import { ListHeader } from '@/components/list/ListHeader';
import { NewTask } from '@/components/new-task/NewTask';
import { InitializeClient } from './InitializeClient';
import { List } from '@/components/list/List';

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
    <main className="justify-between pb-6 pt-6 container mx-auto">
      <ListHeader
        username={username}
        title={data.initialList.title || ''}
        updatedAt={data.initialList.updatedAt || new Date()}
      />

      <List initialTasks={data.initialTasks} />

      <NewTask className="bottom-4 z-50 fixed container" />

      <InitializeClient
        initialList={data.initialList}
        initialTasks={data.initialTasks}
        initialTags={data.initialTags}
      />
    </main>
  );
}
