'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useHookstate } from '@hookstate/core';
import { Controller, useForm } from 'react-hook-form';
import useAdmin, { TabEnum } from '@/lib/hooks/useAdmin';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { AddArticleSchema } from '../../_components/admin/article-table/article-schema';
import useEstimatedReadingTime from '@/lib/hooks/useEstimatedReadingTime';
import useHtmlToText from '@/lib/hooks/useHtmlToText';
const CustomEditor = dynamic(
  () => {
    return import('@/components/Custom-Editor');
  },
  { ssr: false },
);

export default function AdminNewArticle() {
  const loading = useHookstate(false);
  const [adminState, adminFn] = useAdmin();

  const readingTimeInMinutes = useEstimatedReadingTime();
  const htmlToText = useHtmlToText();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(AddArticleSchema),
    defaultValues: {
      categoryId: '',
      title: '',
      description: '',
      content: '',
    },
  });
  const watchCat = watch('categoryId');
  const watchTitle = watch('title');
  const watchContent = watch('content');

  const onSubmit = async (v) => {
    console.log('onSubmit: ', {
      ...v,
      date: BigInt(Date.now()) * BigInt(1000000),
    });

    loading.set(true);
    await adminFn.createArticle({
      ...v,
      date: BigInt(Date.now()) * BigInt(1000000),
    });
    loading.set(false);
  };

  useEffect(() => {
    adminFn.getData(TabEnum.CATEGORIES);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 font-poppins">
      <h1 className="text-3xl font-bold">New Article</h1>
      <p className="text-gray-500 pt-1">Fill in the form to create a new article</p>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="grid gap-4">
          <div className="grid items-center gap-1.5">
            <Label htmlFor="categoryId" className="font-normal pb-1">
              Category
            </Label>
            <Controller
              control={control}
              name="categoryId"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Select onValueChange={onChange} defaultValue={value}>
                  <SelectTrigger
                    className={cn(
                      'focus:ring-[#3b82f680]',
                      errors.categoryId && 'border-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
                    )}
                  >
                    <SelectValue placeholder="Select user category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {adminState.contents.categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.categoryId && <p className="form-error">{`${errors.categoryId.message}`}</p>}
          </div>

          <div className="grid items-center gap-1.5">
            <Label htmlFor="title" className="font-normal pb-1">
              Title
            </Label>
            <Input
              {...register('title')}
              className={cn('focus-visible:ring-primary', errors.title && 'border-red-500 focus-visible:ring-red-500')}
              type="text"
              placeholder="Enter Title"
            />
            {errors.title && <p className="form-error">{`${errors.title.message}`}</p>}
          </div>

          <div className="grid items-center gap-1.5">
            <Label htmlFor="description" className="font-normal pb-1">
              Description
            </Label>
            <Textarea
              {...register('description')}
              className={cn(
                'focus-visible:ring-primary',
                errors.description && 'border-red-500 focus-visible:ring-red-500',
              )}
              placeholder="Enter Description"
            />
            {errors.description && <p className="form-error">{`${errors.description.message}`}</p>}
          </div>

          <div className="grid items-center gap-1.5">
            <Label htmlFor="content" className="font-normal pb-1">
              Content
            </Label>
            <Controller
              control={control}
              name="content"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <CustomEditor data={value} onChange={onChange} />
              )}
            />
            {errors.content && <p className="form-error">{`${errors.content.message}`}</p>}
          </div>
        </div>

        <div className="flex flex-col">
          <Label htmlFor="" className="font-normal pb-1">
            Content Preview
          </Label>
          <div className="flex-1 bg-white rounded-lg p-6 mt-2">
            <div className="text-center font-black uppercase text-sm tracking-widest text-icp-yellow">
              {adminState.contents.categories.find((c) => c.id === watchCat)?.name}
            </div>

            {/* Title */}
            <div className="pt-3 mx-auto text-center max-w-2xl">
              <h1 className="text-2xl font-bold">{watchTitle}</h1>
            </div>

            {/* Stats */}
            <div className="text-gray-500 pt-6 flex justify-center items-center gap-2 uppercase font-medium text-sm tracking-wider">
              <div>
                {`${new Date().toLocaleString('en-US', {
                  timeZone: 'Asia/Manila',
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit',
                })}`}
              </div>
              <div> • </div>
              <div>{`${readingTimeInMinutes.calculate(htmlToText.convert(watchContent))} min read`}</div>
            </div>

            <div
              className={cn(
                'prose max-w-none mt-8',
                'prose-figcaption:text-center',
                'prose-figure:flex prose-figure:flex-col prose-figure:items-center',
                'prose-img:object-cover',
              )}
              dangerouslySetInnerHTML={{
                __html: watchContent,
              }}
            />
          </div>
        </div>
      </div>

      <div className="pt-6 flex gap-2 justify-end">
        {/* <Button className="px-12" variant="outline" type="button">
              Cancel
            </Button> */}
        <Button className="px-12" type="submit" disabled={loading.value}>
          {loading.value ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Submit'}
        </Button>
      </div>
    </form>
  );
}
