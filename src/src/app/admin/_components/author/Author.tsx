'use client';

import { useStateContext } from '@/lib/contexts/state';
import { IoIosDocument } from 'react-icons/io';

import { columns as articleColumn } from './article-table/columns';
import { ArticlesTable } from './article-table';
import useAuthor, { TabEnum } from '@/lib/hooks/useAuthor';

export default function AuthorUser() {
  const [gState, gFn] = useStateContext();
  const [authorState, authorFn] = useAuthor();

  return (
    <div>
      <div className="text-icp-yellow font-semibold text-[16px] pb-4">Author</div>
      <div className="md:flex">
        {/* Tab nav */}
        <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
          <li>
            <button
              className={
                authorState.currentTab === TabEnum.MY_ARTICLES
                  ? 'inline-flex items-center px-4 py-3 text-white bg-blue-700 rounded-lg active w-full dark:bg-blue-600'
                  : 'inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white'
              }
              onClick={() => authorFn.setCurrentTab(TabEnum.MY_ARTICLES)}
            >
              <IoIosDocument className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" />
              <div className="min-w-max">My Articles</div>
            </button>
          </li>
        </ul>

        {/* Tab content */}
        {authorState.currentTab === TabEnum.MY_ARTICLES && (
          <div className="flex-1 overflow-hidden p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">My Articles</h3>

            <ArticlesTable columns={articleColumn(authorState, authorFn)} data={authorState.contents.articles} />
          </div>
        )}
      </div>
    </div>
  );
}
