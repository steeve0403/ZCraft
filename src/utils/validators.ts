import { z } from 'zod';
import { SectionType } from '@/models/Section';

/**
 * Zod schema for validating User data.
 */
export const EmailSchema = z.string().email('Invalid email address.');
export const PasswordSchema = z
    .string()
    .min(8, 'Password must be at least 8 characters long.')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
    .regex(/[0-9]/, 'Password must contain at least one number.')
    .regex(
        /[^a-zA-Z0-9]/,
        'Password must contain at least one special character.'
    );

export const UserSchema = z.object({
    id: z.number().optional(),
    username: z.string().min(1, 'Username is required.'),
    email: EmailSchema,
    password: PasswordSchema,
    createdAt: z.date().optional(),
    updatedAt: z.date().optional()
});
/**
 * Zod schema for validating CV data.
 */
export const CVSchema = z.object({
    id: z.number().optional(),
    userId: z.number(),
    title: z.string().min(1, 'Title is required.'),
    description: z.string().optional(),
    templateId: z.number().optional(),
    tags: z
        .array(z.object({ id: z.number().optional(), name: z.string() }))
        .optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional()
});

/**
 * Zod schema for validating Section data.
 */
export const SectionSchema = z.object({
    id: z.number().optional(),
    title: z.string().min(1, 'Title is required.'),
    content: z.string().min(1, 'Content is required.'),
    type: z.nativeEnum(SectionType),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional()
});

/**
 * Zod schema for validating Tag data.
 */
export const TagSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, 'Tag name is required.')
});
