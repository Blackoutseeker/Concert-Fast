/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    FIREBAE_API_KEY: process.env.FIREBAE_API_KEY,
    FIREBAE_AUTH_DOMAIN: process.env.FIREBAE_AUTH_DOMAIN,
    FIREBAE_DATABASE_URL: process.env.FIREBAE_DATABASE_URL,
    FIREBAE_PROJECT_ID: process.env.FIREBAE_PROJECT_ID,
    FIREBAE_STORAGE_BUCKET: process.env.FIREBAE_STORAGE_BUCKET,
    FIREBAE_MESSAGING_SENDER_ID: process.env.FIREBAE_MESSAGING_SENDER_ID,
    FIREBAE_APP_ID: process.env.FIREBAE_APP_ID,
    FIREBAE_MEASUREMENT_ID: process.env.FIREBAE_MEASUREMENT_ID
  }
}

module.exports = nextConfig
