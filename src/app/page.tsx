import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { list } from '@/lib/db/schema';
import { ListTitle } from './Title';
import { ListTask } from './ListTask';
import { InitializeStore } from './initialize-store';

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
      <div className="space-y-1">
        {data?.tasks.map((task) => (
          <ListTask key={task.publicId} task={task} />
        ))}
      </div>
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
