import { create } from 'zustand';
import { type Patch, applyPatches, enableMapSet, enablePatches } from 'immer';
import type { ListStore } from './store.types';
import { reducer } from './reducer';

enablePatches();
enableMapSet();

export const useListStore = create<ListStore>((set) => ({
  data: {
    list: null,
    tasks: null,
  },

  patches: {
    stack: [],
    stackPointer: -1,
    saved: [],
  },

  dispatch: (action) => set((state) => reducer(state, action)),
}));

const handleListStoreUndo = (savePatches?: (patches: Patch[]) => void) => {
  const state = useListStore.getState();
  if (state.patches.stackPointer < 0) return;
  const [, inverse] = state.patches.stack[state.patches.stackPointer];

  const newState = applyPatches(useListStore.getState(), inverse);
  useListStore.setState({
    ...newState,
    patches: {
      ...newState.patches,
      stackPointer: state.patches.stackPointer - 1,
      saved: newState.patches.saved.concat([inverse]),
    },
  });
};

const handleListStoreRedo = (savePatches?: (patches: Patch[]) => void) => {
  const state = useListStore.getState();
  if (state.patches.stackPointer >= state.patches.stack.length - 1) return;
  const [patches] = state.patches.stack[state.patches.stackPointer + 1];

  const newState = applyPatches(useListStore.getState(), patches);
  useListStore.setState({
    ...newState,
    patches: {
      ...newState.patches,
      stackPointer: state.patches.stackPointer + 1,
      saved: newState.patches.saved.concat([patches]),
    },
  });
};

export const listStoreHandlers = {
  undo: handleListStoreUndo,
  redo: handleListStoreRedo,
};
