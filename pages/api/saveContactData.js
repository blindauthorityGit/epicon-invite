import { db } from "../../config/firebase"; // Replace with the correct path to your firebase.js file
import { addDoc, collection } from "firebase/firestore/lite"; // Import the 'collection' function

export default async function saveContactData(data) {
    try {
        const collectionRef = collection(db, "anmeldungen"); // Replace 'contacts' with the name of your collection in Firestore
        console.log(data);
        // Add a new document with the data
        await addDoc(collectionRef, data);

        // Return success or any other relevant response
        console.log("CONTACT SAVED");

        return { success: true, message: "Contact data saved successfully" };
    } catch (error) {
        // Return error response if there's an error
        console.log("ERROR", error);

        return { success: false, message: "Failed to save contact data", error: error.message };
    }
}
