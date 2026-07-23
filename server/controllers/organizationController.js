import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

export const createOrganization = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({
                message: "Organization name is required",
            });
        }

        const organization = await prisma.organization.create({
            data: {
                name
            }
        });

        res.status(201).json({
            message: "Organization created successfully",
            organization
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export const getOrganizations = async (req, res) => {
    try {
        const organizations = await prisma.organization.findMany({
            orderBy:{
                createdAt: "desc"
            }
        });

        res.status(200).json(organizations);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export const getOrganizationById = async (req, res) => {
    try {

        const { id } = req.params;

        const organization = await prisma.organization.findUnique({
            where:{
                id: Number(id)
            }
        });

        if (!organization){
            return res.status(400).json({
                message: "Organization not found"
            })
        }

        res.status(200).json(organization);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export const updateOrganization = async (req, res) => {
    try {

        const { id } = req.params;
        const { name } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({
                message: "Organization name is required",
            });
        }

        const existingorganization = await prisma.organization.findUnique({
            where:{
                id: Number(id)
            }
        });

        if (!existingorganization){
            return res.status(400).json({
                message: "Organization not found"
            })
        }

        const organization = await prisma.organization.update({
            where: {
                id: Number(id)
            },
            data: {
                name
            }
        });

        res.status(200).json({
            message: "Organization updated sucessfully",
            organization
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export const deleteOrganization = async (req, res) => {
    try {

        const { id } = req.params;

        const existingorganization = await prisma.organization.findUnique({
            where:{
                id: Number(id)
            }
        });

        if (!existingorganization){
            return res.status(400).json({
                message: "Organization not found"
            })
        }

        const organization = await prisma.organization.delete({
            where:{
                id: Number(id)
            }
        });

        res.status(200).json({
            message: "Organization deleted successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};