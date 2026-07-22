import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let ratelimit: Ratelimit | null = null;
let hasLoggedConfigWarning = false;
let hasLoggedRuntimeError = false;

// Initialize Upstash Ratelimit if credentials are set
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  try {
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });

    ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, "60 s"),
      analytics: true,
      prefix: "@upstash/ratelimit/navkar",
    });
  } catch (error) {
    console.error("🚨 CRITICAL: Failed to initialize Upstash Redis rate limiter:", error);
    ratelimit = null;
  }
} else {
  if (process.env.NODE_ENV === "production") {
    console.error(
      "🚨 CRITICAL SECURITY NOTICE: UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN is missing in production environment. Rate limiting is currently bypassed."
    );
  }
}

/**
 * Extracts client IP safely from standard request headers.
 */
export function getClientIp(reqHeaders: Headers): string | null {
  const forwardedFor = reqHeaders.get("x-forwarded-for");
  if (forwardedFor) {
    const ip = forwardedFor.split(",")[0].trim();
    if (ip) return ip;
  }

  const realIp = reqHeaders.get("x-real-ip");
  if (realIp && realIp.trim()) {
    return realIp.trim();
  }

  const cfIp = reqHeaders.get("cf-connecting-ip");
  if (cfIp && cfIp.trim()) {
    return cfIp.trim();
  }

  return null;
}

/**
 * Checks if the request is rate-limited.
 * Fails gracefully: if Redis is unconfigured or fails, allows request through while logging once per instance.
 */
export async function checkRateLimit(reqHeaders: Headers): Promise<boolean> {
  const ip = getClientIp(reqHeaders);

  // If IP cannot be determined, do not block globally on a single shared key
  if (!ip) {
    return false; // Not rate-limited
  }

  if (!ratelimit) {
    if (!hasLoggedConfigWarning && process.env.NODE_ENV === "development") {
      console.warn("⚠️ Rate limiting skipped in development (Upstash Redis credentials not set).");
      hasLoggedConfigWarning = true;
    }
    return false; // Graceful fallback when Upstash Redis is not configured
  }

  try {
    const { success } = await ratelimit.limit(ip);
    return !success; // Returns true if rate limited
  } catch (error) {
    if (!hasLoggedRuntimeError) {
      console.error(
        "Upstash Redis rate limit check failed (failing open to prevent service disruption):",
        error
      );
      hasLoggedRuntimeError = true;
    }
    return false; // Graceful fallback: allow request through on Redis failure
  }
}
