import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

export const updateOrganizationFeature = async (req, res) => {
    try {
        const { id } = req.params;
        const { enabled } = req.body;
        const organizationFeature = await prisma.organizationFeature.update({
            where: {
                id: Number(id),
            },
            data: {
                enabled,
            },
        });
        res.status(200).json({
            message: "Feature updated successfully",
            organizationFeature,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};