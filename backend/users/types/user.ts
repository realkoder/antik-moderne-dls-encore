
export interface User {
    "created_at": number;
    "email_addresses": [
        {
            "email_address": string;
            "id": string;
        }
    ],
    "external_id": string;
    "first_name": string;
    "gender": string;
    "id": string;
    "last_name": string;
    "last_sign_in_at": number;
    "primary_email_address_id": string;
    "image_url": string;
    "updated_at": number;
    "username": string;
    "event_attributes": {
        "http_request": {
            "client_ip": string;
            "user_agent": string;
        }
    },
    "timestamp": number;
    "type": "user.created" | "user.deleted" | "user.updated";
}