require("dotenv").config();

const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendSMS = async (to, message) => {
  try {
    const response = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    });

    console.log("SMS sent:", response.sid);
    // return response;
  } catch (error) {
    console.error("Error while sending SMS", error);
    throw error;
  }
};

module.exports = sendSMS;
