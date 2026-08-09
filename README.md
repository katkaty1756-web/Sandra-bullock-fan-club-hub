# Sandra Bullock Fan Club Hub

This repository contains a fan-run, copyright-safe single-page site for the "Sandra Bullock Fan Club Hub".

Live site

- Netlify: https://keen-tapioca-dce9cd.netlify.app/

What this repo contains

- `index.html` — the single-file site. Submits to Formspree (form id xvkpzlnl). This is the active production flow.
- `api/send.js` — DEPRECATED: a serverless example that was added earlier but is not used. See note below.

How form submissions work

- The site posts submissions to Formspree at `https://formspree.io/f/xvkpzlnl` using a Fetch POST (Accept: application/json).
- Formspree forwards submissions to the email address configured in your Formspree project (you told me katkaty1756@gmail.com is configured).
- The site uses a honeypot (`_gotcha`) and client-side JSON handling so visitors never see Formspree-hosted UI.

How to test locally

1. Clone the repo:
   git clone https://github.com/katkaty1756-web/Sandra-bullock-fan-club-hub.git
   cd Sandra-bullock-fan-club-hub

2. Serve locally:
   python3 -m http.server 8000
   Open http://localhost:8000/index.html

3. Submit the form and confirm you receive the email at katkaty1756@gmail.com.

How to publish / Netlify notes

- The site is already live on Netlify (see Live site above). Netlify will serve the `index.html` as a static page.
- If you ever switch from Formspree to a serverless mailer, you'll need to add environment variables in Netlify (API keys) and update the form action to the function URL.

Removing Formspree branding from emails

- Visitors do not see any Formspree UI because the site handles responses client-side.
- Email footers or branding inside Formspree emails may require plan settings in your Formspree account — check your Formspree dashboard.

Files added/changed by me

- README.md (this file)
- LICENSE (MIT)
- .github/workflows/html-validate.yml (validates the HTML on pushes/PRs)
- api/send.js was replaced with a DEPRECATION NOTICE (kept for reference). If you want it removed entirely, I can open a PR to delete it.

If you want changes pushed differently

- I can open a branch + PR for any of the above changes if you prefer review before merging. Tell me a branch name and I will create one.

If you want to replace Formspree later

- I can help implement a Netlify Function (or Vercel Serverless) to send emails via SendGrid/Mailgun, and switch the form action to that endpoint.

If you need anything else, tell me which next step you'd like (remove api/send.js, add PR, or implement serverless email).