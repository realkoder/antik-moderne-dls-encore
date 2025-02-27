import { api, APIError } from "encore.dev/api";
import { PosterCreate, PosterDto } from "../../../types/poster.interface";
import PosterService from "../service/poster.service";

export const getPosters = api<{}, { posters: PosterDto[] }>(
    { auth: false, expose: true, method: "GET", path: "/posters" },
    async (): Promise<{ posters: PosterDto[] }> => {
        const posters = await PosterService.findAll();

        return { posters };
    }
);

export const createPoster = api<{ posterCreate: PosterCreate }, { posters: PosterDto[] }>(
    { auth: false, expose: true, method: "POST", path: "/posters" },
    async ({ posterCreate }: { posterCreate: PosterCreate }): Promise<{ posters: PosterDto[] }> => {
        await PosterService.create(posterCreate);
        const posters = await PosterService.findAll();

        return { posters };
    }
);