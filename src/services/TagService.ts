// src/services/TagService.ts

import { db } from '../database/db';
import { Tag } from '../models/Tag';
import { ConflictError, NotFoundError } from '../utils/CustomError';
import { TagSchema } from '../utils/validators';
import { BaseService } from './BaseService';
import { validateData } from './utils/ValidationUtils';
import { entityExists } from './utils/DatabaseUtils';
import { Logger, LogLevel } from '../utils/logger';

class TagService extends BaseService {
    constructor() {
        super('TagService');
    }

    /**
     * Adds a new tag.
     * @param tagData - The tag data to add.
     * @returns The ID of the added tag.
     */
    async addTag(tagData: Partial<Tag>): Promise<number> {
        return this.execute(async () => {
            const validatedTag = validateData(TagSchema, tagData);

            const tagExists = await entityExists(
                db.tags,
                'name',
                validatedTag.name
            );
            if (tagExists) {
                throw new ConflictError('A tag with this name already exists.');
            }

            validatedTag.createdAt = new Date();
            validatedTag.updatedAt = new Date();

            const tagId = await db.tags.add(validatedTag);

            Logger.log({
                level: LogLevel.INFO,
                message: `Tag added with ID: ${tagId}`,
                context: this.context
            });

            return tagId;
        });
    }

    /**
     * Adds multiple tags in bulk.
     * @param tagsData - Array of tag data.
     * @returns An array of added tag IDs.
     */
    async addTagsBulk(tagsData: Partial<Tag>[]): Promise<number[]> {
        return this.execute(async () => {
            const validatedTags = tagsData.map((tagData) =>
                validateData(TagSchema, tagData)
            );

            // Check for duplicates
            for (const tag of validatedTags) {
                const tagExists = await entityExists(db.tags, 'name', tag.name);
                if (tagExists) {
                    throw new ConflictError(
                        `A tag with name "${tag.name}" already exists.`
                    );
                }
                tag.createdAt = new Date();
                tag.updatedAt = new Date();
            }

            const tagIds = await db.tags.bulkAdd(validatedTags);

            Logger.log({
                level: LogLevel.INFO,
                message: `Bulk added ${tagIds.length} tags.`,
                context: this.context
            });

            return tagIds;
        });
    }

    /**
     * Retrieves tags associated with a CV.
     * @param cvId - The ID of the CV.
     * @returns An array of tags.
     */
    async getTagsByCV(cvId: number): Promise<Tag[]> {
        return this.execute(async () => {
            const cvTags = await db.cvTags.where('cvId').equals(cvId).toArray();
            if (!cvTags || cvTags.length === 0) {
                throw new NotFoundError('No tags found for this CV.');
            }

            const tagIds = cvTags.map((cvTag) => cvTag.tagId);
            const tags = await db.tags.where('id').anyOf(tagIds).toArray();

            Logger.log({
                level: LogLevel.INFO,
                message: `Retrieved ${tags.length} tags for CV ID: ${cvId}`,
                context: this.context
            });

            return tags;
        });
    }

}

export const tagService = new TagService();
