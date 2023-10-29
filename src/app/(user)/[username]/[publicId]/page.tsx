import { getInitialList } from '@/lib/api/list/get-initial-list';
import { List } from '@/components/list/List';
import { InitializeClient } from './InitializeClient';
import { ListNavBar } from '@/components/list/ListNavBar';
import { NewTask } from '@/components/new-task/NewTask';

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
    <main className="justify-between pt-6 container mx-auto pb-20">
      <ListNavBar initialCounts={data.initialCounts} />
      <div className="mt-4 mb-1">
        <List initialTasks={data.initialTasks} />
      </div>

      <div className="fixed bottom-6 container mx-auto w-full">
        <NewTask />
      </div>

      <InitializeClient
        initialList={data.initialList}
        initialTasks={data.initialTasks}
        initialTags={data.initialTags}
        initialCounts={data.initialCounts}
      />
    </main>
  );
}
