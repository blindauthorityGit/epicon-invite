import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    try {
        const entries = await prisma.entry.findMany();
        console.log(entries);
        res.status(200).json(entries);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve entries" });
    }
}
