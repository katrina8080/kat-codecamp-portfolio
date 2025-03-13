'use client';

import { useStateContext } from '@/lib/contexts/state';
import { IoIosDocument } from 'react-icons/io';

import { columns as articleColumn } from './inactive-article-table/columns';
import { columns as editedArticleColumn } from './edited-article-table/columns';
import { ArticlesTable } from './inactive-article-table';
import { ArticlesTable as EditedArticles } from './edited-article-table';
import useEditor, { TabEnum } from '@/lib/hooks/useEditor';

export default function EditorUser() {
  const [gState, gFn] = useStateContext();
  const [editorState, editorFn] = useEditor();

  return (
    <div>
      <div className="text-icp-yellow font-semibold text-[16px] pb-4">Editor</div>
      <div className="md:flex">
        {/* Tab nav */}
        <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
          <li>
            <button
              className={
                editorState.currentTab === TabEnum.INACTIVE
                  ? 'inline-flex items-center px-4 py-3 text-white bg-blue-700 rounded-lg active w-full dark:bg-blue-600'
                  : 'inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white'
              }
              onClick={() => editorFn.setCurrentTab(TabEnum.INACTIVE)}
            >
              <IoIosDocument className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" />
              <div className="min-w-max">Inactive Articles</div>
            </button>
          </li>
          <li>
            <button
              className={
                editorState.currentTab === TabEnum.MY_EDITED
                  ? 'inline-flex items-center px-4 py-3 text-white bg-blue-700 rounded-lg active w-full dark:bg-blue-600'
                  : 'inline-flex items-center px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white'
              }
              onClick={() => editorFn.setCurrentTab(TabEnum.MY_EDITED)}
            >
              <IoIosDocument className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" />
              <div className="min-w-max">My Edited Articles</div>
            </button>
          </li>
        </ul>

        {/* Tab content */}
        {editorState.currentTab === TabEnum.INACTIVE && (
          <div className="overflow-hidden p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">My Articles</h3>

            <ArticlesTable
              columns={articleColumn(editorState, editorFn)}
              data={editorState.contents.inactiveArticles}
            />
          </div>
        )}
        {editorState.currentTab === TabEnum.MY_EDITED && (
          <div className="overflow-hidden p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">My Articles</h3>

            <EditedArticles
              columns={editedArticleColumn(editorState, editorFn)}
              data={editorState.contents.myEditedArticles}
            />
          </div>
        )}
      </div>
    </div>
  );
}
