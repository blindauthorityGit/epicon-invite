const nodemailer = require("nodemailer");
//DB STUFF
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
            host: process.env.NEXT_DEV == "true" ? "smtp.world4you.com" : "smtp.office365.com",
            port: process.env.NEXT_DEV == "true" ? 587 : 587,
            secure: false,
            auth: {
                user: process.env.NEXT_DEV == "true" ? process.env.NEXT_W4YUSER : process.env.NEXT_USER,
                pass: process.env.NEXT_DEV == "true" ? process.env.NEXT_W4YPASSWORD : process.env.NEXT_PASSWORD_EPICON,
            },
            socketTimeout: 60000, // Example: 60 seconds
        });

        // send the email
        await transporter.sendMail({
            from: process.env.NEXT_DEV == "true" ? "office@atelierbuchner.at" : "epicon.mail@epicon.pro",
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
                <table style="width: 100%; font-family: Arial, sans-serif; font-size: 16px;">
                    <tr>
                        <td style="text-align: left; width: 170px;">
                            <strong>Name:</strong>
                        </td>
                        <td>
                            ${name}
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: left; width: 170px;">
                            <strong>Email:</strong>
                        </td>
                        <td>
                            ${email}
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: left; width: 170px;">
                            <strong>Firma:</strong>
                        </td>
                        <td>
                            ${firma}
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: left; width: 170px;">
                            <strong>Anzahl Begleitpersonen:</strong>
                        </td>
                        <td>
                            ${anzahl}
                        </td>
                    </tr>
                    ${begleitung.map(
                        (e, i) => `
                        <tr>
                            <td style="text-align: left; width: 170px;">
                                Begleitperson ${i + 1}:
                            </td>
                            <td>
                                ${e}
                            </td>
                        </tr>
                    `
                    )}
                </table>
            `;

                // send the email
                await sendEmail("info@epicon.pro", `Anmeldung von ${name}`, html, email);

                // construct the confirmation email html
                const htmlConfirm = `
                  <p>Sehr geehrte/r ${name},</p>
                  <p>vielen Dank für Ihre Anmeldung für unser Event am <strong> 15.09.2023 um 18:00 Uhr im Studio67</strong>.</p>
                  <p>Wir haben Sie inkl ${anzahl} Begleitpersonen für unseren Event registriert.</p>
                  ${
                      begleitung.length > 0
                          ? `<p>Die Begleitpersonen:                   ${begleitung.map((e, i) => `<p>${e}</p>`)}
                  `
                          : ""
                  }
                  <p>Wir freuen uns auf Ihren Besuch!</p>
                  <p>Ihr Team von epicon</p>

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
