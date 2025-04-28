import { api, APIError } from "encore.dev/api";

import UserService from "../services/user.service";
import { Response } from "../../../../shared/types/api.interface";
import { Role, UserResponse } from "../../../types/user.interface";
import { getAuthData } from "~encore/auth";


interface UserRoleParams {
    userId: string;
}

export const getUserRoleForClient = api<{}, { role: Role }>(
    {auth: true, expose: true, method: "GET", path: "/api/role"},
    async (): Promise<{ role: Role }> => {
        const userId = getAuthData().userID;
        if (!userId) throw APIError.unauthenticated("Authdata is missing for the user!");
        const role = await UserService.getUserRoleById(userId);
        return { role };
    }
);


export const getUserRoleForAuth = api<UserRoleParams, { role: Role }>(
    {},
    async ({ userId }): Promise<{ role: Role }> => {
        const role = await UserService.getUserRoleById(userId);
        return { role };
    }
);

export const count = api(
    { expose: true, method: "GET", path: "/api/count/users" },
    async (): Promise<Response> => {
        try {
            const result = await UserService.count();
            return { success: true, result };
        } catch (error) {
            throw APIError.aborted(
                error?.toString() || "Error counting existing users"
            );
        }
    }
);

export const readByEmail = api(
    { expose: true, method: "GET", path: "/api/users/email/:email" },
    async ({ email }: { email: string }): Promise<UserResponse> => {
        try {
            const result = await UserService.findByEmail(email);
            return result;
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error getting user data");
        }
    }
);

export const readOne = api(
    { expose: true, method: "GET", path: "/api/users/:id" },
    async ({ id }: { id: string }): Promise<UserResponse> => {
        try {
            const result = await UserService.findOne(id);
            return result;
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error getting user data");
        }
    }
);