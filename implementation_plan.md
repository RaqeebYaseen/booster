# Boost Can — Token Launch Website

A Next.js website for the **$BOOST** token on Solana (pump.fun), featuring a premium metallic/chrome aesthetic with animated can showcase, token info sections, and a Firebase-powered admin panel.

## Design Direction

| Aspect | Details |
|--------|---------|
| **Theme** | Cool metallic grey-white, chrome accents, glassmorphism |
| **Typography** | Inter + Outfit (Google Fonts) — clean, modern |
| **Colors** | `#0D0D0D` dark bg, `#F5F5F7` light text, `#C0C0C0` silver accents, subtle colored glows from cans |
| **Effects** | CSS `@keyframes` infinite scroll for cans, smooth fade-in on scroll, metallic gradients, glassmorphic cards |
| **Mascot** | Muscular owl (from provided icon) |

## User Review Required

> [!IMPORTANT]
> **Firebase credentials**: You mentioned Firebase credentials but did not paste them. I'll use placeholder env vars — you'll need to supply the real values in `.env.local` before deploying.

> [!IMPORTANT]
> **pump.fun link**: I'll use a placeholder `https://pump.fun/YOUR_TOKEN_ADDRESS` — please provide the real contract address / link so I can hardcode it into the Buy button.

---

## Proposed Changes

### Project Scaffold

#### [NEW] Next.js App (App Router)

Initialize via `npx -y create-next-app@latest ./` with TypeScript, ESLint, App Router, and `src/` directory.

---

### Firebase

#### [NEW] [firebase.ts](file:///d:/mine/TALHA/booster/src/lib/firebase.ts)
- Firebase app initialization from env vars
- Firestore & Remote Config exports

#### [NEW] [.env.local](file:///d:/mine/TALHA/booster/.env.local)
- Placeholder Firebase config keys (user fills in real values)

---

### Design System & Layout

#### [NEW] [globals.css](file:///d:/mine/TALHA/booster/src/app/globals.css)
- CSS custom properties for the metallic palette
- Glassmorphism utility classes
- Can carousel infinite scroll `@keyframes`
- Responsive breakpoints
- Smooth scroll behavior

#### [NEW] [layout.tsx](file:///d:/mine/TALHA/booster/src/app/layout.tsx)
- Root layout with Inter + Outfit fonts
- SEO meta tags (title: "BOOST — Fuel the Pump", description, OG tags)
- Navbar included globally

---

### Components

#### [NEW] [Navbar.tsx](file:///d:/mine/TALHA/booster/src/components/Navbar.tsx)
- Fixed top nav, glassmorphic background
- Logo (owl icon) + links: About, Stats, Roadmap, How to Buy, Community
- "Buy $BOOST" CTA button → pump.fun link

#### [NEW] [HeroSection.tsx](file:///d:/mine/TALHA/booster/src/components/HeroSection.tsx)
- Full-viewport hero
- **Infinite scrolling can carousel**: all 6 cans displayed in a horizontal strip, slightly tilted (CSS `rotate(-8deg)`), scrolling via `@keyframes` marquee, duplicated for seamless loop
- Main headline: "FUEL THE PUMP" with metallic gradient text
- Subheadline + animated "BUY NOW" button → pump.fun link
- Subtle radial glow behind cans

#### [NEW] [AboutSection.tsx](file:///d:/mine/TALHA/booster/src/components/AboutSection.tsx)
- "What is $BOOST?" story section
- Owl mascot image alongside description text
- Glassmorphic card layout

#### [NEW] [StatsSection.tsx](file:///d:/mine/TALHA/booster/src/components/StatsSection.tsx)
- Token statistics from Firestore (market cap, holders, price, 24h volume, total supply, liquidity)
- Animated number counters
- Glassmorphic stat cards in a grid

#### [NEW] [RoadmapSection.tsx](file:///d:/mine/TALHA/booster/src/components/RoadmapSection.tsx)
- 4-phase vertical timeline
- Phase 1: Launch → Phase 2: Growth → Phase 3: Expansion → Phase 4: Moon
- Each phase with glassmorphic card + icon

#### [NEW] [HowToBuySection.tsx](file:///d:/mine/TALHA/booster/src/components/HowToBuySection.tsx)
- 3-step guide: Get Phantom → Get SOL → Swap for $BOOST
- Contract address copy-to-clipboard
- Step cards with numbered badges

#### [NEW] [CommunitySection.tsx](file:///d:/mine/TALHA/booster/src/components/CommunitySection.tsx)
- Social links (Twitter/X, Telegram)
- "Join the BOOST Army" CTA
- Links configurable from admin

#### [NEW] [Footer.tsx](file:///d:/mine/TALHA/booster/src/components/Footer.tsx)
- Disclaimer text, social links, copyright

---

### Pages

#### [NEW] [page.tsx](file:///d:/mine/TALHA/booster/src/app/page.tsx)
- Assembles all sections in order: Hero → About → Stats → Roadmap → How to Buy → Community → Footer
- Fetches Firestore data server-side for stats

---

### Admin Panel

#### [NEW] [admin/page.tsx](file:///d:/mine/TALHA/booster/src/app/admin/page.tsx)
- Password login screen (password stored in Firebase Remote Config)
- Once authenticated, shows admin dashboard
- Forms to update all Firestore dynamic values:
  - Token stats (market cap, holders, price, volume, supply, liquidity)
  - Contract address
  - Social links (Twitter, Telegram)
  - pump.fun buy link
- Save button writes directly to Firestore

---

### Assets

Copy images into `public/`:
- `public/cans/` — all 6 can PNGs
- `public/icon.jpeg`, `public/icon_no_bg.png`

---

## Verification Plan

### Automated Tests
- `npm run build` — ensures the app compiles cleanly with no TypeScript or import errors

### Manual Verification
1. Run `npm run dev` and open `http://localhost:3000`
2. Verify:
   - Navbar is fixed, glassmorphic, links scroll to sections
   - Hero: cans carousel scrolls infinitely, tilted, "BUY NOW" button is visible
   - About section: owl mascot + description text
   - Stats section: shows placeholder values (or real values from Firestore)
   - Roadmap: 4 phases displayed
   - How to Buy: 3 steps + CA copy button
   - Community: social links
   - Footer: disclaimer + links
3. Navigate to `/admin` — verify password prompt appears
4. Enter correct password → verify dashboard loads with editable fields
5. Update a value and verify it reflects on the homepage on refresh
