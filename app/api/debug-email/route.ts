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

  // Test 1: Basic configuration check
  debugInfo.tests.push({
    name: "Configuration Check",
    status: emailConfig.user && emailConfig.password ? "PASS" : "FAIL",
    details: {
      hasUser: !!emailConfig.user,
      hasPassword: !!emailConfig.password,
      envPasswordSet: !!process.env.EMAIL_PASSWORD,
    },
  });

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

  for (const config of hostingerCo
