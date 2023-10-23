import { type Patch } from 'immer';
import { eq } from 'drizzle-orm';
import { db } from '../../db';
import { list as _list, task } from '../../db/schema';
import { Api } from '../client.types';

export type POST_UpdateList = Api.PostRoute<{
  url: '/api/v1/updateList';
  body: {
    id: string;
    operations: Patch[];
  }[];
  data: {};
}>;

export const updateList = async (body: POST_UpdateList['body']) => {
  for await (const data of body) {
    const list = await db.query.list.findFirst({ where: eq(_list.publicId, data.id) });
    if (!list) return;

    for await (const operation of data.operations) {
      const { op, path, value } = operation;
      const [, model, id, field] = path as [string, string, string, string];

      switch (model) {
        case 'tasks': {
          switch (op) {
            case 'add': {
              await db.insert(task).values({
                publicId: id,
                listId: list.id,
                title: value.title,
                isComplete: value.isComplete,
                priorityLevel: value.priorityLevel,
              });
              break;
            }
            case 'replace': {
              await db
                .update(task)
                .set({ [field]: value })
                .where(eq(task.publicId, id));
              break;
            }
          }
        }
      }
    }
  }
};
