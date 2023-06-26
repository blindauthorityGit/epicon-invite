const nodemailer = require("nodemailer");

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

        console.log("Email sent successfully");
    } catch (error) {
        console.log("Error sending email: ", error);
    }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    const { firstName, name, email, firma, anzahl } = req.body;

    if (!firstName) {
        // construct the html message
        const html = `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Firma:<br/></strong> ${firma}</p>
            <p><strong>Anzahl Begleitpersonen:<br/></strong> ${anzahl}</p>
        `;
        const htmlConfirm = `
            <p>Sehr geehrte/r ${name}</p>
            <p><Vielen Dank für Ihre Anmeldung für unser Event.</p>
            <p>Wir haben Sie inkl ${anzahl} Begleitpersonen für unseren Event registriert.</p>
            <p>Wir freuen uns auf Ihren Besuch!</p>
        `;

        // send the email
        await sendEmail("johabuch@gmail.com", `Anmeldung von ${name}`, html, email);
        await sendEmail(email, `Anmeldebestätigung für Epicon`, htmlConfirm, email);

        // return success response
        res.status(200).json(req.body);
    } else {
        // return error response
        res.status(403).json({ error: "First name is required" });
    }
};
