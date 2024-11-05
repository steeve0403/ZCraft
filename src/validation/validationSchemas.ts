// src/validation/validationSchemas.ts

import { z } from 'zod';

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

export const SectionSchema = z.object({
    id: z.number().optional(),
    cvId: z.number(),
    title: z.string().min(1, 'Le titre est requis.'),
    content: z.string().min(1, 'Le contenu est requis.'),
    // type: z.nativeEnum(SectionType),
    order: z.number(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional()
});

export const CVSchema = z.object({
    id: z.number().optional(),
    userId: z.number(),
    title: z.string().min(1, 'Le titre est requis.'),
    description: z.string().optional(),
    templateId: z.number().optional(),
    sections: z.array(SectionSchema).optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional()
});
