import { api, APIError } from "encore.dev/api";
import { PosterDto } from "../../../types/poster.interface";
import PosterService from "../service/poster.service";




export const getPosters = api<{}, { posters: PosterDto[] }>(
    { auth: false, expose: true, method: "GET", path: "/posters" },
    async (): Promise<{ posters: PosterDto[] }> => {
        const posters = await PosterService.findAll();
        
        return { posters };
    }
);