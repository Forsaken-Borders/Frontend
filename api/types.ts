/**
 * An accurate reflection of the user object from the Forsaken Borders User API.
 */
export class User {
    /**
     * The id of the user.
     */
    public id: string;

    /**
     * The displayname of the user.
     */
    public username: string;

    /**
     * The user's first name.
     */
    public firstName: string;

    /**
     * The user's last name.
     */
    public lastName: string;

    /**
     * When the user was created, in UTC time.
     */
    public createdAt: Date;

    /**
     * When the user was last updated, in UTC time.
     */
    public updatedAt: Date;

    /**
     * If the user is banned from using the API.
     */
    public isBanned: boolean;

    /**
     * When the user is able to use the API again, in UTC time.
     */
    public banExpiration: Date;

    /**
     * Why the user was banned from using the API.
     */
    public banReason: string;

    /**
     * If the user decided to delete their account.
     */
    public isDeleted: boolean;

    /**
     * If the API recognizes the user as a person of status.
     */
    public isVerified: boolean;

    /**
     * The user's roles.
     */
    public roles: Role[];
}

/**
 * Accurately reflects the role from the Forsaken Borders User API.
 */
export class Role {
    /**
     * The id of the role.
     */
    public id: string;

    /**
     * The name of the role.
     */
    public name: string;

    /**
     * The role description.
     */
    public description: string;

    /**
     * If the role is officially recognized by the API.
     */
    public isOfficial: boolean;

    /**
     * The role icon.
     */
    public icon: Uint8Array;

    /**
     * The role position
     */
    public position: number;

    /**
     * The user permissions. Used to determine which endpoints the user can use.
     */
    public userPermissions: Permissions;

    /**
     * The note permissions. Used to determine which endpoints the user can use.
     */
    public notePermissions: Permissions;

    /**
     * When the role was created at.
     */
    public createdAt: Date;

    /**
     * When the role was last updated at.
     */
    public updatedAt: Date;
}