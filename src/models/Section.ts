/**
 * Enum for section types.
 */
export enum SectionType {
    Education = 'education',
    Experience = 'experience',
    Skills = 'skills',
    Projects = 'projects',
    Certifications = 'certifications'
    // Add more as needed
}

/**
 * Represents a section in the application.
 */
export interface Section {
    id?: number;
    title: string;
    content: string;
    type: SectionType;
    createdAt: Date;
    updatedAt: Date;
}
