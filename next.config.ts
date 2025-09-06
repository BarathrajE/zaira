/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'via.placeholder.com',
      'res.cloudinary.com',
      'images.unsplash.com', // Add this line
    ],
  },
};

module.exports = nextConfig;

