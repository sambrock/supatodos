'use client';

import { useEffect } from 'react';
import { useEventListener } from 'usehooks-ts';
import { client } from '@/lib/api/client';
import type { List, Tag, TaskWithRelations } from '@/lib/db/schema';
import { listStoreHandlers, useListStore } from '@/store/store';

type Props = {
  initialList: List;
  initialTasks: TaskWithRelations[];
  initialTags: Tag[];
  initialCounts: {
    tasks: number;
    complete: number;
  };
};

const dispatch = useListStore.getState().dispatch;

useListStore.subscribe((state) => {
  if (state.operations.length === 0) return;

  client.post('/api/v1/updateList', [{ id: state.data.list!.publicId, operations: state.operations }]);
  listStoreHandlers.clearOperations();
});

export const InitializeClient = ({ initialList, initialTasks, initialTags, initialCounts }: Props) => {
  useEffect(() => {
    dispatch({
      type: 'INITIALIZE',
      payload: {
        list: initialList,
        tasks: initialTasks,
        tags: initialTags,
        counts: initialCounts,
      },
    });
  }, []);

  useEventListener('keydown', (e) => {
    if (e.key === 'z' && e.metaKey && e.shiftKey) {
      e.preventDefault();
      listStoreHandlers.redo();
      return;
    }
    if (e.key === 'z' && e.metaKey) {
      e.preventDefault();
      listStoreHandlers.undo();
      return;
    }
  });

  return null;
};
