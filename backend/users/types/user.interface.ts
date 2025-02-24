export interface UserDto {
    "created_at": number;
    "external_id": string;
    "first_name": string;
    "id": string;
    "last_name": string;
    "last_sign_in_at": number | null;
    "primary_email_address_id": string | null;
    "image_url": string | null;
    "updated_at": number | null;
    "username": string;
    "email_addresses": EmailAddress[]
}


export interface User {
    "created_at": number;
    "external_id": string;
    "first_name": string;
    "id": string;
    "last_name": string;
    "last_sign_in_at": number;
    "primary_email_address_id": string;
    "image_url": string;
    "updated_at": number;
    "username": string;
}

export interface EmailAddress {
    "email_address": string;
    "id": string;
}

export interface Paginated {
    count: number;
    pageSize: number;
    totalPages: number;
    current: number;
}

export interface UserResponse {
    success: boolean;
    message?: string;
    result?: UserDto;
    pagination?: Paginated;
}

export enum Role {
    USER = "USER",
    ADMIN = "ADMIN",
}