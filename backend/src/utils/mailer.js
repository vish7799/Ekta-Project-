const nodemailer = require('nodemailer');
const config = require('../config/env');

const isResendConfigured = Boolean(config.mail.resendApiKey && config.mail.from);
const isConfigured = Boolean(config.mail.host && config.mail.user && config.mail.password && config.mail.from);
const transporter = isConfigured
  ? nodemailer.createTransport({
      host: config.mail.host,
      port: config.mail.port,
      secure: config.mail.secure,
      auth: {
        user: config.mail.user,
        pass: config.mail.password,
      },
    })
  : null;

const sendMail = async (message) => {
  if (isResendConfigured) {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.mail.resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: config.mail.from,
        to: message.to,
        reply_to: message.replyTo,
        subject: message.subject,
        text: message.text,
      }),
    });

    if (!response.ok) {
      const responseBody = await response.text();
      throw new Error(`Resend delivery failed (${response.status}): ${responseBody.slice(0, 300)}`);
    }

    return;
  }

  if (!transporter) {
    const error = new Error('Email delivery is not configured; set RESEND_API_KEY or SMTP credentials.');
    if (config.env === 'development') console.warn(`[Mailer] ${error.message}`);
    throw error;
  }

  await transporter.sendMail({
    from: config.mail.from,
    ...message,
  });
};

const sendEnquiryNotifications = async (enquiry) => {
  const details = [
    `Name: ${enquiry.fullName}`,
    `Email: ${enquiry.email}`,
    `Phone: ${enquiry.phone}`,
    `Company: ${enquiry.companyName || 'Individual'}`,
    `Service: ${enquiry.serviceRequested || 'Not specified'}`,
    `Subject: ${enquiry.subject}`,
    '',
    enquiry.message,
  ].join('\n');

  try {
    await sendMail({
      to: config.mail.companyRecipient,
      replyTo: enquiry.email,
      subject: `New enquiry: ${enquiry.subject}`,
      text: details,
    });

    if (config.mail.sendCustomerAcknowledgement) {
      await sendMail({
        to: enquiry.email,
        subject: 'We received your EKTA ELECTRICAL WORKS enquiry',
        text: `Hello ${enquiry.fullName},\n\nThank you for contacting EKTA ELECTRICAL WORKS. Our engineering team will review your enquiry and contact you shortly.\n\nReference: ${enquiry._id}\n\nRegards,\nEKTA ELECTRICAL WORKS`,
      });
    }
  } catch (error) {
    console.error('[Mailer] Enquiry notification failed:', error.message);
    throw error;
  }
};

module.exports = { sendEnquiryNotifications };
