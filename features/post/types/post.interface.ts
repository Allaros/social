import { CreatePostSchema } from '@/shared/utils/validations';
import z from 'zod';

export type Permissions = {
   canDelete: boolean;
   canEdit: boolean;
   canReport: boolean;
};

export type CreatePostFormData = z.infer<typeof CreatePostSchema>;
