import { enableMapSet, enablePatches, applyPatches } from 'immer';
import { create } from 'zustand';
import type { TransactionsStore } from './store.types';
import { useListStore } from '../list/store';

enablePatches();
enableMapSet();

export const useTransactionsStore = create<TransactionsStore>((set) => ({
  stack: [],
  pointer: -1,

  push: (storeName, transactions, inverse) =>
    set((state) => {
      return {
        stack: state.stack.slice(0, state.pointer + 1).concat([[storeName, transactions, inverse]]),
        pointer: state.pointer + 1,
      };
    }),
}));

useTransactionsStore.subscribe((state) => {
  console.log(state);
});

export const handleUndoTransactions = () => {
  const { stack, pointer } = useTransactionsStore.getState();
  if (pointer < 0) return;
  const [storeName, , inverse] = stack[pointer];
  useTransactionsStore.setState({
    pointer: pointer - 1,
  });

  switch (storeName) {
    case 'LIST': {
      const state = useListStore.getState();
      const newState = applyPatches(state, inverse);
      useListStore.setState(newState);
    }
    default: {
      return;
    }
  }
};

export const handleRedoTransactions = () => {
  const { stack, pointer } = useTransactionsStore.getState();
  if (pointer >= stack.length - 1) return;
  const [storeName, transactions] = stack[pointer + 1];
  useTransactionsStore.setState({
    pointer: pointer + 1,
  });

  switch (storeName) {
    case 'LIST': {
      const state = useListStore.getState();
      const newState = applyPatches(state, transactions);
      useListStore.setState(newState);
    }
    default: {
      return;
    }
  }
};
