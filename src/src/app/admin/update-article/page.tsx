'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import AdminUpdateArticle from './_components/AdminUpdateArticle';
import { useStateContext } from '@/lib/contexts/state';
import AuthorUpdateArticle from './_components/AuthorUpdateArticle';
import EditorUpdateArticle from './_components/EditorUpdateArticle';
import useEditor, { TabEnum } from '@/lib/hooks/useEditor';
import EditorEditedUpdateArticle from './_components/EditorEditedUpdateArticle';

export default function UpdateArticlePage() {
  const [gState] = useStateContext();
  const router = useRouter();
  const [editorState] = useEditor();

  return (
    <div className="container py-10">
      <Button
        onClick={() => {
          router.push('/admin');
        }}
        variant="outline"
        className="border border-gray-300"
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      {gState.isAdmin && <AdminUpdateArticle />}
      {!gState.isAdmin && gState.isAuthor && <AuthorUpdateArticle />}
      {!gState.isAdmin && gState.isEditor && editorState.currentTab === TabEnum.INACTIVE && <EditorUpdateArticle />}
      {!gState.isAdmin && gState.isEditor && editorState.currentTab === TabEnum.MY_EDITED && (
        <EditorEditedUpdateArticle />
      )}
    </div>
  );
}
