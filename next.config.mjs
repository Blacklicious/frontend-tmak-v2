/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n: {
      locales: ['en', 'fr', 'zh', 'ar', 'es', 'ru', 'pt', 'ja', 'hi', 'de'], // Supported locales
      defaultLocale: 'en', // Default locale
    },
    images: {
      domains: ['storage.googleapis.com'],
    },
  };
  
export default nextConfig;