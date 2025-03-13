'use client';

import { useEffect } from 'react';
import { useStateContext } from '../contexts/state';
import { useGlobalState } from '../store';

export default function usePublic() {
  const gState = useGlobalState();
  const [{ actor }] = useStateContext();

  const getActiveArticles = async () => {
    const articles: any = await actor.getActiveArticles();
    return articles.Ok;
  };

  const getAllCategories = async () => {
    const categories: any = await actor.getAllCategories();
    return categories.Ok;
  };

  const getActiveArticlesByCategory = async (categoryId) => {
    const articles: any = await actor.getActiveArticlesByCategory(categoryId);
    return articles.Ok;
  };

  useEffect(() => {
    const loadCategoriesAndArticles = async () => {
      if (!actor) return;

      // const users = await actor.getUsers();
      // gState.users.set(
      //   users.Ok.map((v) => ({
      //     ...v,
      //     id: v.id.toString(),
      //     createdAt: (parseInt(v.createdAt) / 1000000).toString(),
      //     updatedAt: (parseInt(v.updatedAt) / 1000000).toString(),
      //   })) || [],
      // );

      const activeArticles = await getActiveArticles();
      const categories = await getAllCategories();
      const catContentsPromises = categories.map(async (cat) => {
        const articles = await getActiveArticlesByCategory(cat.id);
        return {
          ...cat,
          showCount: 3,
          articles: articles.map((v) => ({
            ...v,
            createdAt: parseInt(v.createdAt) / 1000000,
            date: parseInt(v.date) / 1000000,
            updatedAt: parseInt(v.updatedAt) / 1000000,
          })),
        };
      });

      const catContents = await Promise.all(catContentsPromises);
      gState.categories.set(catContents);

      console.log('ACTIVE ARTICLES: ', activeArticles);
      gState.articles.set(
        activeArticles.map((v) => ({
          ...v,
          createdAt: parseInt(v.createdAt) / 1000000,
          date: parseInt(v.date) / 1000000,
          updatedAt: parseInt(v.updatedAt) / 1000000,
        })),
      );
    };

    loadCategoriesAndArticles();
  }, [actor]);

  return { actor, getActiveArticles, getAllCategories, getActiveArticlesByCategory };
}
