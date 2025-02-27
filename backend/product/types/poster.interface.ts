export type Format = "A4" | "30X30 cm" | "30X40 cm" | "50x50" | "50x70 cm" | "70x70 cm" | "70x100 cm" | "100x100 cm" | "100x140 cm";

export interface FormatPrice {
    id: number;
    format: Format;
    price: number
}

export interface PosterDto {
    id: number;
    name: string;
    artistFullName: string;
    posterImageUrl: string;
    formatPrices: FormatPrice[];
    createdAt: Date;
    updatedAt: Date;
}

export interface PosterCreate {
    name: string;
    artistFullName: string;
    posterImageUrl: string;
    formatPrices: FormatPrice[];
}