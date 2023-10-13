import { create } from 'zustand';
import type { ListStore } from './store.types';
import { reducer } from './reducer';

export const useListStore = create<ListStore>((set) => ({
  data: {
    list: null,
    tasks: null,
    tags: null,
  },

  dispatch: (action) => set((state) => reducer(state, action)),
}));
