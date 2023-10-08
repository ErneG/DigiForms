import { z } from 'zod';

export const formSchema = z.object({
    name: z
        .string()
        .min(4, { message: 'Name must be at least 4 characters long' }),
    description: z.string().optional()
});

export type formSchemaType = z.infer<typeof formSchema>;
