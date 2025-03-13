'use client';

import { useEffect, useState } from 'react';
import { useStateContext } from '../contexts/state';
import { toast } from '@/components/ui/use-toast';
import useLocalStorage from './useLocalStorage';

export enum TabEnum {
  INACTIVE = 'inactive-articles',
  MY_EDITED = 'my-edited-articles',
  CATEGORIES = 'categories',
}
export type Tab = 'inactive-articles' | 'my-edited-articles' | 'categories';

export default function useEditor() {
  const [gState, gFn] = useStateContext();

  const [currentTab, setCurrentTab] = useLocalStorage<Tab>('editorTab', TabEnum.INACTIVE);
  const [contents, setContents] = useState({
    inactiveArticles: [],
    myEditedArticles: [],
    categories: [],
  });

  const getData = async (tab: Tab) => {
    try {
      switch (tab) {
        case TabEnum.INACTIVE: {
          const articles: any = await gState.actor.getInactiveArticles();
          console.log('inactive articles', articles);
          setContents((v) => ({
            ...v,
            inactiveArticles: articles.Ok || [],
          }));
          break;
        }
        case TabEnum.MY_EDITED: {
          const articles: any = await gState.actor.getArticlesEditedByEditor();
          console.log('my edited articles', articles);
          setContents((v) => ({
            ...v,
            myEditedArticles: articles.Ok || [],
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
      await getData(TabEnum.INACTIVE);

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

  const updateArticle = async ({ id, title, date, description, content, categoryId, status }) => {
    try {
      const executeUpdateArticle: any = await gState.actor.updateArticle({
        id,
        title,
        date,
        description,
        content,
        categoryId,
        status,
      });
      console.log('updateArticle: ', executeUpdateArticle);
      await getData(TabEnum.INACTIVE);

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

  const updateEditedArticle = async ({ id, title, date, description, content, categoryId, status }) => {
    try {
      const executeUpdateArticle: any = await gState.actor.updateArticle({
        id,
        title,
        date,
        description,
        content,
        categoryId,
        status,
      });
      console.log('updateEditedArticle: ', executeUpdateArticle);
      await getData(TabEnum.MY_EDITED);

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
      console.error('updateEditedArticle: ', error);

      // Display an error message to the user
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error,
      });
    }
  };

  useEffect(() => {
    if (gState.isEditor) {
      if (currentTab === TabEnum.INACTIVE) {
        getData(TabEnum.CATEGORIES);
      }
      getData(currentTab);
    }
  }, [currentTab, gState.isEditor]);

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
      updateEditedArticle,
    },
  ];
}
