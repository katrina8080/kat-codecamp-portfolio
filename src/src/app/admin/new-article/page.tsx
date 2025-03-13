'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import AdminNewArticle from './_components/AdminNewArticle';
import { useStateContext } from '@/lib/contexts/state';
import AuthorNewArticle from './_components/AuthorNewArticle';

export default function NewArticlePage() {
  const [gState] = useStateContext();
  const router = useRouter();

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

      {gState.isAdmin && <AdminNewArticle />}
      {!gState.isAdmin && gState.isAuthor && <AuthorNewArticle />}
    </div>
  );
}
