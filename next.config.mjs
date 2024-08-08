/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: "export",
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn-icons-png.flaticon.com",
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "c5.patreon.com",
            },
        ],
    },
};

export default nextConfig;
