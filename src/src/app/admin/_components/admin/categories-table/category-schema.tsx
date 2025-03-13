import { z } from 'zod';

export const AddCategorySchema = z.object({
  name: z.string().min(1, 'Category Name is required'),
});
export type AddCategoryType = z.infer<typeof AddCategorySchema>;
