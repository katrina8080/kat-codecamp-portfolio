import { z } from 'zod';

export const UpdateUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Role is required'),
  status: z.string().min(1, 'Status is required'),
});
export type UpdateUserType = z.infer<typeof UpdateUserSchema>;
