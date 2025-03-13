'use client';

import { useStateContext } from '@/lib/contexts/state';
import { IoIosDocument, IoIosFolder, IoIosPeople, IoIosSettings } from 'react-icons/io';

import dynamic from 'next/dynamic';
const UsersTable = dynamic(() => import('./users-table').then((mod) => mod.UsersTable), { ssr: false });
const CategoriesTable = dynamic(() => import('./categories-table').then((mod) => mod.CategoriesTable), { ssr: false });
const ArticlesTable = dynamic(() => import('./article-table').then((mod) => mod.ArticlesTable), { ssr: false });
import { columns } from './users-table/columns';
import { columns as categoriesColumn } from './categories-table/columns';
import { columns as articleColumn } from './article-table/columns';
import useAdmin, { TabEnum } from '@/lib/hooks/useAdmin';

export default function AdminUser() {
  const [gState, gFn] = useStateContext();
  const [adminState, adminFn] = useAdmin();

  return (
    <div>
      <div className="text-icp-yellow font-semibold text-[16px] pb-4">Admin</div>
      <div className="md:flex">
        {/* Tab nav */}
        <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
          <li>
            <button
              className={
                adminState.currentTab === TabEnum.USERS
                  ? 'inline-flex items-center px-4 py-3 text-white bg-blue-700 rounded-lg active w-full dark:bg-blue-600'
                  : 'inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white'
              }
              aria-current="page"
              onClick={() => adminFn.setCurrentTab(TabEnum.USERS)}
            >
              <IoIosPeople className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" />
              Users
            </button>
          </li>
          <li>
            <button
              className={
                adminState.currentTab === TabEnum.ARTICLES
                  ? 'inline-flex items-center px-4 py-3 text-white bg-blue-700 rounded-lg active w-full dark:bg-blue-600'
                  : 'inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white'
              }
              onClick={() => adminFn.setCurrentTab(TabEnum.ARTICLES)}
            >
              <IoIosDocument className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" />
              Articles
            </button>
          </li>
          <li>
            <button
              className={
                adminState.currentTab === TabEnum.CATEGORIES
                  ? 'inline-flex items-center px-4 py-3 text-white bg-blue-700 rounded-lg active w-full dark:bg-blue-600'
                  : 'inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white'
              }
              onClick={() => adminFn.setCurrentTab(TabEnum.CATEGORIES)}
            >
              <IoIosFolder className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" />
              Categories
            </button>
          </li>
          <li>
            <button
              className={
                adminState.currentTab === TabEnum.SETTINGS
                  ? 'inline-flex items-center px-4 py-3 text-white bg-blue-700 rounded-lg active w-full dark:bg-blue-600'
                  : 'inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white'
              }
              onClick={() => adminFn.setCurrentTab(TabEnum.SETTINGS)}
            >
              <IoIosSettings className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" />
              Settings
            </button>
          </li>
        </ul>

        {/* Tab content */}
        {adminState.currentTab === TabEnum.USERS && (
          <div className="overflow-hidden p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Users</h3>

            <UsersTable columns={columns(adminFn)} data={adminState.contents.users} />
          </div>
        )}
        {adminState.currentTab === TabEnum.ARTICLES && (
          <div className="overflow-hidden p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Articles</h3>

            <ArticlesTable columns={articleColumn(adminState, adminFn)} data={adminState.contents.articles} />
          </div>
        )}
        {adminState.currentTab === TabEnum.CATEGORIES && (
          <div className="overflow-hidden p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Categories</h3>

            <CategoriesTable columns={categoriesColumn(adminFn)} data={adminState.contents.categories} />
          </div>
        )}
        {adminState.currentTab === TabEnum.SETTINGS && (
          <div className="overflow-hidden p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
            <button
              onClick={gFn.initOwner}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              initialize ownership
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
