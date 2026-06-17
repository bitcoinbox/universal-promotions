import { NextResponse, type NextRequest } from "next/server";

/**
 * Nonce-based Content-Security-Policy.
 *
 * A fresh nonce is minted per request and placed in `script-src`. Next.js reads the CSP
 * from the request headers, stamps the same nonce onto its own inline/bootstrap scripts,
 * and `'strict-dynamic'` lets those trusted scripts load the rest of the bundle — so the
 * app runs while any injected or third-party script is refused. The site ships no
 * third-party JS, so nothing else needs allowlisting. `style-src` keeps `'unsafe-inline'`
 * because Next + components write element `style` attributes (low-risk for styles).
 */
export function middleware(request: NextRequest) {
  const nonce = btoa(crypto.randomUUID());

  // Dev only: Next's HMR/source-maps use eval. Production stays strict (no unsafe-eval).
  const scriptSrc =
    process.env.NODE_ENV === "production"
      ? `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`
      : `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' 'unsafe-eval'`;

  const csp = [
    "default-src 'self'",
    scriptSrc,
    "style-src 'self' 'unsafe-inline'",
    // data: is required for the inline noise-texture SVG (globals.css .bg-noise).
    "img-src 'self' data: https://i.ytimg.com https://yt3.googleusercontent.com",
    "font-src 'self'",
    "connect-src 'self'",
    "media-src 'self'",
    "worker-src 'self' blob:",
    "manifest-src 'self'",
    "frame-src https://www.youtube-nocookie.com https://www.youtube.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  // Run on everything except static assets and image files (which need no CSP nonce).
  matcher: [
    {
      source:
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|mp4|webm|mov|woff2|woff|ttf|otf|mp3|txt|xml|webmanifest)$).*)",
    },
  ],
};
