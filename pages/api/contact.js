const nodemailer = require("nodemailer");
//DB STUFF
import createUser from "./createUser";
import saveContactData from "./saveContactData";

const sendEmail = async (to, subject, html, email) => {
    console.log(
        process.env.NEXT_DEV,
        process.env.NEXT_PASSWORD_EPICON,
        process.env.NEXT_DEV == "true" ? process.env.NEXT_PASSWORD_EPICON : process.env.NEXT_W4YPASSWORD,
        process.env.NEXT_DEV == "true" ? process.env.NEXT_USER : process.env.NEXT_W4YUSER
    );
    try {
        // create a transporter object
        const transporter = nodemailer.createTransport({
            host: process.env.NEXT_DEV == "true" ? "smtp.gmail.com" : "smtp.world4you.com",
            port: process.env.NEXT_DEV == "true" ? 465 : 587,
            secure: false,
            auth: {
                user: process.env.NEXT_DEV == "true" ? process.env.NEXT_USER : process.env.NEXT_W4YUSER,
                pass: process.env.NEXT_DEV == "true" ? process.env.NEXT_PASSWORD_EPICON : process.env.NEXT_W4YPASSWORD,
            },
            socketTimeout: 60000, // Example: 60 seconds
        });

        // send the email
        await transporter.sendMail({
            from: process.env.NEXT_DEV == "true" ? "johabuch@gmail.com" : "office@atelierbuchner.at",
            to,
            replyTo: email,
            subject,
            html,
        });
    } catch (error) {
        console.log("Error sending email: ", error);
    }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    const { firstName, name, email, firma, anzahl, ...dynamicFields } = req.body;
    // console.log(firstName, name, email, firma, anzahl, ...dynamicFields);
    console.log(req.body);

    const begleitung = Object.keys(dynamicFields)
        .filter((key) => key.startsWith("begleitungName"))
        .map((key) => dynamicFields[key]);
    console.log(begleitung);
    if (!firstName) {
        let success = false;
        try {
            // save to DB
            // await createUser(req, res);
            const contactData = {
                name,
                email,
                firma,
                anzahl,
                begleitung,
                createdAt: new Date(), // Optionally include a timestamp
            };
            console.log("TEST: ", contactData);

            await saveContactData(contactData);
            success = true;
            console.log(success);
        } catch (error) {
            console.log("Error saving to DB: ", error);
            // Handle the error here
            // You can return an error response or perform a fallback action
            res.status(500).json({ error: "Failed to save to the database" });
        }

        if (success) {
            try {
                // construct the html message
                const html = `
                  <p><strong>Name:</strong> ${name}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Firma:<br/></strong> ${firma}</p>
                  <p><strong>Anzahl Begleitpersonen:<br/></strong> ${anzahl}</p>
                  ${begleitung.map((e, i) => `<p>${e}</p>`)}
                `;

                // send the email
                await sendEmail("johabuch@gmail.com", `Anmeldung von ${name}`, html, email);

                // construct the confirmation email html
                const htmlConfirm = `
                  <p>Sehr geehrte/r ${name}</p>
                  <p>Vielen Dank für Ihre Anmeldung für unser Event.</p>
                  <p>Wir haben Sie inkl ${anzahl} Begleitpersonen für unseren Event registriert.</p>
                  ${
                      begleitung.length > 0
                          ? `<p>Die Begleitpersonen:                   ${begleitung.map((e, i) => `<p>${e}</p>`)}
                  `
                          : null
                  }
                  <p>Wir freuen uns auf Ihren Besuch!</p>
                `;

                // send the confirmation email
                await sendEmail(email, `Anmeldebestätigung für Epicon`, htmlConfirm, email);
                console.log("Emails sent successfully");

                // return success response
                res.status(200).json(req.body);
            } catch (error) {
                console.log("Error sending email: ", error);
                // Handle the error here
                // You can return an error response or perform a fallback action
                res.status(500).json({ error: "Failed to send the email" });
            }
        }
    } else {
        // return error response
        res.status(403).json({ error: "First name is required" });
    }
};
