'use client';

import { useEffect, useState } from 'react';
import { useStateContext } from '../contexts/state';
import { toast } from '@/components/ui/use-toast';
import useLocalStorage from './useLocalStorage';

export enum TabEnum {
  MY_ARTICLES = 'my-articles',
  CATEGORIES = 'categories',
}
export type Tab = 'my-articles' | 'categories';

export default function useAuthor() {
  const [gState, gFn] = useStateContext();

  const [currentTab, setCurrentTab] = useLocalStorage<Tab>('authorTab', TabEnum.MY_ARTICLES);
  const [contents, setContents] = useState({
    articles: [],
    categories: [],
  });

  const getData = async (tab: Tab) => {
    try {
      switch (tab) {
        case TabEnum.MY_ARTICLES: {
          const articles: any = await gState.actor.getArticlesOfAuthor();
          console.log('articles', articles);
          setContents((v) => ({
            ...v,
            articles: articles.Ok || [],
          }));
          break;
        }
        case TabEnum.CATEGORIES: {
          const categories: any = await gState.actor.getAllCategories();
          console.log('categories', categories);
          setContents((v) => ({
            ...v,
            categories: categories.Ok || [],
          }));
          break;
        }
      }
    } catch (error) {
      console.error(`Error while fetching ${tab}:`, error);
    }
  };

  const createArticle = async ({ title, date, description, content, categoryId }) => {
    try {
      const executecreateArticle: any = await gState.actor.createArticle({
        id: '',
        title,
        date,
        description,
        content,
        categoryId,
        status: false,
      });
      console.log('createArticle: ', executecreateArticle);
      await getData(TabEnum.MY_ARTICLES);

      toast({
        title: 'Article created',
        description: 'Article created successfully',
        duration: 5000,
      });
    } catch (e) {
      // Handle any errors during the login process
      const error = e?.response?.data?.message || e.message;
      console.error('createArticle: ', error);

      // Display an error message to the user
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error,
      });
    }
  };

  const updateArticle = async ({ id, title, date, description, content, categoryId }) => {
    try {
      const executeUpdateArticle: any = await gState.actor.updateArticle({
        id,
        title,
        date,
        description,
        content,
        categoryId,
        status: false,
      });
      console.log('updateArticle: ', executeUpdateArticle);
      await getData(TabEnum.MY_ARTICLES);

      if (executeUpdateArticle.Err) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: executeUpdateArticle.Err.Forbidden,
        });
        return;
      }

      toast({
        title: 'Article updated',
        description: 'Article updated successfully',
        duration: 5000,
      });
    } catch (e) {
      // Handle any errors during the login process
      const error = e?.response?.data?.message || e.message;
      console.error('updateArticle: ', error);

      // Display an error message to the user
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error,
      });
    }
  };

  useEffect(() => {
    if (gState.isAuthor) {
      if (currentTab === TabEnum.MY_ARTICLES) {
        getData(TabEnum.CATEGORIES);
      }
      getData(currentTab);
    }
  }, [currentTab, gState.isAuthor]);

  return [
    {
      currentTab,
      contents,
    },
    {
      setCurrentTab,
      getData,
      createArticle,
      updateArticle,
    },
  ];
}
