import { beforeEach, describe, expect, it, test } from 'vitest'
import PosterService from './poster.service';
import { PosterCreate } from '../../../types/poster.interface';
import { prismaProducts } from '../../../db/database';

let currentId = 0;

describe('PosterService service test', () => {

    beforeEach(async () => {
        try {
            console.log("Truncating tables...");
            await prismaProducts.$executeRaw`TRUNCATE TABLE "format_prices" CASCADE`;
            await prismaProducts.$executeRaw`TRUNCATE TABLE "posters" CASCADE`;
            await prismaProducts.$executeRaw`TRUNCATE TABLE "removed_posters" CASCADE`;
            await prismaProducts.$executeRaw`TRUNCATE TABLE "removed_format_prices" CASCADE`;
            await PosterService.create({
                title: "Initial Poster",
                artistFullName: "Initial Artist",
                posterImageUrl: "",
                formatPrices: [{ format: "100x100 cm", price: 999 }]
            });

            const postersDto = await PosterService.findAll();
            currentId = postersDto[postersDto.length-1].id;
        } catch (error) {
            console.error("Error in beforeEach setup:", error);
        }
    });

    it('should create the poster successfully', async () => {
        // Arrange
        const posterCreate: PosterCreate = { title: "Death Grips", artistFullName: "MC Ride", posterImageUrl: "", formatPrices: [{ format: "100x100 cm", price: 999 }] }

        // Act
        const result = await PosterService.create(posterCreate);

        // Assert
        expect(result.success).toBe(true);
    });

    it('should update the poster title', async () => {
        // Arrange
        const posterDto = await PosterService.findOne(currentId);
        if (!posterDto?.id) throw Error("poster not found");

        // Act
        await PosterService.update(posterDto?.id, { title: "BOMBAKLAT", artistFullName: "Batman", posterImageUrl: posterDto?.posterImageUrl, formatPrices: posterDto?.formatPrices })
        const updatedPoster = await PosterService.findOne(currentId);

        // Assert
        expect(updatedPoster?.title).toBe("BOMBAKLAT");
        expect(updatedPoster?.artistFullName).toBe("Batman");
    });

    it('should delete the poster and move it to removedPoster', async () => {

        // Arrange
        await PosterService.delete(currentId);

        // Act
        const removedPoster = await PosterService.getRemovedPoster(currentId);

        // Assert
        expect(removedPoster).toBeDefined();
        expect(removedPoster?.title).toBe("Initial Poster");
    });

    it('should delete the poster and move it to removedPoster', async () => {

        // Arrange
        await PosterService.delete(currentId);
        await PosterService.restorePoster(currentId);

        // Act
        const restoredPoster = await PosterService.findOne(currentId);

        // Assert
        expect(restoredPoster).not.toBeNull();
        expect(restoredPoster?.title).toBe("Initial Poster");
    })
});