const fs = require('fs');
const path = require('path');
const sendEmail = require('./SendGrid');

require('dotenv').config();

// Utility to load and fill template
const renderTemplate = (templateFile, data) => {
  let templatePath = path.join(__dirname, 'templates', templateFile);
  let html = fs.readFileSync(templatePath, 'utf8');

  Object.entries(data).forEach(([key, value]) => {
    html = html.replace(new RegExp(`{{${key}}}`, 'g'), value);
  });

  return html;
};

// 📤 Confirmation email to registrant
const sendConfirmation = async ({ name, email, country, format }) => {
  const html = renderTemplate('confirmation.html', { name, country, format });
  return sendEmail(email, 'Thanks for registering!', html);
};

// 📤 Notification email to the organizer
const sendNotification = async ({ name, email, country, format }) => {
  const html = renderTemplate('notification.html', { name, email, country, format });
  const organizerEmail = process.env.ORGANIZER_EMAIL;
  return sendEmail(organizerEmail, 'New registration received', html);
};

module.exports = {
  sendConfirmation,
  sendNotification,
};