export interface BasketDto {
    id: number;
    userId: string | null; // Either has userId or GUID if client isn't signed in
    guid: string | null; //Globally Unique Identifier (GUID)
    createdAt: Date;
    updatedAt: Date;
    basketItems: BasketItem[];
}

export interface BasketItem {
    id: number;
    posterId: string;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface BasketItemCreate {
    posterId: string;
    quantity: number;
}

