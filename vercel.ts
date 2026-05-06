import { routes, type VercelConfig } from "@vercel/config/v1";

export const config: VercelConfig = {
  framework: "nextjs",
  buildCommand: "next build",
  devCommand: "next dev",
  regions: ["gru1"],
  functions: {
    "app/**": {
      runtime: "nodejs24.x",
      memory: 1024,
    },
  },
  headers: [
    routes.cacheControl("/images/(.*)", {
      public: true,
      maxAge: "30 days",
      immutable: true,
    }),
    routes.cacheControl("/_next/static/(.*)", {
      public: true,
      maxAge: "1 year",
      immutable: true,
    }),
  ],
};

export default config;
