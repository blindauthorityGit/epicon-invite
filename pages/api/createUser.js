import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { email, name, anzahl } = req.body;

    try {
        const newUser = await prisma.user.create({
            data: {
                email,
                name,
                anzahl,
            },
        });

        console.log("User created:", newUser);

        res.status(200).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Failed to create user" });
    }
}
