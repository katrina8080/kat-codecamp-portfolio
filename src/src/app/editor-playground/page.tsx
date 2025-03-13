'use client'; // only in App Router

import React from 'react';
import dynamic from 'next/dynamic';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

const CustomEditor = dynamic(
  () => {
    return import('@/components/Custom-Editor');
  },
  { ssr: false },
);

function EditorPlayground() {
  const [data, setData] = React.useState('');
  const router = useRouter();

  return (
    <div className="min-h-screen p-10 bg-gray-200">
      <Button
        onClick={() => {
          router.push('/admin');
        }}
        variant="outline"
        className="border border-gray-300 font-poppins"
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Home
      </Button>

      <h1 className="text-3xl font-bold mt-8">Editor Playground</h1>
      <p className="text-gray-500 pt-1">Article Editor Playground</p>

      <div className="grid grid-cols-2 gap-4 mt-8">
        <CustomEditor data={data} onChange={(data) => setData(data)} />

        <div className="flex flex-col">
          <div
            className="prose max-w-none flex-1 bg-white rounded-lg p-6 border border-gray-300"
            dangerouslySetInnerHTML={{
              __html: data,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default EditorPlayground;
