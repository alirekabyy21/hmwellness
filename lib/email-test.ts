import nodemailer from "nodemailer"
import { emailConfig } from "@/app/config"

/**
 * Tests the SMTP connection to verify email credentials
 * Run this with: node -r dotenv/config lib/email-test.js
 */
async function testEmailConnection() {
  console.log("Testing email connection with the following settings:")
  console.log(`Host: ${emailConfig.host}`)
  console.log(`Port: ${emailConfig.port}`)
  console.log(`Secure: ${emailConfig.secure}`)
  console.log(`User: ${emailConfig.user}`)
  console.log(`Password: ${emailConfig.password ? "Provided" : "Missing"}`)

  // Create a transporter with debug enabled
  const transporter = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    secure: emailConfig.secure,
    auth: {
      user: emailConfig.user,
      pass: emailConfig.password,
    },
    debug: true, // Enable debug logs
    logger: true, // Log to console
  })

  try {
    console.log("Verifying SMTP connection...")
    const result = await transporter.verify()
    console.log("✅ SMTP connection successful!")

    // Try sending a test email
    console.log("Sending test email...")
    const info = await transporter.sendMail({
      from: `"${emailConfig.fromName}" <${emailConfig.user}>`,
      to: emailConfig.adminEmail,
      subject: "Test Email",
      html: "<p>This is a test email to verify your SMTP configuration is working correctly.</p>",
    })

    console.log("✅ Test email sent successfully!")
    console.log("Message ID:", info.messageId)
    return true
  } catch (error) {
    console.error("❌ SMTP connection failed:", error)

    // Provide troubleshooting guidance based on error
    if (error.code === "EAUTH") {
      console.log("\nAuthentication Error: Your username or password is incorrect.")
      console.log("1. Double-check your password in the .env.local file")
      console.log("2. Verify that your Hostinger email account is active")
      console.log("3. Check if you need to enable 'Less secure apps' in your Hostinger email settings")
    } else if (error.code === "ESOCKET" || error.code === "ECONNECTION") {
      console.log("\nConnection Error: Could not connect to the SMTP server.")
      console.log("1. Verify the host and port settings")
      console.log("2. Try alternative settings:")
      console.log("   - Host: mail.hostinger.com")
      console.log("   - Port: 465 with secure: true")
      console.log("3. Check if your server or network is blocking outgoing SMTP connections")
    }

    return false
  }
}

// Run the test if this file is executed directly
if (require.main === module) {
  testEmailConnection()
    .then(() => process.exit(0))
    .catch(() => process.exit(1))
}

export { testEmailConnection }
