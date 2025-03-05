# MFA - Multi-Factor Authentication Manager

A web application for service providers to manage multi-factor authentication (2FA) between service providers and clients. This app allows service providers to create accounts, manage client profiles, and generate phone numbers via the Twilio API for 2FA. Clients receive forwarded 2FA messages without needing to log in.

## Features

- **Service Provider Dashboard**: View and manage 2FA messages in a queue
- **Client Management**: Create and manage client profiles with multiple phone numbers
- **Phone Number Management**: Generate and manage Twilio phone numbers for 2FA forwarding
- **Message History**: Retain and search through message history
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: Nuxt.js 3, Vue 3, TailwindCSS, ShadCN UI components
- **API Integration**: Twilio API for phone number management and SMS forwarding
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Twilio account (for production use)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mfa.git
   cd mfa
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
mfa/
├── assets/            # Static assets and CSS
├── components/        # Vue components
│   └── ui/            # ShadCN UI components
├── layouts/           # Page layouts
├── pages/             # Application pages
├── public/            # Public static files
├── server/            # Server-side code (API routes)
├── utils/             # Utility functions
├── nuxt.config.ts     # Nuxt configuration
└── tailwind.config.ts # Tailwind CSS configuration
```

## Development

### Adding a New Page

1. Create a new `.vue` file in the `pages` directory
2. The file will automatically be added to the router based on its path

### Adding a New Component

1. Create a new `.vue` file in the `components` directory
2. Import and use the component in your pages or other components

## Deployment

The application is configured for deployment on Vercel:

1. Push your changes to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in the Vercel dashboard
4. Deploy

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Nuxt.js](https://nuxt.com/)
- [Vue.js](https://vuejs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [ShadCN-Vue](https://www.shadcn-vue.com/)
- [Twilio](https://www.twilio.com/) 