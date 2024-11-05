// src/services/TemplateService.ts

import { db } from '@/database/db';
import { Template } from '@/types/Template';

export const TemplateService = {
    async getAllTemplates(): Promise<Template[]> {
        const templates = await db.templates.toArray();
        return templates;
    },

    async getTemplateById(id: number): Promise<Template | undefined> {
        return db.templates.get(id);
    },

    async addTemplate(template: Template): Promise<number> {
        template.createdAt = new Date();
        template.updatedAt = new Date();
        const id = await db.templates.add(template);
        return id;
    },

    async updateTemplate(template: Template): Promise<void> {
        template.updatedAt = new Date();
        await db.templates.put(template);
    },

    async deleteTemplate(id: number): Promise<void> {
        await db.templates.delete(id);
    }
};
