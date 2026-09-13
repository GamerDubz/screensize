import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repoName = "20-screensize";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? `/${repoName}` : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
