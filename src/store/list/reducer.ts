import { type Draft, produceWithPatches } from 'immer';

import type { ListStore } from './store.types';
import type { Action, ActionPayload } from './action.types';
import { useTransactionsStore } from '../transactions/store';

const pushTransactions = useTransactionsStore.getState().push;

const setTitle = produceWithPatches((draft: Draft<ListStore>, payload: ActionPayload<'SET_TITLE'>) => {
  draft.data.list!.title = payload ?? '';
});

// const addTask = produceWithPatches((draft: Draft<ListStore>, payload: ActionPayload<'ADD_TASK'>) => {
//   draft.data.tasks!.set(draft.data.tasks!.size, {
//     title: payload.title ?? '',
//     isComplete: false,

//   });
// }

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
    case 'SET_TITLE': {
      const [newState, transactions, inverseTransactions] = setTitle(state, action.payload);
      pushTransactions('LIST', transactions, inverseTransactions);
      return newState;
    }
    default: {
      return state;
    }
  }
};
