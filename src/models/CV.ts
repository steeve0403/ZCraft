import { Tag } from './Tag';
import { Section } from '@/models/Section';

/**
 * Represents a CV in the application.
 */
export interface CV {
    id?: number;
    userId: number;
    title: string;
    description?: string;
    templateId?: number;
    tags?: Tag[];
    createdAt: Date;
    updatedAt: Date;
    sectionIds?: number[];
}
