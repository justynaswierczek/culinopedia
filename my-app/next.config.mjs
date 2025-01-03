/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      formats: ["image/avif", "image/webp"],
      remotePatterns: [
        {
          protocol: "https",
          hostname: "www.themealdb.com",
          port: "",
          pathname: "/images/media/meals/**",
        },
      ],
    },
  };
  
  export default nextConfig;