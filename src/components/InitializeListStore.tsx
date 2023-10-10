'use client';

import { useEffect } from 'react';
import { List, Task } from '@/lib/db/schema';
import { useListStore } from '@/store/list/store';
import { useEventListener } from 'usehooks-ts';
import { handleRedoTransactions, handleUndoTransactions } from '@/store/transactions/store';

type Props = {
  initialList: Omit<List, 'id'>;
  initialTasks: Omit<Task, 'id'>[];
};

const dispatch = useListStore.getState().dispatch;

export const InitializeListStore = ({ initialList, initialTasks }: Props) => {
  useEffect(() => {
    dispatch({
      type: 'INITIALIZE',
      payload: {
        list: initialList,
        tasks: initialTasks,
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
