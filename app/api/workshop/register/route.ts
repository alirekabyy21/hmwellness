import { type NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// --- Configuration ---
const EMAIL_CONFIG = {
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  user: "hagar@hmwellness.site",
  password: process.env.EMAIL_SERVER_PASSWORD || "",
  fromName: "HM Wellness",
  adminEmail: "hagar@hmwellness.site",
};

// --- Utilities ---
async function sendEmail(to: string, subject: string, html: string): Promise<{ success: boolean; message: string }> {
  if (!EMAIL_CONFIG.password) {
    console.error("❌ EMAIL_SERVER_PASSWORD not set.");
    return { success: false, message: "Email password is missing." };
  }

  const transporter = nodemailer.createTransport({
    host: EMAIL_CONFIG.host,
    port: EMAIL_CONFIG.port,
    secure: EMAIL_CONFIG.secure,
    auth: {
      user: EMAIL_CONFIG.user,
      pass: EMAIL_CONFIG.password,
    },
    tls: { rejectUnauthorized: false },
  });

  try {
    await transporter.verify();
    console.log("✅ SMTP connection verified.");

    const info = await transporter.sendMail({
      from: `"${EMAIL_CONFIG.fromName}" <${EMAIL_CONFIG.user}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent:", info.messageId);
    return { success: true, message: "Email sent successfully." };
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    return {
      success: false,
      message: `Failed to send email: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

function renderConfirmationEmail(name: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #8e44ad, #9b59b6); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: white; padding: 30px; border: 1px solid #e0e0e0; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 8px 8px; }
        .highlight, .contact { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .contact { background: #fff3cd; }
        h1 { font-size: 24px; margin: 0; }
        h2 { color: #8e44ad; }
        ul { padding-left: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header"><h1>🎉 Workshop Registration Confirmed!</h1></div>
        <div class="content">
          <p>Hello <strong>${name}</strong>,</p>
          <p>Thank you for registering for our <strong>Transformative Coaching Workshop</strong>! We're excited to have you.</p>

          <div class="highlight">
            <h2>📅 Workshop Details</h2>
            <ul>
              <li><strong>Date:</strong> Saturday, June 21st, 2025</li>
              <li><strong>Time:</strong> 7:00 PM - 9:00 PM</li>
              <li><strong>Location:</strong> Espaces - New Cairo, 5th Settlement</li>
              <li><strong>Group Size:</strong> Max 20 participants</li>
              <li><strong>Price:</strong> 500 EGP</li>
            </ul>
          </div>

          <h2>📋 What’s Next?</h2>
          <ul>
            <li>We'll contact you via WhatsApp within 24 hours</li>
            <li>Payment details will be sent via WhatsApp</li>
            <li>After payment, you'll receive full workshop details</li>
            <li><a href="https://maps.app.goo.gl/2TYzBAH6LUoFbWwo6?g_st=com.google.maps.preview.copy" target="_blank">Location on Google Maps</a></li>
          </ul>

          <div class="contact">
            <h2>💬 Questions?</h2>
            <p>Contact us:</p>
            <ul>
              <li><strong>WhatsApp:</strong> +20 1090250475</li>
              <li><strong>Email:</strong> hagar@hmwellness.site</li>
            </ul>
          </div>

          <p>Looking forward to seeing you at the workshop!</p>
          <p>Warm regards,<br><strong>Hagar Moharam</strong><br>HM Wellness</p>
        </div>
        <div class="footer">© ${new Date().getFullYear()} HM Wellness | hmwellness.site</div>
      </div>
    </body>
    </html>
  `;
}

function renderAdminEmail({
  name,
  email,
  phone,
  whatsapp,
  expectations,
}: {
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  expectations?: string;
}): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: auto; padding: 20px; }
        .header { background: #8e44ad; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: white; padding: 20px; border: 1px solid #e0e0e0; }
        .footer { background: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 8px 8px; }
        .participant-info { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .label { font-weight: bold; color: #8e44ad; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header"><h1>🆕 New Workshop Registration</h1></div>
        <div class="content">
          <p>A new participant has registered for the workshop:</p>
          <div class="participant-info">
            <p><span class="label">Name:</span> ${name}</p>
            <p><span class="label">Email:</span> ${email}</p>
            <p><span class="label">Phone:</span> ${phone}</p>
            <p><span class="label">WhatsApp:</span> ${whatsapp}</p>
            ${expectations ? `<p><span class="label">Expectations:</span><br>${expectations}</p>` : ""}
          </div>
          <p>📌 Next step: contact the participant via WhatsApp for payment.</p>
          <p>✅ Participant has received confirmation email.</p>
        </div>
        <div class="footer">© ${new Date().getFullYear()} HM Wellness | Admin Notification</div>
      </div>
    </body>
    </html>
  `;
}

// --- POST Handler ---
export async function POST(request: NextRequest) {
  console.log("🚀 Incoming workshop registration");

  let data;
  try {
    data = await request.json();
  } catch (err) {
    console.error("❌ Invalid JSON format:", err);
    return NextResponse.json({ success: false, message: "Invalid request body." }, { status: 400 });
  }

  const { name, email, phone, whatsapp, expectations } = data;
  if (!name || !email || !phone || !whatsapp) {
    return NextResponse.json({ success: false, message: "Missing required fields." }, { status: 400 });
  }

  try {
    // Participant email
    const confirmation = await sendEmail(
      email,
      "Workshop Registration Confirmed - HM Wellness",
      renderConfirmationEmail(name)
    );
    if (!confirmation.success) throw new Error(confirmation.message);

    // Admin notification
    await sendEmail(
      EMAIL_CONFIG.adminEmail,
      `New Workshop Registration: ${name}`,
      renderAdminEmail({ name, email, phone, whatsapp, expectations })
    );

    return NextResponse.json({
      success: true,
      message: "Registration successful. Confirmation email sent.",
    });
  } catch (error) {
    console.error("💥 Error during registration:", error);
    return NextResponse.json(
      { success: false, message: "Registration failed.", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
