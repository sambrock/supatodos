import { getInitialList } from '@/lib/api/list/get-initial-list';
import { List } from '@/components/list/List';
import { InitializeClient } from './InitializeClient';
import { ListNavBar } from '@/components/list/ListNavBar';

type Props = {
  params: {
    username: string;
    publicId: string;
  };
};

export default async function UserListPage({ params }: Props) {
  const { username, publicId } = params;

  const response = await getInitialList(publicId);

  if (response.error) return <div>{response.error.name}</div>;
  const { data } = response;

  return (
    <main className="justify-between pb-6 pt-6 container mx-auto">
      <ListNavBar initialCounts={data.initialCounts} />
      <List initialTasks={data.initialTasks} />

      <InitializeClient
        initialList={data.initialList}
        initialTasks={data.initialTasks}
        initialTags={data.initialTags}
        initialCounts={data.initialCounts}
      />
    </main>
  );
}
