import { prisma } from "../../../db/database";

import { UserJSON } from "@clerk/backend";
import { Role, UserResponse } from "../../../types/user.interface";
import { Response } from "../../../types/api.interface";

const UserService = {
    count: async (): Promise<number> => {
        return await prisma.user.count();
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
            created_at: new Date(event.created_at),
            last_sign_in_at: event.last_sign_in_at ? new Date(event.last_sign_in_at) : null,
            updated_at: new Date(event.updated_at),
        };

        const user = await prisma.user.create({ data: userNormalized });

        const emailAddresses = event.email_addresses.map(emailAddress => ({
            id: emailAddress.id,
            user_id: user.id,
            email_address: emailAddress.email_address,
        }));

        emailAddresses.forEach(async emailAddress => {
            await prisma.emailAddresses.create({ data: emailAddress });
        });

        const userPrivilegeRole = { user_id: user.id, role: Role.USER };
        await prisma.privilegeRole.create({ data: userPrivilegeRole });

        return {
            status: "OK"
        };
    },

    update: async (id: string, event: UserJSON): Promise<UserResponse> => {
        try {
            const userNormalized = {
                id: event.id,
                external_id: event.external_id ?? "",
                first_name: event.first_name ?? "",
                last_name: event.last_name ?? "",
                username: event.username ?? "",
                image_url: event.image_url,
                primary_email_address_id: event.email_addresses[0].email_address ?? "",
                created_at: new Date(event.created_at),
                last_sign_in_at: event.last_sign_in_at ? new Date(event.last_sign_in_at) : null,
                updated_at: new Date(event.updated_at),
            };
            const updateUser = await prisma.user.update({
                where: { id: id },
                data: userNormalized,
            });

            return {
                success: true,
                result: {
                    ...updateUser,
                    email_addresses: []
                },
            };
        } catch (error) {
            return {
                success: false,
                message: "User not found",
            };
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
        const user = await prisma.user.findFirst({
            where: {
                primary_email_address_id: email
            },
        });

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
                email_addresses: [] // Assuming you will handle email addresses separately
            },
        };
    },

    findOne: async (userId: string): Promise<UserResponse> => {
        const user = await prisma.user.findFirst({
            where: { id: userId }
        });

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
        try {
            await prisma.$transaction([
                prisma.emailAddresses.deleteMany({
                    where: { user_id: userId },
                }),
                prisma.privilegeRole.deleteMany({
                    where: { user_id: userId },
                }),
                prisma.user.delete({
                    where: { id: userId },
                }),
            ]);

            return {
                success: true,
                result: "User deleted successfully",
            };
        } catch (error) {
            // Error handling for not found user or database errors
            return {
                success: false,
                message: "User not found or delete operation failed",
            };
        }
    },

    getUserRoleById: async (userId: string): Promise<Role> => {
        const privilegeRole = await prisma.privilegeRole.findFirst({ where: { user_id: userId } });
        return privilegeRole?.role as Role;
    },
};

export default UserService;