import { Permission } from './Permission';

export type Role = 'admin' | 'user';

export const RolePermissions: Record<Role, Permission[]> = {
    admin: [
        Permission.CREATE_CV,
        Permission.EDIT_CV,
        Permission.DELETE_CV,
        Permission.VIEW_CV,
        Permission.MANAGE_USERS,
        Permission.VIEW_ADMIN_PANEL
        // Toutes les permissions
    ],
    user: [
        Permission.CREATE_CV,
        Permission.EDIT_CV,
        Permission.DELETE_CV,
        Permission.VIEW_CV
        // Permissions limitées
    ]
};
