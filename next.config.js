const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)?",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "false" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date" },
        ]
      },
    ]
  },
  // async headers() {
  //   return [
  //     {
  //       // matching all API routes
  //       source: "/api/:path*",
  //       headers: [
  //         { key: "Access-Control-Allow-Credentials", value: "false" },
  //         { key: "Access-Control-Allow-Origin", value: "*" },
  //         { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
  //         { key: "Access-Control-Allow-Headers", value: "Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date" },
  //       ]
  //     },
  //     {
  //       // matching all API routes
  //       source: "/categoryIcons/:path*",
  //       headers: [
  //         { key: "Access-Control-Allow-Credentials", value: "false" },
  //         { key: "Access-Control-Allow-Origin", value: "*" },
  //         { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
  //         { key: "Access-Control-Allow-Headers", value: "Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date" },
  //       ]
  //     },
  //     {
  //       // matching all API routes
  //       source: "/appIcons/:path*",
  //       headers: [
  //         { key: "Access-Control-Allow-Credentials", value: "false" },
  //         { key: "Access-Control-Allow-Origin", value: "*" },
  //         { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
  //         { key: "Access-Control-Allow-Headers", value: "Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date" },
  //       ]
  //     },
  //     {
  //       // matching all API routes
  //       source: "/icons/:path*",
  //       headers: [
  //         { key: "Access-Control-Allow-Credentials", value: "false" },
  //         { key: "Access-Control-Allow-Origin", value: "*" },
  //         { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
  //         { key: "Access-Control-Allow-Headers", value: "Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date" },
  //       ]
  //     },
  //     {
  //       // matching all API routes
  //       source: "/images/:path*",
  //       headers: [
  //         { key: "Access-Control-Allow-Credentials", value: "false" },
  //         { key: "Access-Control-Allow-Origin", value: "*" },
  //         { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
  //         { key: "Access-Control-Allow-Headers", value: "Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date" },
  //       ]
  //     },
  //   ]
  // },

  output: "standalone",
  images: {
    path: `${process.env.NEXT_PUBLIC_SITE_COUNTRY_BASE_PATH}/_next/image`,
    domains: ["*"],
    unoptimized: true,
    formats: ["image/webp"],
    minimumCacheTTL: 720,
    deviceSizes: [640, 750, 828, 1080, 1440, 1920, 2048, 3840],
  },
  eslint: {
    // We'll want to take this out once we fix the eslint errors
    ignoreDuringBuilds: false,
  },
};

// module.exports = withSentryConfig(nextTranslate(nextConfig));
module.exports = (nextConfig);
