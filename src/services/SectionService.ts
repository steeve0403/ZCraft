import { db } from '@/database/db';
import { Section } from '@/models/Section';
import { NotFoundError } from '@/utils/CustomError';
import { SectionSchema } from '@/utils/validators';
import { BaseService } from './BaseService';
import { validateData } from './utils/ValidationUtils';
import { Logger, LogLevel } from '@/utils/logger';

class SectionService extends BaseService {
    constructor() {
        super('SectionService');
    }

    async addSection(sectionData: Partial<Section>): Promise<number> {
        return this.execute(async () => {
            const validatedSection = validateData(
                SectionSchema,
                sectionData
            ) as Section;

            validatedSection.createdAt = new Date();
            validatedSection.updatedAt = new Date();

            const sectionId = await db.sections.add(validatedSection);

            Logger.log({
                level: LogLevel.INFO,
                message: `Section added with ID: ${sectionId}`,
                context: this.context
            });

            return sectionId;
        });
    }

    async addSectionsBulk(sectionsData: Partial<Section>[]): Promise<number> {
        return this.execute(async () => {
            const validatedSections = sectionsData.map((sectionData) => {
                const validatedSection = validateData(
                    SectionSchema,
                    sectionData
                ) as Section;
                validatedSection.createdAt = new Date();
                validatedSection.updatedAt = new Date();
                return validatedSection;
            });

            const lastSectionId = await db.sections.bulkAdd(validatedSections);

            Logger.log({
                level: LogLevel.INFO,
                message: `Bulk added ${lastSectionId} sections.`,
                context: this.context
            });

            return lastSectionId;
        });
    }

    async getSectionsByCV(cvId: number): Promise<Section[]> {
        return this.execute(async () => {
            const cv = await db.cvs.get(cvId);
            if (!cv || !cv.sectionIds || cv.sectionIds.length === 0) {
                throw new NotFoundError('No sections found for this CV.');
            }

            const sectionIds = cv.sectionIds
                .map((section) => section.id)
                .filter((id): id is number => id !== undefined);
            const sections = await db.sections
                .where('id')
                .anyOf(sectionIds)
                .toArray();

            Logger.log({
                level: LogLevel.INFO,
                message: `Retrieved ${sections.length} sections for CV ID: ${cvId}`,
                context: this.context
            });

            return sections;
        });
    }

    async getSectionById(sectionId: number): Promise<Section> {
        return this.execute(async () => {
            const section = await db.sections.get(sectionId);
            if (!section) {
                throw new NotFoundError('Section not found.');
            }

            Logger.log({
                level: LogLevel.INFO,
                message: `Fetched details for section ID: ${sectionId}`,
                context: this.context
            });

            return section;
        });
    }

    async updateSection(
        sectionId: number,
        sectionData: Partial<Section>
    ): Promise<Section> {
        return this.execute(async () => {
            const section = await db.sections.get(sectionId);
            if (!section) {
                throw new NotFoundError('Section not found.');
            }

            const updatedSection = {
                ...section,
                ...sectionData,
                updatedAt: new Date()
            };
            await db.sections.put(updatedSection);

            Logger.log({
                level: LogLevel.INFO,
                message: `Section updated with ID: ${sectionId}`,
                context: this.context
            });

            return updatedSection;
        });
    }

    async deleteSection(sectionId: number): Promise<void> {
        return this.execute(async () => {
            const section = await db.sections.get(sectionId);
            if (!section) {
                throw new NotFoundError('Section not found.');
            }

            await db.sections.delete(sectionId);

            Logger.log({
                level: LogLevel.INFO,
                message: `Section deleted with ID: ${sectionId}`,
                context: this.context
            });
        });
    }
}

export const sectionService = new SectionService();