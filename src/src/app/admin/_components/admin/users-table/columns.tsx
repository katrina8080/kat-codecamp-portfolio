'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, Pencil } from 'lucide-react';
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
import { Controller, useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { UpdateUserSchema } from './user-schema';
import { zodResolver } from '@hookform/resolvers/zod';

export const columns = (fn = null) => [
  {
    id: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Principal ID" />,
    accessorFn: (row) => `${row.id.toText()}`,
    cell: ({ row }) => {
      const data = row.original;
      return <div className="max-w-xs">{data.id.toText()}</div>;
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
    id: 'role',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
    cell: ({ row }) => {
      const data = row.original;
      const variant = {
        author: 'info',
        editor: 'warning',
      };

      return <Badge variant={variant[data.role]}>{data.role}</Badge>;
    },
    accessorFn: (row) => `${row.role}`,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
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
    cell: ({ row }) => <Actions data={row.original} fn={fn} />,
  },
];

const Actions = ({ data, fn }) => {
  const dialogUpdateUser = useHookstate(false);
  const loading = useHookstate(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      name: data.name,
      role: data.role,
      status: `${data.status}`,
    },
  });

  const onSubmit = async (v) => {
    loading.set(true);
    console.log({
      id: data.id,
      ...v,
    });
    await fn.updateUser(data.id, v.name, v.role, v.status == 'true' ? true : false);
    loading.set(false);
    dialogUpdateUser.set(false);
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          console.log(data);
          dialogUpdateUser.set(true);
        }}
      >
        <Pencil className="h-4 w-4" />
      </Button>

      {/* Edit Dialog */}
      <Dialog open={dialogUpdateUser.value} onOpenChange={dialogUpdateUser.set}>
        <DialogContent className="sm:max-w-[32rem]">
          <DialogHeader>
            <DialogTitle className="text-primary">Edit User</DialogTitle>
            <DialogDescription>
              {`Fill up the forms to update a user. Click "Update" when you're ready.`}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 mt-3">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="name" className="font-normal pb-1">
                  Name
                </Label>
                <Input
                  {...register('name')}
                  className={cn(
                    'focus-visible:ring-primary',
                    errors.name && 'border-red-500 focus-visible:ring-red-500',
                  )}
                  type="text"
                  placeholder="Enter Name"
                />
                {errors.name && <p className="form-error">{`${errors.name.message}`}</p>}
              </div>

              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="role" className="font-normal pb-1">
                  User Role
                </Label>
                <Controller
                  control={control}
                  name="role"
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <Select onValueChange={onChange} defaultValue={value}>
                      <SelectTrigger
                        className={cn(
                          'focus-visible:ring-primary',
                          errors.role && 'border-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
                        )}
                      >
                        <SelectValue placeholder="Select user role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="author">Author</SelectItem>
                          <SelectItem value="editor">Editor</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.role && <p className="form-error">{`${errors.role.message}`}</p>}
              </div>

              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="status" className="font-normal pb-1">
                  Status
                </Label>
                <Controller
                  control={control}
                  name="status"
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <Select onValueChange={onChange} value={value}>
                      <SelectTrigger
                        className={cn(
                          'focus-visible:ring-primary',
                          errors.status && 'border-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
                        )}
                      >
                        <SelectValue placeholder="Select user role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="true">True</SelectItem>
                          <SelectItem value="false">False</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.status && <p className="form-error">{`${errors.status.message}`}</p>}
              </div>
            </div>

            <div className="pt-6 flex gap-2 justify-end">
              <DialogClose asChild>
                <Button className="px-12" variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button className="px-12" type="submit" disabled={loading.value}>
                {loading.value ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Update'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
