import { create } from 'zustand';
import { applyPatches, enableMapSet, enablePatches } from 'immer';
import type { ListStore } from './store.types';
import { reducer } from './reducer';

enablePatches();
enableMapSet();

export const useListStore = create<ListStore>((set) => ({
  // sync / unsync

  // sync state is sycned with the server
  // unsync state is not synced with the server

  data: {
    list: null,
    tasks: null,
  },

  patches: {
    stack: [],
    stackPointer: -1,
  },

  operations: [],

  dispatch: (action) => set((state) => reducer(state, action)),
}));

const undo = () => {
  const state = useListStore.getState();
  if (state.patches.stackPointer < 0) return;
  const [, inverse] = state.patches.stack[state.patches.stackPointer];

  const newState = applyPatches(useListStore.getState(), inverse);
  useListStore.setState({
    ...newState,
    patches: {
      ...newState.patches,
      stackPointer: state.patches.stackPointer - 1,
    },
    operations: newState.operations.concat(inverse),
  });
};

const redo = () => {
  const state = useListStore.getState();
  if (state.patches.stackPointer >= state.patches.stack.length - 1) return;
  const [patches] = state.patches.stack[state.patches.stackPointer + 1];

  const newState = applyPatches(useListStore.getState(), patches);
  useListStore.setState({
    ...newState,
    patches: {
      ...newState.patches,
      stackPointer: state.patches.stackPointer + 1,
    },
    operations: newState.operations.concat(patches),
  });
};

const clearOperations = () => {
  const state = useListStore.getState();
  useListStore.setState({
    ...state,
    operations: [],
  });
};

export const listStoreHandlers = {
  undo,
  redo,
  clearOperations,
};
