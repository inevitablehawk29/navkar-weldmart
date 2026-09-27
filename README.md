# Navkar Weldmart website

Next.js 16 site for Navkar Weldmart's steel fabrication, material supply, projects, and enquiries.

## Local development

Use Node.js 20.9 or newer. Run `npm ci`, copy `.env.example` to `.env.local`, then run `npm run dev`. Cloudflare's test Turnstile keys are used only in development when keys are omitted.

## Production configuration

Configure `RESEND_API_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, and `TURNSTILE_SECRET_KEY` before launch. The Resend sender `contact@navkarweldmart.com` must be verified in Resend. The lead recipient is `navkarweldmart@gmail.com` in `src/actions/contact.ts`. Without Resend configuration, the server returns an error and does not claim that an enquiry was delivered.

Configure `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` for rate limiting across deployment instances. Confirm the public domain and contact details in `src/content/company.ts` and `src/app/layout.tsx` before publishing.

## Checks

Run `npm run lint` and `npm run build`. After deployment, submit a real test enquiry through both the contact and footer forms, confirm receipt at the lead inbox, and check the customer confirmation. The repository cannot prove mail delivery or Cloudflare challenge success without production credentials.
