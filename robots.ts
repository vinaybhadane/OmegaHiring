import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  // Replace with your actual domain
  const baseUrl = 'https://yourwebsite.com' 

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/dashboard',   // Prevents indexing of the application form
        '/profile',     // Protects private user profile data
        '/success',     // Keeps registration IDs and success messages private
        '/api/',        // Protects backend API routes
        '/_next/',      // Blocks internal Next.js build files
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}