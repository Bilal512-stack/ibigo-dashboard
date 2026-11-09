import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/users", destination: "/users/transporteurs", permanent: false },
      { source: "/operations", destination: "/operations/cargaisons", permanent: false },
      { source: "/announcements", destination: "/operations/cargaisons", permanent: false },
    ];
  },
};

export default nextConfig;
