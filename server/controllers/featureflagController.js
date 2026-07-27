import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

export const createFeatureFlag = async (req, res) => {
    try {
        const { name } = req.body;
        const featureFlag = await prisma.featureFlag.create({
            data: {
                name
            }
        });
        const organizations = await prisma.organization.findMany();
        await prisma.organizationFeature.createMany({
            data: organizations.map((organization) => ({
                organizationId: organization.id,
                featureId: featureFlag.id,
                enabled: false,
            })),
        });
        res.status(201).json(featureFlag);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

export const getFeatureFlags = async (req, res) => {
    try {
        const featureFlags = await prisma.featureFlag.findMany({
            include: {
                organizationFeatures: {
                    include: {
                        organization: true,
                    }
                }
            }
        });
        res.json(featureFlags);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });  
    }
};

export const getFeatureFlagById = async (req, res) => {
    try {
        const { id } = req.params;
        const featureFlag = await prisma.featureFlag.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                organization: true
            }
        });
        
        if (!featureFlag) {
            return res.status(404).json({
                message: "Feature Flag not found"
            });
        } 
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

export const updateFeatureFlag = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const featureFlag = await prisma.featureFlag.update({
            where: {
                id: Number(id)
            },
            data: {
                name
            }
        });
        res.status(200).json({
            message: "Feature flag updated successfully",
            featureFlag,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteFeatureFlag = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.organizationFeature.deleteMany({
            where: {
                featureId: Number(id),
            },
        });
        await prisma.featureFlag.delete({
            where: {
                id: Number(id),
            },
        });
        res.status(200).json({
            message: "Feature flag deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};