'use client';

import { useEffect } from 'react';
import { useEventListener } from 'usehooks-ts';
import type { List, Tag, TaskWithRelations } from '@/lib/db/schema';
import { listStoreHandlers, useListStore } from '@/store/list-edit/store';

type Props = {
  initialList: List;
  initialTasks: TaskWithRelations[];
  initialTags: Tag[];
};

const dispatch = useListStore.getState().dispatch;

useListStore.subscribe((state, prevState) => {
  if (state.patches.saved.length === 0) return;
  if (state.patches.saved.length === prevState.patches.saved.length) return;
  console.log('should save', state.patches.saved[state.patches.saved.length - 1]);
});

export const InitializeClient = ({ initialList, initialTasks, initialTags }: Props) => {
  useEffect(() => {
    dispatch({
      type: 'INITIALIZE',
      payload: {
        list: initialList,
        tasks: initialTasks,
        tags: initialTags,
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
