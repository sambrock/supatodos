import { type Draft, produce, produceWithPatches } from 'immer';

import type { ListStore } from './store.types';
import type { Action, ActionPayload } from './action.types';
import { useTransactionsStore } from '../transactions/store';

const pushTransactions = useTransactionsStore.getState().push;

const updateList = produceWithPatches((draft: Draft<ListStore>, payload: ActionPayload<'UPDATE_LIST'>) => {
  const list = draft.data.list;

  if (list) {
    Object.assign(list, payload);
  }
});

const newTask = produce((draft: Draft<ListStore>, payload: ActionPayload<'NEW_TASK'>) => {
  // clear any empty tasks
  for (const [index, task] of draft.data.tasks!.entries()) {
    if (task.title === '') {
      draft.data.tasks!.delete(index);
    }
  }
  draft.data.tasks!.set(draft.data.tasks!.size, { title: payload?.title });
});

const updateTask = produceWithPatches((draft: Draft<ListStore>, payload: ActionPayload<'UPDATE_TASK'>) => {
  const { index, ...updates } = payload;
  const task = draft.data.tasks!.get(index);
  // draft.data.tasks!.set(index, { ...task, ...updates });

  if (task) {
    Object.assign(task, updates);
  }
});

export const reducer = (state: ListStore, action: Action): ListStore => {
  console.log(action);
  switch (action.type) {
    case 'INITIALIZE': {
      const { list, tasks } = action.payload;
      return {
        ...state,
        data: {
          list,
          tasks: new Map(tasks.map((task, index) => [index, task])),
        },
      };
    }
    case 'UPDATE_LIST': {
      const [newState, transactions, inverse] = updateList(state, action.payload);
      pushTransactions('LIST', transactions, inverse);
      return newState;
    }
    case 'NEW_TASK': {
      const newState = newTask(state, action.payload);
      return newState;
    }
    case 'UPDATE_TASK': {
      const [newState, transactions, inverse] = updateTask(state, action.payload);
      pushTransactions('LIST', transactions, inverse);
      return newState;
    }
    default: {
      return state;
    }
  }
};
