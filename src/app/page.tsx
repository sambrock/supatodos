import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { list } from '@/lib/db/schema';
import { ListTitle } from './Title';
import { ListTask } from './ListTask';
import { InitializeStore } from './initialize-store';
import { TaskList } from './TaskList';
import { NewTask } from './NewTask';

export default async function Home() {
  const data = await db.query.list.findFirst({
    where: eq(list.publicId, 'qm9aqdsbpo6j'),
    with: {
      tasks: {
        columns: {
          id: false,
        },
      },
    },
    columns: {
      id: false,
    },
  });
  return (
    <main className="min-h-screen justify-between p-24">
      <ListTitle defaultTitle={data?.title ?? ''} />
      <TaskList />
      <NewTask />
      {data && (
        <InitializeStore
          initialList={{
            publicId: data.publicId,
            title: data.title,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          }}
          initialTasks={data.tasks || []}
        />
      )}
    </main>
  );
}
