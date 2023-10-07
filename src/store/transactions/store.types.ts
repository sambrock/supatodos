import type { Patch } from 'immer';

export type Transaction = Patch;

export type StoreName = 'LIST';

export type TransactionsStore = {
  stack: [StoreName, Transaction[], Transaction[]][]; // [name, transactions[], inverse[]][]
  pointer: number;
  push: (storeName: StoreName, transactions: Transaction[], inverseTransactions: Transaction[]) => void;
};
