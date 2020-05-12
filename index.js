const axios = require("axios");

exports.handler = async (event) => {
    const url = "https://api.sendgrid.com/v3/mail/send";

    const config = {
        headers: { Authorization: `Bearer ${process.env.SENDGRID_KEY}` }, // you will need to create the SENDGRID_KEY environment variable in the lambda function
    };

    const body = {
        personalizations: [
            {
                to: [
                    {
                        email: event.body.email,
                    },
                ],
                subject: event.body.subject,
            },
        ],
        from: {
            email: "some@email.address", // the email address you verify in SendGrid
        },
        content: [
            {
                type: "text/plain",
                value: event.body.message,
            },
        ],
    };

    try {
        await axios.post(url, body, config);

        const response = {
            statusCode: 200,
            body: JSON.stringify("Email sent"),
        };
        return response;
    } catch {
        const response = {
            statusCode: 400,
            body: JSON.stringify("Email not sent"),
        };
        return response;
    }
};
