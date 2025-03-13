'use client';

import { Button } from '@/components/ui/button';
import { Loader2, Plus } from 'lucide-react';
import { DataTableColumnHeader } from '@/components/layout/table/table-column-header';
import { cn } from '@/lib/utils';
import { useHookstate } from '@hookstate/core';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddCategorySchema } from './category-schema';

export const columns = (fn = null) => [
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
    id: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    accessorFn: (row) => `${row.name}`,
    cell: ({ row }) => {
      const data = row.original;
      return <div className="max-w-xs">{data.name}</div>;
    },
  },
  {
    id: 'actions',
    header: ({ column }) => <ActionHeader column={column} fn={fn} />,
  },
];

const ActionHeader = ({ column, fn }) => {
  const dialogAdd = useHookstate(false);
  const loading = useHookstate(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(AddCategorySchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (v) => {
    console.log('onSubmit: ', v);

    loading.set(true);
    await fn.createCategory(v.name);
    loading.set(false);
    dialogAdd.set(false);
  };

  return (
    <div className="">
      <div className="flex justify-end gap-2">
        <Button className="h-8 px-2 lg:px-3" size="sm" onClick={() => dialogAdd.set(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      {/* Add Category Dialog */}
      <Dialog open={dialogAdd.value} onOpenChange={dialogAdd.set}>
        <DialogContent className="sm:max-w-[32rem]">
          <DialogHeader>
            <DialogTitle className="text-primary">Add Category</DialogTitle>
            <DialogDescription>{`Add a new category.`}</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 mt-3">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="name" className="font-normal pb-1">
                  Category Name
                </Label>
                <Input
                  {...register('name')}
                  className={cn(
                    'focus-visible:ring-primary',
                    errors.name && 'border-red-500 focus-visible:ring-red-500',
                  )}
                  type="text"
                  placeholder="Enter Category Name"
                />
                {errors.name && <p className="form-error">{`${errors.name.message}`}</p>}
              </div>
            </div>

            <div className="pt-6 flex gap-2 justify-end">
              <DialogClose asChild>
                <Button className="px-12" variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button className="px-12" type="submit" disabled={loading.value}>
                {loading.value ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Submit'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
