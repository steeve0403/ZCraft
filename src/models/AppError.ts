export interface AppError {
    code: string;
    message: string;
    field?: string; // For field-specific validation errors
}
