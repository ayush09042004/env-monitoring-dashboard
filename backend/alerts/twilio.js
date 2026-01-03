const twilio = require("twilio");

const client = twilio(
    process.env.TWILIO_SID,
    process.env.TWILIO_AUTH
);

module.exports = function sendSMS(message) {
    return client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE,
        to: process.env.ALERT_PHONE
    });
};
