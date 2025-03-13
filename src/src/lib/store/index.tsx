'use client';

import { hookstate, useHookstate } from '@hookstate/core';
import { devtools } from '@hookstate/devtools';

export const globalState = hookstate(
  {
    user: null as any,
    ui: {
      mobileMenu: false,
      selectedTab: 0,
    },
    categories: [],
    articles: [],
    users: [],
    categoryPage: {
      categoryId: '',
      categoryName: '',
      articles: [],
    },
  },
  devtools({ key: 'globalState' }),
);

export const useGlobalState = () => useHookstate(globalState);
