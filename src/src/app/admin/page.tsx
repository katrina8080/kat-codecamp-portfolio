/* eslint-disable @next/next/no-img-element */
'use client';

import type { NextPage } from 'next';
import { useStateContext } from '@/lib/contexts/state';

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import usePublic from '@/lib/hooks/usePublic';
const AdminUser = dynamic(() => import('./_components/admin/Admin'), { ssr: false });
const EditorUser = dynamic(() => import('./_components/editor/Editor'), { ssr: false });
const AuthorUser = dynamic(() => import('./_components/author/Author'), { ssr: false });

const Admin: NextPage = () => {
  const [gState, gFn] = useStateContext();
  const {} = usePublic();

  return (
    <div>
      <section className="flex flex-col md:min-h-[60vh] overflow-hidden py-10">
        <div className="container flex flex-1 flex-col gap-4 justify-center">
          {!gState.identity && (
            <button
              onClick={gFn.login}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Login
            </button>
          )}

          {gState.identity && gState.actor && (
            <>
              <div className="text-icp-pink font-semibold text-[16px]">{gState.identity.getPrincipal().toText()}</div>

              {gState.isAdmin && <AdminUser />}
              {gState.isEditor && !gState.isAdmin && <EditorUser />}
              {gState.isAuthor && !gState.isAdmin && <AuthorUser />}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Admin;
