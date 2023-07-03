import saveAbmeldung from "./saveAbmeldung"; // Update the path to the saveAbmeldung function

export default async (req, res) => {
    try {
        const data = req.body; // Assuming the data object is passed in the request body
        await saveAbmeldung(data); // Call the saveAbmeldung function passing the data

        res.status(200).json({ message: "Abmeldung saved successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to save abmeldung" });
    }
};
