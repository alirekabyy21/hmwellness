import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { emailConfig } from "@/app/config"

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
  }

  // Test 1: Basic configuration check
  debugInfo.tests.push({
    name: "Configuration Check",
    status: emailConfig.user && emailConfig.password ? "PASS" : "FAIL",
    details: {
      hasUser: !!emailConfig.user,
      hasPassword: !!emailConfig.password,
      envPasswordSet: !!process.env.EMAIL_PASSWORD,
    },
  })

  // Test 2: Try Hostinger SMTP settings
  const hostingerConfigs = [
    {
      name: "Hostinger Primary",
      host: "smtp.hostinger.com",
      port: 587,
      secure: false,
    },
    {
      name: "Hostinger Alternative 1",
      host: "mail.hostinger.com",
      port: 587,
      secure: false,
    },
    {
      name: "Hostinger Alternative 2",
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
    },
    {
      name: "Hostinger Alternative 3",
      host: "mail.hostinger.com",
      port: 465,
      secure: true,
    },
  ]

  for (const config of hostingerConfigs) {
    try {
      const transporter = nodemailer.createTransporter({
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
      })

      const startTime = Date.now()
      await transporter.verify()
      const endTime = Date.now()

      debugInfo.tests.push({
        name: config.name,
        status: "PASS",
        details: {
          host: config.host,
          port: config.port,
          secure: config.secure,
          responseTime: `${endTime - startTime}ms`,
        },
      })

      // If this config works, try sending a test email
      try {
        const info = await transporter.sendMail({
          from: `"${emailConfig.fromName}" <${emailConfig.user}>`,
          to: emailConfig.adminEmail,
          subject: `Test Email - ${config.name}`,
          html: `
            <h2>Email Test Successful!</h2>
            <p>This email was sent using: ${config.name}</p>
            <p>Configuration:</p>
            <ul>
              <li>Host: ${config.host}</li>
              <li>Port: ${config.port}</li>
              <li>Secure: ${config.secure}</li>
            </ul>
            <p>Sent at: ${new Date().toISOString()}</p>
          `,
        })

        debugInfo.tests.push({
          name: `${config.name} - Send Test`,
          status: "PASS",
          details: {
            messageId: info.messageId,
            response: info.response,
          },
        })

        break // Stop testing if we found a working configuration
      } catch (sendError) {
        debugInfo.tests.push({
          name: `${config.name} - Send Test`,
          status: "FAIL",
          details: {
            error: sendError.message,
            code: sendError.code,
          },
        })
      }
    } catch (error) {
      debugInfo.tests.push({
        name: config.name,
        status: "FAIL",
        details: {
          host: config.host,
          port: config.port,
          secure: config.secure,
          error: error.message,
          code: error.code,
        },
      })
      debugInfo.errors.push({
        config: config.name,
        error: error.message,
        code: error.code,
      })
    }
  }

  return NextResponse.json(debugInfo, { status: 200 })
}
