'use client';

import { useEffect, useState } from 'react';
import { useStateContext } from '../contexts/state';
import { toast } from '@/components/ui/use-toast';
import useLocalStorage from './useLocalStorage';

export enum TabEnum {
  USERS = 'users',
  ARTICLES = 'articles',
  CATEGORIES = 'categories',
  SETTINGS = 'settings',
}
export type Tab = 'users' | 'articles' | 'categories' | 'settings';

export default function useAdmin() {
  const [gState, gFn] = useStateContext();

  const [currentTab, setCurrentTab] = useLocalStorage<Tab>('adminTab', 'users');
  const [contents, setContents] = useState({
    users: [],
    articles: [],
    categories: [],
  });

  const getData = async (tab: Tab) => {
    if (!gState.actor) return;

    try {
      switch (tab) {
        case TabEnum.USERS: {
          const users: any = await gState.actor.getUsers();
          console.log('users', users);
          setContents((v) => ({
            ...v,
            users: users.Ok || [],
          }));
          break;
        }
        case TabEnum.ARTICLES: {
          const articles: any = await gState.actor.getAllArticles();
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

  const updateUser = async (id, name, role, status) => {
    console.log('updateUser', status.toString(), id, name, role);
    try {
      const executeUpdateUser: any = await gState.actor.updateUser({
        id: id,
        name,
        role,
        status,
      });
      console.log('updateUser: ', executeUpdateUser);
      await getData(TabEnum.USERS);

      toast({
        title: 'User updated',
        description: 'User updated successfully',
        duration: 5000,
      });
    } catch (e) {
      // Handle any errors during the login process
      const error = e?.response?.data?.message || e.message;
      console.error('updateUser: ', error);

      // Display an error message to the user
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error,
      });
    }
  };

  const createCategory = async (name) => {
    try {
      const executeCreateCategory: any = await gState.actor.createCategory(name);
      console.log('createCategory: ', executeCreateCategory);
      await getData(TabEnum.CATEGORIES);

      toast({
        title: 'Category created',
        description: 'Category created successfully',
        duration: 5000,
      });
    } catch (e) {
      // Handle any errors during the login process
      const error = e?.response?.data?.message || e.message;
      console.error('createCategory: ', error);

      // Display an error message to the user
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error,
      });
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
      await getData(TabEnum.ARTICLES);

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
      await getData(TabEnum.ARTICLES);

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
    if (gState.isAdmin) {
      if (currentTab === TabEnum.ARTICLES) {
        getData(TabEnum.CATEGORIES);
      }
      getData(currentTab);
    }
  }, [currentTab, gState.isAdmin]);

  return [
    {
      currentTab,
      contents,
    },
    {
      setCurrentTab,
      getData,
      updateUser,
      createCategory,
      createArticle,
      updateArticle,
    },
  ];
}
