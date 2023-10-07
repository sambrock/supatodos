import { create } from 'zustand';
import { enableMapSet, enablePatches } from 'immer';
import type { ListStore } from './store.types';
import { reducer } from './reducer';

enablePatches();
enableMapSet();

export const useListStore = create<ListStore>((set) => ({
  data: {
    list: null,
    tasks: null,
  },

  dispatch: (action) => set((state) => reducer(state, action)),
}));
