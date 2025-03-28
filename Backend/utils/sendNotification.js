const sendEmail = require("./sendEmail");
const sendSMS = require("./sendSMS");

const sendAlertNotification = async (email, phone, moisture) => {
  const message = `⚠️ Soil moisture is low (${moisture}). Please supply water!.`;

  if (email) await sendEmail(email, "Soil Moisture Alert", message);
  if (phone) await sendSMS(phone, message);
};

module.exports = sendAlertNotification;
