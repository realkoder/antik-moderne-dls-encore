import { describe, expect, test } from 'vitest'
import PosterService from './poster.service';
import { PosterCreate } from '../../../types/poster.interface';


describe('PosterService.create', () => {
    test('should create the poster successfully', async () => {
        // Arrange
        const posterCreate: PosterCreate = { title: "Death Grips", artistFullName: "MC Ride", posterImageUrl: "", formatPrices: [{ format: "100x100 cm", price: 999 }] }

        // Act
        const result = await PosterService.create(posterCreate);

        // Assert
        console.log("HEY", result);
        expect(result.success).toBe(true);
    });
});

describe('PosterService.get', () => {
    test('should update the poster title', async () => {
        // Arrange
        const posterDto = await PosterService.findOne(1);
        
        if (!posterDto?.id) throw Error("poster not found");

        // Act
        await PosterService.update(posterDto?.id, { title: "BOMBAKLAT", artistFullName: "Batman", posterImageUrl: posterDto?.posterImageUrl, formatPrices: posterDto?.formatPrices })
        const updatedPoster = await PosterService.findOne(1);

        // Assert
        expect(updatedPoster?.title).toBe("BOMBAKLAT");
        expect(updatedPoster?.artistFullName).toBe("Batman");
    });
});