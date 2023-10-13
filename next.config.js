/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@juspay-tech/hyper-js", "@juspay-tech/react-hyper-js"],
  reactStrictMode: true,
};

module.exports = nextConfig;
