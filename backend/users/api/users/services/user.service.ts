import { users, email_addresses, privilege_roles } from "../../../db/schema";
import { db } from "../../../db/database";
import { count, sql, eq, asc } from 'drizzle-orm';
import { UserJSON } from "@clerk/backend";
import { Role, UserResponse } from "../../../types/user.interface";
import { Response } from "../../../types/api.interface";

const UserService = {
    count: async (): Promise<number> => {
        return db.$count(users);
    },

    create: async (event: UserJSON): Promise<{ status: string }> => {
        const userNormalized = {
            id: event.id,
            external_id: event.external_id ?? "",
            first_name: event.first_name ?? "",
            last_name: event.last_name ?? "",
            username: event.username ?? "",
            image_url: event.image_url,
            primary_email_address_id: event.email_addresses[0].email_address ?? "",
            created_at: event.created_at,
            last_sign_in_at: event.last_sign_in_at,
            updated_at: event.updated_at,
        };

        const [user] = await db.insert(users).values(userNormalized).returning();

        const emailAddresses = event.email_addresses.map(emailAddress => ({
            id: emailAddress.id,
            user_id: user.id,
            email_address: emailAddress.email_address,
        }));

        emailAddresses.forEach(async emailAddress => {
            await db.insert(email_addresses).values(emailAddress);
        });

        const userPrivilegeRole = { user_id: user.id, role: Role.USER };
        await db.insert(privilege_roles).values(userPrivilegeRole);

        return {
            status: "OK"
        };
    },

    update: async (id: string, event: UserJSON): Promise<UserResponse> => {
        const userNormalized = {
            id: event.id,
            external_id: event.external_id ?? "",
            first_name: event.first_name ?? "",
            last_name: event.last_name ?? "",
            username: event.username ?? "",
            image_url: event.image_url,
            primary_email_address_id: event.email_addresses[0].email_address ?? "",
            created_at: event.created_at,
            last_sign_in_at: event.last_sign_in_at,
            updated_at: event.updated_at,
        };
        const [updateUser] = await db.update(users)
            .set(userNormalized)
            .where(eq(users.id, id))
            .returning();
        if (!updateUser) {
            return {
                success: false,
                message: "User not found",
            };
        }
        return {
            success: true,
            result: {
                ...updateUser,
                email_addresses: []
            },
        }
    },

    // find: async (page?: number, limit?: number): Promise<UserResponse> => {
    //     let pagination: any = undefined;
    //     let result: any[] = [];
    //     if (page && limit) {
    //         const offset = getOffset(page, limit);
    //         result = await db.select()
    //             .from(users)
    //             .orderBy(asc(users.id)) // order by is mandatory
    //             .limit(limit) // the number of rows to return
    //             .offset(offset)
    //         const total = await db.$count(users)
    //         pagination = paginatedData({ size: limit, page, count: total });
    //     } else {
    //         result = await db.select().from(users);
    //     }
    //     return {
    //         success: true,
    //         result,
    //         pagination,
    //     };
    // },

    findByEmail: async (email: string): Promise<UserResponse> => {
        const [user] = await db.select().from(users).where(eq(users.primary_email_address_id, email)).limit(1);
        if (!user) {
            return {
                success: false,
                message: "User not found",
            };
        }
        return {
            success: true,
            message: `USER IS FOUND`,
            result: {
                ...user,
                email_addresses: []
            },
        };
    },

    findOne: async (userId: string): Promise<UserResponse> => {
        const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
        if (!user) {
            return {
                success: false,
                message: "User not found",
            };
        }
        return {
            success: true,
            message: `USER IS FOUND`,
            result: {
                ...user,
                email_addresses: []
            },
        };
    },

    delete: async (userId: string): Promise<Response> => {
        await db.delete(email_addresses).where(eq(email_addresses.user_id, userId)).returning();
        await db.delete(privilege_roles).where(eq(privilege_roles.user_id, userId)).returning();
        const user = await db.delete(users).where(eq(users.id, userId)).returning();

        if (!user) {
            return {
                success: false,
                message: "User not found",
            };
        }
        return {
            success: true,
            result: "User deleted successfully",
        };
    },

    getUserRoleById: async (userId: string): Promise<Role> => {
        const [privilegeRole] = await db.select().from(privilege_roles).where(eq(privilege_roles.user_id, userId));
        return privilegeRole.role as Role;
    },
};

export default UserService;