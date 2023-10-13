'use client';

import { useEffect } from 'react';
import { useEventListener } from 'usehooks-ts';
import type { List, Tag, TaskWithRelations } from '@/lib/db/schema';
import { useListStore } from '@/store/list/store';
import { handleRedoTransactions, handleUndoTransactions } from '@/store/transactions/store';

type Props = {
  initialList: List;
  initialTasks: TaskWithRelations[];
  initialTags: Tag[];
};

const dispatch = useListStore.getState().dispatch;

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
      handleRedoTransactions();
      return;
    }
    if (e.key === 'z' && e.metaKey) {
      e.preventDefault();
      handleUndoTransactions();
      return;
    }
  });

  return null;
};
