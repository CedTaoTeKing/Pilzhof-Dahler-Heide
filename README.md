<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1gYvslly-vWHdSkQSsH-YPPQjBDfJ6PAO

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

Open [http://localhost:3000](http://localhost:3000) in your browser (or use Cursor’s Simple Browser: View → Simple Browser).

## Deploy to Vercel

1. Push the repo to GitHub and go to [vercel.com](https://vercel.com) → **Add New Project** → **Import** the repo.
2. Vercel will detect Vite; use **Build Command** `npm run build`, **Output Directory** `dist`.
3. (Optional) For the contact form to send email, add in **Project → Settings → Environment Variables**:
   - `RESEND_API_KEY` – your [Resend](https://resend.com) API key
   - `CONTACT_EMAIL` – inbox address (e.g. `info@pilzhof-dahl-heide.de`)
   - `RESEND_FROM_EMAIL` – sender address (e.g. `website@pilzhof-dahl-heide.de`; must be a verified domain in Resend)
4. Deploy. Your site will be live at `https://<project-name>.vercel.app`.

To test the full stack (frontend + contact API) locally, run `vercel dev`.
