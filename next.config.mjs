/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["rb.gy"],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; img-src * data: blob:;",
  },
};

export default nextConfig;
