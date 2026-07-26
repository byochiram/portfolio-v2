import type { NextConfig } from "next";

// The prerendered HTML carries inline scripts and style attributes, and a nonce
// would need middleware, which would opt the page out of static generation — so
// 'unsafe-inline' stays. Fonts are self-hosted by next/font, so no Google hosts
// are needed. worker-src covers the service workers in the bundled games, and
// data:/blob: cover their canvas work. X-XSS-Protection was dropped: the XSS
// Auditor is gone from Chrome and Edge and introduced its own leaks where it
// survives.
// React needs eval() in development for callstack reconstruction and refuses to
// start without it; it never uses eval() in a production build. So the relaxation
// is scoped to `next dev` only — the deployed policy stays strict.
const dev = process.env.NODE_ENV !== "production";

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "media-src 'self'",
  "worker-src 'self'",
  "connect-src 'self'",
  "manifest-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  // optimizeCss (critters) was caching stale CSS during `next dev`; disabled for a reliable dev loop.
  images: {
    // No remotePatterns on purpose. Every image is local now, and an allowed
    // remote host is the exact configuration the Image Optimizer DoS advisory
    // (GHSA-9g9p-9gw9-jx7f) needs, so the whole remote-fetch surface is gone.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Content-Security-Policy", value: csp },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
