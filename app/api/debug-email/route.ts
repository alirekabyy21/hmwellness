import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { emailConfig } from "@/app/config";

export async function GET() {
  const debugInfo = {
    timestamp: new Date().toISOString(),
    config: {
      host: emailConfig.host,
      port: emailConfig.port,
      secure: emailConfig.secure,
      user: emailConfig.user,
      passwordProvided: !!emailConfig.password,
      passwordLength: emailConfig.password?.length || 0,
    },
    tests: [],
    errors: [],
  };

  // Test 1: Basic configuration presence check
  debugInfo.tests.push({
    name: "Configuration Check",
    status: emailConfig.user && emailConfig.password ? "PASS" : "FAIL",
    details: {
      hasUser: !!emailConfig.user,
      hasPassword: !!emailConfig.password,
      envPasswordSet: !!process.env.EMAIL_PASSWORD,
    },
  });

  if (!emailConfig.user || !emailConfig.password) {
    debugInfo.errors.push({
      error: "Email configuration is incomplete. Missing user or password.",
    });
    return NextResponse.json(debugInfo, { status: 400 });
  }

  // Hostinger SMTP configuration variants to test
  const hostingerConfigs = [
    {
      name: "Hostinger SSL (Port 465)",
      host: "smtp.hostinger.com",
      port: 465,
      secure: true, // SSL/TLS
    },
    {
      name: "Hostinger TLS (Port 587)",
      host: "smtp.hostinger.com",
      port: 587,
      secure: false, // STARTTLS
    },
    {
      name: "Hostinger Alternative SSL",
      host: "mail.hostinger.com",
      port: 465,
      secure: true,
    },
    {
      name: "Hostinger Alternative TLS",
      host: "mail.hostinger.com",
      port: 587,
      secure: false,
    },
  ];

  for (const config of hostingerConfigs) {
    try {
      const transporter = nodemailer.createTransport({
        host: config.host,
        port: config.port,
        secure: config.secure,
        auth: {
          user: emailConfig.user,
          pass: emailConfig.password,
        },
        connectionTimeout: 10000,
        greetingTimeout: 5000,
        socketTimeout: 10000,
        tls: {
          rejectUnauthorized: false, // Set to true in production if you have valid certs
        },
      });

      const startTime = Date.now();
      await transporter.verify();
      const endTime = Date.now();

      debugInfo.tests.push({
        name: config.name,
        status: "PASS",
        details: {
          host: config.host,
          port: config.port,
          secure: config.secure,
          responseTimeMs: endTime - startTime,
        },
      });

      // Optionally, send a test email here and log success/failure:
      // Uncomment if you want to test sending as well:
      /*
      try {
        const info = await transporter.sendMail({
          from: `"${emailConfig.fromName}" <${emailConfig.user}>`,
          to: emailConfig.adminEmail,
          subject: `SMTP Test Email - ${config.name}`,
          html: `<p>This is a test email sent using configuration: ${config.name}</p>`,
        });
        debugInfo.tests.push({
          name: `${config.name} - Send Test`,
          status: "PASS",
          details: {
            messageId: info.messageId,
            response: info.response,
          },
        });
        break; // Stop after first successful config
      } catch (sendError) {
        debugInfo.tests.push({
          name: `${config.name} - Send Test`,
          status: "FAIL",
          details: {
            error: sendError.message,
            code: sendError.code,
          },
        });
      }
      */

    } catch (error: any) {
      debugInfo.tests.push({
        name: config.name,
        status: "FAIL",
        details: {
          error: error.message,
          code: error.code,
        },
      });
      debugInfo.errors.push({
        config: config.name,
        error: error.message,
        code: error.code,
      });
    }
  }

  return NextResponse.json(debugInfo, { status: 200 });
}
