import { PrismaClient } from "@prisma-db-products/client";

const prisma = new PrismaClient();
async function main() {
    const existingPoster = await prisma.poster.findFirst({
        where: { name: 'Starry Night' },
    });

    let poster;
    if (!existingPoster) {
        // If the poster doesn't exist, create it
        poster = await prisma.poster.create({
            data: {
                name: 'Starry Night',
                artistFullName: 'Vincent Van Gogh',
                posterImageUrl: "https://images.pexels.com/photos/1183992/pexels-photo-1183992.jpeg?auto=compress&cs=tinysrgb&w=1200",
                formatPrices: {
                    create: [
                        { format: 'A4', price: 1000 },
                        { format: 'Size_50x70_cm', price: 3000 },
                    ],
                },
            },
        });
    } else {
        poster = existingPoster;
    }

    console.log({ poster });
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    });