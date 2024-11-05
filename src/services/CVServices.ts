import { db } from '@/database/db';
import { CV } from '@/models/CV';
import { Section } from '@/models/Section';
import { Tag } from '@/models/Tag';
import { ValidationError, NotFoundError } from '@/utils/CustomError';
import { CVSchema } from '@/utils/validators';
import { BaseService } from './BaseService';
import { validateData } from './utils/ValidationUtils';
import { entityExists, executeTransaction } from './utils/DatabaseUtils';
import { Logger, LogLevel } from '@/utils/logger';

class CVService extends BaseService {
    constructor() {
        super('CVService');
    }

    /**
     * Adds a new CV.
     * @param cvData - The CV data to add.
     * @param sectionIds - Optional array of section IDs to associate.
     * @returns The ID of the added CV.
     */
    async addCV(cvData: Partial<CV>, sectionIds?: number[]): Promise<number> {
        return this.execute(async () => {
            const validatedCV = validateData(CVSchema, cvData) as CV;

            // Ensure the user exists
            const userExists = await entityExists(
                db.users,
                'id',
                validatedCV.userId
            );
            if (!userExists) {
                throw new ValidationError('User does not exist.');
            }

            validatedCV.createdAt = new Date();
            validatedCV.updatedAt = new Date();

            return await executeTransaction(
                'rw',
                [db.cvs, db.tags, db.cvTags],
                async () => {
                    // Add CV
                    const cvId = await db.cvs.add(validatedCV);

                    // Associate sections if provided
                    if (sectionIds && sectionIds.length > 0) {
                        await this.associateSections(cvId, sectionIds);
                    }

                    // Handle tags
                    if (validatedCV.tags && validatedCV.tags.length > 0) {
                        await this.processTags(validatedCV.tags, cvId);
                    }

                    Logger.log({
                        level: LogLevel.INFO,
                        message: `CV added with ID: ${cvId}`,
                        context: this.context
                    });

                    return cvId;
                }
            );
        });
    }

    /**
     * Associates sections with a CV.
     * @param cvId - The ID of the CV.
     * @param sectionIds - Array of section IDs to associate.
     */
    private async associateSections(
        cvId: number,
        sectionIds: number[]
    ): Promise<void> {
        for (const sectionId of sectionIds) {
            // Ensure the section exists
            const sectionExists = await entityExists(
                db.sections,
                'id',
                sectionId
            );
            if (!sectionExists) {
                throw new NotFoundError(
                    `Section with ID ${sectionId} does not exist.`
                );
            }

            // Create association (assuming CV has a 'sectionIds' field)
            const cv = await db.cvs.get(cvId);
            if (cv) {
                cv.sectionIds = cv.sectionIds || [];
                if (!cv.sectionIds.includes(sectionId)) {
                    cv.sectionIds.push(sectionId);
                    await db.cvs.put(cv);
                }
            }
        }
    }

    /**
     * Retrieves a CV by ID, including associated sections and tags.
     * @param cvId - The ID of the CV.
     * @returns The CV with sections and tags.
     */
    async getCVById(cvId: number): Promise<CV & { sections: Section[] }> {
        return this.execute(async () => {
            const cv = await db.cvs.get(cvId);
            if (!cv) {
                throw new NotFoundError('CV not found.');
            }

            // Fetch associated tags
            const cvTags = await db.cvTags.where('cvId').equals(cvId).toArray();
            const tagIds = cvTags.map((cvTag) => cvTag.tagId);
            cv.tags = await db.tags.where('id').anyOf(tagIds).toArray();

            // Fetch associated sections
            let sections: Section[] = [];
            if (cv.sectionIds && cv.sectionIds.length > 0) {
                sections = await db.sections
                    .where('id')
                    .anyOf(cv.sectionIds)
                    .toArray();
            }

            Logger.log({
                level: LogLevel.INFO,
                message: `Retrieved CV with ID: ${cvId}`,
                context: this.context
            });

            return { ...cv, sections };
        });
    }

    /**
     * Searches CVs by tags.
     * @param tagNames - Array of tag names to search by.
     * @returns An array of CVs matching the tags.
     */
    async searchCVsByTags(tagNames: string[]): Promise<CV[]> {
        return this.execute(async () => {
            // Get tag IDs from names
            const tags = await db.tags
                .where('name')
                .anyOfIgnoreCase(tagNames)
                .toArray();
            const tagIds = tags.map((tag) => tag.id).filter((id): id is number => id !== undefined);

            // Get CV IDs from CVTags
            const cvTags = await db.cvTags
                .where('tagId')
                .anyOf(tagIds)
                .toArray();
            const cvIds = cvTags.map((cvTag) => cvTag.cvId);

            // Get unique CVs
            const cvs = await db.cvs.where('id').anyOf(cvIds).toArray();

            Logger.log({
                level: LogLevel.INFO,
                message: `Found ${cvs.length} CVs matching tags: ${tagNames.join(', ')}`,
                context: this.context
            });

            return cvs;
        });
    }

    /**
     * Processes tags for a CV.
     * @param tags - Array of tags to process.
     * @param cvId - The ID of the CV.
     */
    private async processTags(tags: Tag[], cvId: number): Promise<void> {
        for (const tag of tags) {
            const existingTag = await db.tags.where('name').equals(tag.name).first();
            let tagId: number;
            if (existingTag && existingTag.id !== undefined) {
                tagId = existingTag.id;
            } else {
                tagId = await db.tags.add(tag);
            }
            await db.cvTags.add({ cvId, tagId });
        }
    }
}

export const cvService = new CVService();
