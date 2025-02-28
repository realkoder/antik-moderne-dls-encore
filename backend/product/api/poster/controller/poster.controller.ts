import { api, APIError } from "encore.dev/api";
import { PosterCreate, PosterDto, PosterUpdate } from "../../../types/poster.interface";
import PosterService from "../service/poster.service";
import { getAuthData } from "~encore/auth";
import { Role } from "../../../../user/types/user.interface";

export const getPosters = api<{}, { posters: PosterDto[] }>(
    { auth: false, expose: true, method: "GET", path: "/posters" },
    async (): Promise<{ posters: PosterDto[] }> => {
        const posters = await PosterService.findAll();

        return { posters };
    }
);

export const getPoster = api<{ posterId: number }, { poster: PosterDto }>(
    { auth: false, expose: true, method: "GET", path: "/posters/:posterId" },
    async ({ posterId }): Promise<{ poster: PosterDto }> => {
        const poster = await PosterService.findOne(posterId);

        if (!poster) throw APIError.internal("Error getting poster data based on ID");

        return { poster };
    }
);

// Only admin can call this
export const createPoster = api<{ posterCreate: PosterCreate }, { posters: PosterDto[] }>(
    { auth: true, expose: true, method: "POST", path: "/posters" },
    async ({ posterCreate }: { posterCreate: PosterCreate }): Promise<{ posters: PosterDto[] }> => {
        const role: Role = getAuthData().role

        console.log("UYOUOO", posterCreate);

        if (!role || role !== Role.ADMIN) throw APIError.permissionDenied("You dont have the needed ROLE for this action");

        await PosterService.create(posterCreate);
        const posters = await PosterService.findAll();

        return { posters };
    }
);

// Only admin can call this
export const updatePoster = api<{ posterId: number, posterUpdate: PosterUpdate }, { posters: PosterDto[] }>(
    { auth: true, expose: true, method: "PUT", path: "/posters/:posterId" },
    async ({ posterId, posterUpdate }: { posterId: number, posterUpdate: PosterUpdate }): Promise<{ posters: PosterDto[] }> => {
        const role: Role = getAuthData().role

        if (!role || role !== Role.ADMIN) throw APIError.permissionDenied("You dont have the needed ROLE for this action");

        await PosterService.update(posterId, posterUpdate);
        const posters = await PosterService.findAll();

        return { posters };
    }
);

// Only admin can call this
export const deletePoster = api<{ posterId: number }, { posters: PosterDto[] }>(
    { auth: true, expose: true, method: "DELETE", path: "/posters/:posterId" },
    async ({ posterId }: { posterId: number }): Promise<{ posters: PosterDto[] }> => {
        const role: Role = getAuthData().role

        if (!role || role !== Role.ADMIN) throw APIError.permissionDenied("You dont have the needed ROLE for this action");

        await PosterService.delete(posterId);
        const posters = await PosterService.findAll();

        return { posters };
    }
);