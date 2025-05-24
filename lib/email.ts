import nodemailer from "nodemailer";
import { emailConfig } from "@/app/config";

export interface EmailData {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(emailData: EmailData): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    console.log(`Attempting to send email using Hostinger SMTP`);
    console.log(`From: ${emailConfig.user}`);
    console.log(`To: ${emailData.to}`);
    console.log(`Subject: ${emailData.subject}`);

    if (!emailConfig.user || !emailConfig.password) {
      console.error("Hostinger email configuration is incomplete. Missing username or password.");
      return {
        success: false,
        error: "Email configuration is incomplete. Please set up your Hostinger email credentials.",
      };
    }

    const transporter = nodemailer.createTransport({
      host: emailConfig.host,
      port: emailConfig.port,
      secure: emailConfig.secure, // true for 465, false for 587
      auth: {
        user: emailConfig.user,
        pass: emailConfig.password,
      },
      tls: {
        rejectUnauthorized: false, // consider setting to true in production
      },
      connectionTimeout: 15000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });

    // Verify SMTP connection configuration
    await transporter.verify();
    console.log("Hostinger SMTP connection verified successfully");

    // Send the email
    const info = await transporter.sendMail({
      from: `"${emailConfig.fromName}" <${emailConfig.user}>`,
      to: emailData.to,
      subject: emailData.subject,
      html: emailData.html,
    });

    console.log("Email sent successfully with Hostinger, messageId:", info.messageId);

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("Error sending email with Hostinger:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
