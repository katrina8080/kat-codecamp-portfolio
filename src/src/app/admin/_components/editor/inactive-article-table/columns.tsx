'use client';

import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { DataTableColumnHeader } from '@/components/layout/table/table-column-header';
import { cn } from '@/lib/utils';

import { useStateContext } from '@/lib/contexts/state';
import { useRouter } from 'next/navigation';

export const columns = (state = null, fn = null) => [
  {
    id: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
    accessorFn: (row) => `${row.id}`,
    cell: ({ row }) => {
      const data = row.original;
      return <div className="max-w-xs">{data.id}</div>;
    },
  },
  {
    id: 'category_id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
    accessorFn: (row) => `${row.categoryId}`,
    cell: ({ row }) => {
      const data = row.original;
      return <div className="max-w-xs">{data.categoryId}</div>;
    },
  },
  {
    id: 'title',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
    accessorFn: (row) => `${row.title}`,
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="min-w-[16rem]">
          <div className="font-bold text-gray-800">{data.title}</div>
          <div className="text-gray-500 max-w-md line-clamp-2">{data.description}</div>
        </div>
      );
    },
  },
  // {
  //   accessorKey: 'content',
  //   header: ({ column }) => <DataTableColumnHeader column={column} title="Content" />,
  //   cell: ({ row }) => {
  //     const data = row.original;
  //     return (
  //       <div className="max-w-md line-clamp-2">
  //         <div
  //           className=""
  //           dangerouslySetInnerHTML={{
  //             __html: data.content,
  //           }}
  //         ></div>
  //       </div>
  //     );
  //   },
  // },
  {
    id: 'author',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Author" />,
    accessorFn: (row) => `${row.authorName}`,
    cell: ({ row }) => {
      const data = row.original;
      return <div className="min-w-[10rem]">{data.authorName}</div>;
    },
  },
  {
    id: 'author_id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Author ID" />,
    accessorFn: (row) => `${row.authorId}`,
    cell: ({ row }) => {
      const data = row.original;
      return <div className="min-w-[10rem]">{data.authorId}</div>;
    },
  },
  {
    id: 'editor_id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Editor ID" />,
    accessorFn: (row) => `${row.editorId}`,
    cell: ({ row }) => {
      const data = row.original;
      return <div className="min-w-[10rem]">{data.editorId}</div>;
    },
  },
  {
    id: 'status',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const data = row.original;
      const variant = {
        true: 'success',
        false: 'error',
      };

      return (
        <div className="flex items-center gap-3">
          <div className={cn('rounded-full w-2 h-2', data.status ? 'bg-green-500' : 'bg-red-500')}></div>
          <div>{data.status ? 'True' : 'False'}</div>
        </div>
      );
    },
    accessorFn: (row) => `${row.status ? 'True' : 'False'}`,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: 'created_at',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="min-w-max">
          {new Date(parseInt(data.createdAt) / 1000000).toLocaleString('en-US', {
            timeZone: 'Asia/Manila',
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: 'numeric',
            minute: 'numeric',
          })}
        </div>
      );
    },
    accessorFn: (row) => `${row.createdAt}`,
  },
  {
    id: 'actions',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Actions" />,
    cell: ({ row }) => <Actions data={row.original} state={state} fn={fn} />,
  },
];

const Actions = ({ data, state, fn }) => {
  const [gState, gFn] = useStateContext();
  const router = useRouter();

  return (
    <div className="flex items-center justify-end gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          console.log(data);
          gFn.setUpdateArticle(data);
          router.push(`/admin/update-article/?id=${data.id}`);
        }}
        disabled={!gState.user.status}
      >
        <Pencil className="h-4 w-4" />
      </Button>
    </div>
  );
};
