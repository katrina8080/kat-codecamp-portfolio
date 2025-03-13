import { z } from 'zod';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

export const AddArticleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  content: z
    .instanceof(EditorState)
    .refine((editorState) => !!editorState.getCurrentContent().hasText(), 'Content is required')
    .transform((editorState) => draftToHtml(convertToRaw(editorState.getCurrentContent()))),
  categoryId: z.string().min(1, 'Category is required'),
  status: z.string().min(1, 'Status is required'),
});
export type AddArticleType = z.infer<typeof AddArticleSchema>;
