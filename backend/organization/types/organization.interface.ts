export interface OrganizationDto {
    id: string; //"org_29w9IfBrPmcpi0IeBVaKtA7R94W",
    createdBy: string; // "user_1vq84bqWzw7qmFgqSwN4CH1Wp0n",
    imageUrl: string; // "https://img.clerk.com/xxxxxx",
    name: string; // "Acme Inc",
    // object: string; // "organization",
    // "public_metadata": {},
    slug: string; // "acme-inc",
    organizationDomains: OrganizationDomainDto[];
    memberShips: OrganizationMemberShipDto[];
    updatedAt: Date | null;
    createdAt: Date | null;
}

export interface OrganizationDomainDto {
    id: string; // "orgdmn_29w9IfBrPmcpi0IeBVaKtA7R94W",
    affiliationEmailAddress: string; // "example@example.org",
    createdAt: Date | null
    enrollmentMode: string; // "automatic_invitation",
    name: string; // "example.org",
    totalPendingInvitations: number;
    totalPendingSuggestions: number;
    updatedAt: Date | null;
    verification: Verification[];
}

export interface Verification {
    id: string;
    attempts: number;
    expireAt: Date | null;
    status: string; //"verified",
    strategy: string;  //"from_affiliation_email_code"
}


export interface OrganizationMemberShipDto {
    id: string;
    publicUserDate: PublicUserData;
    role: string;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export interface PublicUserData {
    firstName: string;
    identifier: string;
    imageUrl: string;
    lastName: string;
    userId: string;
}