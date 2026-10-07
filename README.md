# Ridons landing page

Marketing site for Ridons, built with Next.js (App Router) and CSS Modules.

## Run locally

```bash
npm install
cp .env.example .env.local   # then paste the Web3Forms access key
npm run dev
```

Open http://localhost:3000.

## Environment variables

| Name | Purpose |
| --- | --- |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Web3Forms access key. The contact form delivers to ridonsrw@gmail.com. |

## Where things live

- `app/page.tsx` – page layout (sections in order)
- `components/` – one component per section, plus the contact form (`contact/`), "Coming soon" pop-up (`comingSoon/`), phone mockups (`phone/`) and scroll animations (`motion/`)
- `lib/` – contact form rules and Web3Forms sending
- `public/images/` – images exported from Figma
