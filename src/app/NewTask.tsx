'use client';

import { atom, useAtom } from 'jotai';
import { useListStore } from '@/store/list/store';
import { useTransactionsStore } from '@/store/transactions/store';

const dispatch = useListStore.getState().dispatch;
const pushTransactions = useTransactionsStore.getState().push;

const newTaskAtom = atom<{ title: string }>({ title: '' });

export const NewTask = () => {
  const [newTask, setNewTask] = useAtom(newTaskAtom);
  return (
    <div>
      <input
        type="text"
        className="text-black"
        onChange={(e) => {
          setNewTask({ title: e.target.value });
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            console.log('create new task', newTask);
            dispatch({ type: 'NEW_TASK', payload: { title: newTask.title } });
          }
        }}
      />
    </div>
  );
};
