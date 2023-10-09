'use client';

import { useEffect } from 'react';
import { List, Task } from '@/lib/db/schema';
import { useListStore } from '@/store/list/store';

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

  return null;
};
