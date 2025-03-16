import { describe, expect, it } from 'vitest'
import PosterService from './poster.service';
import { PosterCreate } from '../../../types/poster.interface';

describe('PosterService service test', () => {

    // beforeEach(async () => {
    //     try {
    //         console.log("Truncating tables...");
    //         await prismaProducts.$executeRaw`TRUNCATE TABLE "format_prices" CASCADE`;
    //         await prismaProducts.$executeRaw`TRUNCATE TABLE "posters" CASCADE`;
    //         await prismaProducts.$executeRaw`TRUNCATE TABLE "poster_descriptions" CASCADE`;
    //         await prismaProducts.$executeRaw`TRUNCATE TABLE "removed_posters" CASCADE`;
    //         await prismaProducts.$executeRaw`TRUNCATE TABLE "format_prices" CASCADE`;
    //         await prismaProducts.$executeRaw`TRUNCATE TABLE "format_price_descriptions" CASCADE`;
    //         await prismaProducts.$executeRaw`TRUNCATE TABLE "removed_format_prices" CASCADE`;
    //         await PosterService.create({
    //             title: "Initial Poster",
    //             artistFullName: "Initial Artist",
    //             posterImageUrl: "",
    //             formatPrices: [{ format: "100x100 cm", price: 999 }]
    //         });


    //         const postersDto = await PosterService.findAll();
    //         currentId = postersDto[postersDto.length - 1].id;
    //     } catch (error) {
    //         console.error("Error in beforeEach setup:", error);
    //     }
    // });

    it('should create the poster successfully', async () => {
        // Arrange
        const posterCreate: PosterCreate = { title: "Death Grips", artistFullName: "MC Ride", posterImageUrl: "", formatPrices: [{ format: "100x100 cm", price: 999 }] }

        // Act
        const result = await PosterService.create(posterCreate);
        const posters = await PosterService.findAll();

        // Assert
        expect(result.success).toBe(true);
        expect(posters.length).toBe(1);
    });

    it('should update the poster title', async () => {
        // Arrange
        const posterDto = await PosterService.findOne(1);
        if (!posterDto?.id) throw Error("poster not found");

        // Act
        await PosterService.update(posterDto?.id, { title: "BOMBAKLAT", artistFullName: "Batman", posterImageUrl: posterDto?.posterImageUrl, formatPrices: posterDto?.formatPrices })
        const all = await PosterService.findAll();

        const updatedPoster = await PosterService.findOne(posterDto.id);

        // Assert
        expect(updatedPoster?.title).toBe("BOMBAKLAT");
        expect(updatedPoster?.artistFullName).toBe("Batman");
    });

    it('should delete the poster and move it to removedPoster', async () => {

        // Arrange
        await PosterService.delete(1);

        // Act
        const removedPoster = await PosterService.getRemovedPoster(1);

        // Assert
        expect(removedPoster).toBeDefined();
        expect(removedPoster?.posterId).toBe(1);
    });
});