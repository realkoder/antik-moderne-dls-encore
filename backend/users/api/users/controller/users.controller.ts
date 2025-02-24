import { api, APIError } from "encore.dev/api";

import UserService from "../services/user.service";
import { Response } from "../../../types/api.interface";
import { Role, UserResponse } from "../../../types/user.interface";


interface UserRoleParams {
    userId: string;
}

export const getUserRole = api<UserRoleParams, { role: Role }>(
    {},
    async ({ userId }): Promise<{ role: Role }> => {
        const role = await UserService.getUserRoleById(userId);
        return { role };
    }
);

export const count = api(
    { expose: true, method: "GET", path: "/count/users" },
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
    { expose: true, method: "GET", path: "/users/email/:email" },
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
    { expose: true, method: "GET", path: "/users/:id" },
    async ({ id }: { id: string }): Promise<UserResponse> => {
        try {
            const result = await UserService.findOne(id);
            return result;
        } catch (error) {
            throw APIError.aborted(error?.toString() || "Error getting user data");
        }
    }
);