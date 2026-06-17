import type { NextConfig } from "next";

/**
 * Static security headers applied to every route. The Content-Security-Policy is set
 * separately in `middleware.ts` because it carries a per-request nonce (so Next's own
 * inline framework scripts are allowed while injected/third-party scripts are blocked).
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Explicitly deny every powerful/tracking feature the site never uses. autoplay is left
  // alone so the YouTube embeds + muted hero/reel clips still play.
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=(), payment=(), usb=(), serial=(), bluetooth=(), hid=(), midi=(), display-capture=(), accelerometer=(), gyroscope=(), magnetometer=()",
  },
  // Defense-in-depth beyond rel=noopener — sever the browsing-context link to opened tabs.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

// Stable brand media (videos, reel posters, logos) — cache hard across visits.
const mediaCache = [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }];

const nextConfig: NextConfig = {
  // Premium = fast. Modern image formats; assets are local so no remote allowlist is needed.
  images: {
    formats: ["image/avif", "image/webp"],
    // Allowlist the quality values actually used (required from Next 16).
    qualities: [55, 60, 75],
    // Optimized variants derive from stable sources — cache them long.
    minimumCacheTTL: 31536000,
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "yt3.googleusercontent.com" },
    ],
  },
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/media/:path*", headers: mediaCache },
    ];
  },
};

export default nextConfig;
