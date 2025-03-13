import { z } from 'zod';

export const AddArticleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  content: z.string().min(1, 'Content is required'),
  categoryId: z.string().min(1, 'Category is required'),
  status: z.string().min(1, 'Status is required'),
});
export type AddArticleType = z.infer<typeof AddArticleSchema>;
