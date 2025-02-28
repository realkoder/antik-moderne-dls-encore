export type Format = "A4" | "30X30 cm" | "30X40 cm" | "50x50" | "50x70 cm" | "70x70 cm" | "70x100 cm" | "100x100 cm" | "100x140 cm";

export interface FormatPriceDto {
    id: number;
    format: Format;
    price: number
}

export interface FormatPriceCreate {
    format: Format;
    price: number
}

export interface PosterDto {
    id: number;
    name: string;
    artistFullName: string;
    posterImageUrl: string;
    formatPrices: FormatPriceDto[];
    createdAt: Date;
    updatedAt: Date;
}

export interface PosterUpdate {
    name: string;
    artistFullName: string;
    posterImageUrl: string;
    formatPrices: FormatPriceDto[];
}

export interface PosterCreate {
    name: string;
    artistFullName: string;
    posterImageUrl: string;
    formatPrices: FormatPriceCreate[];
}