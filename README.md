# HM Wellness Website

This is the official website for HM Wellness, featuring a booking system for 60-minute online coaching sessions.

## Setup Instructions

### Email Configuration

To set up email functionality:

1. Open `app/config.ts`
2. Find the `emailConfig` section
3. Update with your Hostinger email credentials:

\`\`\`typescript
export const emailConfig = {
  service: "hostinger",
  host: "smtp.hostinger.com",
  port: 465,
  secure: false,
  user: "hagar@hmwellness.co",
  password: "your-email-password", // Replace with your actual password
  // ...
}
\`\`\`

**Important:** Never commit your email password to version control. For production, use environment variables.

### Google Calendar Integration

To set up Google Calendar integration:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable the Google Calendar API
4. Create OAuth 2.0 credentials:
   - Set up the OAuth consent screen
   - Create OAuth client ID (Web application)
   - Add authorized redirect URIs (e.g., https://yourwebsite.com/api/auth/callback/google)
5. Set up the following environment variables:
   \`\`\`
   GOOGLE_CLIENT_ID=your-client-id
   GOOGLE_CLIENT_SECRET=your-client-secret
   GOOGLE_REDIRECT_URI=https://your-domain.com/api/auth/callback/google
   \`\`\`
6. Log in to the admin dashboard at `/admin`
7. Go to the Calendar section
8. Click "Connect Google Calendar" and follow the authorization process
9. After authorization, copy the refresh token from the console logs
10. Add the refresh token to your environment variables:
    \`\`\`
    GOOGLE_REFRESH_TOKEN=your-refresh-token
    \`\`\`
11. Restart your application

Once set up, the booking system will:
- Check Google Calendar for availability when selecting dates
- Create calendar events for new bookings
- Generate Google Meet links for online sessions
- Send calendar invitations to clients

### Payment Setup

The website is currently set up for manual payments via Vodafone Cash. When you're ready to add a payment link:

1. Open `app/config.ts`
2. Find the `paymentConfig` section
3. Update the `paymentLink` field with your payment gateway link

\`\`\`typescript
export const paymentConfig = {
  manualPayment: {
    // ...
    paymentLink: "https://your-payment-gateway-link.com",
  },
  // ...
}
\`\`\`

## Content Management

All website content is stored in the `app/config.ts` file. You can easily update:

- Site information (name, contact details, etc.)
- Home page content
- About page content
- Services page content
- Workshops page content
- Booking page content
- Legal pages content
- Colors and styling

## Admin Dashboard

Access the admin dashboard at `/admin` with:

- Username: admin
- Password: password

**Important:** Change the default password in `app/config.ts` before going live.

## Booking System

The booking system works as follows:

1. User selects date, time, and client type
2. User enters their contact information
3. User submits the booking request
4. User receives booking details with payment instructions
5. User makes payment and sends proof via WhatsApp or email
6. Admin manually confirms the booking
7. User receives confirmation email with Zoom meeting details

## Deployment

To deploy this website:

1. Push to a Git repository
2. Connect to Vercel, Netlify, or your preferred hosting provider
3. Set up environment variables for sensitive information
4. Deploy!

## Support

If you need assistance with the website, please contact the developer.
