# AI website / UI builders: the landscape (2026-10-04)

How the rest of the market turns intent into a site, how each fights sameness, and what earns money. Every claim
carries a numbered source (URL + date at the bottom). Many traction figures come from secondary trackers (Sacra,
press round-ups); treat them as indicative, not audited.

## The map

| Product | Input → output | How design is decided | Against sameness | Model / price | Traction |
|---|---|---|---|---|---|
| **Framer** (AI, Wireframer, Workshop, Agents) | Prompt → responsive page on Framer's canvas, then hand-edit, publish hosted [3][4] | Wireframer is deliberately *structure, not style*: "neutral" layouts the user then styles [4]; Workshop makes components from plain English [5] | Human designers + 5,000-item template/plugin marketplace [1]; Wireframer avoids templates [4] | Per-site hosting $10 / $30 mo, AI credits extra, Agents credit pools (mid-2026) [5] | $50M ARR, $2B valuation (Aug 2025) [1][2]; creators paid $6.5M in 2025, keep 100% of template sales [6] |
| **Relume** | Brief → sitemap → wireframes → style guide → export to Figma / Webflow / React [7][8] | 1,000+ unstyled human-made components, AI picks + writes copy; Style Guide Builder sets the look [7][8] | Style layer applied last; agencies refine | Free; $32–40 / mo [7] | "1M+ users" (claimed) [7]; Library MCP for coding agents [8] |
| **Webflow AI** | Business description → homepage + starter design system; Sep 2025 "prompt-to-production" apps [9][10] | AI generates layout, colours, fonts; apps reuse the site's existing design system and React code components [10] | Builds "a unique layout from the ground up" (claim) [9] | Inside Webflow plans | Public co. scale; AI builder evolved Feb 2026 [9] |
| **Wix Harmony** (successor to ADI) | Chat + drag-and-drop; agent "Aria" edits anything [11] | AI layouts on Wix's component system; hand-editing any time [11] | Hybrid: AI draft, human finish | Freemium + plans; owns Base44 (~$100M ARR) [12] | Launched Jan 2026; aims for 50% of new sites in 5–7 yrs [12] |
| **Squarespace Blueprint** | Questions (industry, goals, tone) → site [13] | Designer-made templates whose curated content adapts to the industry; brand-personality, font-pair and palette choices [13][14] | "Finish Layer" designer-level styling and animation controls (Sep 2025) [14] | Subscription | 'Human Powered' campaign: AI to make sites *more* human [13] |
| **Lovable** | Chat → full-stack React app, hosted [15] | LLM defaults (shadcn/Tailwind); Themes tab for colour, font, radius [16] | Weak: known "purple gradient, boxy" default; advice is to bring a design first [16] | $25 / mo Pro, credits by complexity; design templates only on Business $50 [17] | ~$400M ARR Mar 2026, ~8M users Feb 2026 [15] |
| **v0** (Vercel) | Chat → Next.js / shadcn app, deploys to Vercel [18] | Anyone's **shadcn registry** passes tokens + components to the model; "Open in v0" button per component [19] | Bring-your-own design system | Free $5 credits; $30 / $100 per user [18] | 4M users (2026) [20] |
| **Bolt.new** | Prompt → full-stack app in browser; Bolt Cloud hosting [21] | Imports design systems from GitHub / npm / Storybook; Figma frame URLs → pages [22] | Bring-your-own system | $25 / mo token plans [22] | $40M ARR in ~6 months (Mar 2025); 7M users Dec 2025 [21] |
| **Replit** (Agent 4) | Prompt → app, decks, video in one workspace [23] | Visual design mode + infinite canvas, parallel agents [23] | Parallel directions | Usage-based | ~$525M annualised Apr 2026; $9B valuation [23] |
| **Same.dev / site cloners** | URL or screenshot → React copy [24] | The reference site *is* the design | None: it copies; fidelity breaks on complex pages [24] | Free at first [24] | 350k sign-ups and 7-figure ARR in 8 weeks (2025) [25] |
| **Figma Make / Sites** | Prompt or frame → interactive prototype (Make); canvas → published site (Sites) [26] | The team's Figma library + written rules + pasted frames as context; publishable Make templates [26] | Your own library | Bundled into seats; AI-credit limits from Mar 2026 [27] | — |
| **Google Stitch** (ex-Galileo) | Business goals in plain words → several design directions on an infinite canvas → code, AI Studio [28][29] | "Vibe design": many directions side by side; **DESIGN.md** file carries colours, type, layout between tools; MCP + SDK [28] | Divergence by default (parallel directions) | Free in Labs; paid tiers expected [30] | Google bought Galileo May 2025 [29] |
| **Readdy** | Chat / voice → site, publish or export code / Figma [31][32] | AI generation, credit per design (50) or edit (10) [31] | — | $20–40 / mo [31] | $5M ARR [32] |
| **Durable** | Business type + name + city → site in 30 s, plus CRM, invoicing [33] | Templates filled by AI | None; speed and bundled business tools are the pitch | $12–80 / mo [33] | 10M+ sites generated [33] |
| **10Web** | Prompt / URL → WordPress site; "Vibe for WordPress" Oct 2025 [34] | AI front-end on Elementor + WP back-end; can "recreate any website" [34] | — | Hosting + API (sold to hosts) [34] | "Millions" of sites [34] |
| **Hostinger AI / Horizons** | Prompt → site (<60 s) / web app [35][36] | Templates + AI | Price, not design | From $2.99 / mo [35] | €275M revenue 2025; Horizons 800k+ builders [36] |
| **Dora AI** | Prompt → 3D / motion site, keyframe editor [37] | AI generates animation, particles, scroll effects | **Motion** as the differentiator | ~$15–35 / mo [37] | Niche |
| **Spline** | Prompt / image → 3D scenes, embeddable [38] | Text-to-3D, AI materials; Figma and Webflow plugins [38] | Real 3D is rarely generic | $0–30 / mo, AI add-on [38] | — |
| **21st.dev Magic MCP** | `/ui pricing table` inside Cursor / Claude Code → shadcn component in your repo [39] | Community component marketplace as retrieval source [39] | Variety of hand-made community components | 5 free, then $20 / mo [40] | — |
| **shadcn registry ecosystem** | `npx shadcn add <url>` → source files in repo [41] | Any static JSON index can be a registry; hundreds exist [41] | Each registry has its own look | Free / premium registries | De-facto standard (v0, Relume, 21st all speak it) [19][8][39] |
| **Anthropic frontend-design skill / Claude Design** | Skill auto-loads for UI work in Claude Code; Claude Design (Apr 2026) → prototypes, decks, Claude Code hand-off bundle [42][43] | ~400 tokens of guidance: commit to one direction, ban Inter / Roboto, purple gradients [42][44]; Claude Design builds a design system from your code or files [43] | Names the cause: "distributional convergence" [42] | Free skill; Claude plans | 277k+ installs of the skill (claimed) [44] |
| **Variant** (YC F24) | Idea → endless scrolling feed of full UI designs → code [45] | "Brings taste to code generation": you *pick*, not prompt [45] | Volume of directions + human choice | — | — |
| **Style-from-URL tools** (Dembrandt, designlang, Aura, DesignDNA) | URL → tokens, Tailwind / shadcn theme, AI-ready markdown [46]; Aura: screenshot → page, 1,700 templates [47] | Extract computed values from a real site | Reference-driven: as distinct as the reference | Free / $20–40 / mo [47] | — |

## (a) Five distinct approaches

1. **Template + AI fill** (Squarespace, Durable, Hostinger, Wix). The look comes from a human template; AI picks it and
   writes the words. Cheap and safe, and sameness is accepted as the price [13][33][35].
2. **Structure first, style later** (Relume, Framer Wireframer). Sitemap and wireframe are generated, the look is a
   separate, last layer — a style guide or a human designer [4][7]. Agencies love it; the visual layer stays thin.
3. **Bring your own design system** (v0 registries, Bolt imports, Figma Make libraries, Webflow apps, Stitch
   DESIGN.md). The tool is neutral; distinctiveness is whatever system you feed it [19][22][26][28]. Great for teams who
   already have a brand, useless for those who don't.
4. **Many directions, human picks** (Stitch vibe design, Variant, Replit parallel agents). Fight convergence with
   volume: generate side-by-side directions and let taste be a choice, not a prompt [28][45][23].
5. **Reference / clone** (Same.dev, 10Web recreate, Aura, URL extractors). The design is borrowed from a live site.
   Fast traction [25], but legally grey and only as original as the source [24][46].

A sixth, smaller pattern: **taste-as-instructions** — Anthropic's skill and the many forks on skills marketplaces
encode anti-slop rules as text an agent reads [42][44]. OpusKit's Build Package is the richest form of this.

## (b) Where nobody is strong yet

- **Taste for people with no design system.** Pattern 3 needs a brand you already have; pattern 1 gives everyone the
  same template. Nobody turns "a café in Baku with these photos" into a *curated, checked* system (palette, type,
  motion, a big idea) that is provably unlike other users' sites. OpusKit's distinctiveness checks (ΔE, font pairing
  caps) are something none of these products publish.
- **Motion and "award" moments as a library.** Dora and Spline own 3D/motion, but as editors, not as composable,
  licence-clean pieces an agent can drop in [37][38]. Registries ship mostly static shadcn UI [41].
- **A design spec that travels.** Stitch's DESIGN.md [28] and Claude Design's hand-off bundle [43] are the first moves;
  no one owns a portable, agent-readable recipe (look + pages + effects + QA) that works in Lovable, v0, Cursor *and*
  Claude Code.
- **Visual QA after the build.** Every tool generates; none checks the built site against the intended design. OpusKit's
  visual-qa skill is rare.
- **Non-developers who want the result, not the repo.** Prompt-to-app players host for you; design-quality players
  (Relume, registries, skills) assume Figma, Webflow or a terminal.

## (c) Three ideas worth stealing

1. **Pay creators, not just users** (Framer). 100% of template revenue to creators plus 50% referral commission built a
   5,000-item catalogue and $6.5M of payouts in 2025 [1][6]. An OpusKit marketplace of recipes / pieces by real
   designers, each passing `npm run check`, would grow the library and the moat.
2. **"Open in v0" for OpusKit** (v0 + shadcn registry). Publish OpusKit's sections and pieces as a shadcn registry and
   the recipe as a DESIGN.md-style file, so one link opens a recipe inside v0, Lovable, Bolt or Claude Code [19][28][41].
   That removes the "zip + local terminal" barrier without OpusKit hosting builds.
3. **A scroll of directions instead of a form** (Variant, Stitch). Show 6–12 fully drawn site directions built from the
   user's own name and photos, let them pick and mix, then open the kit on the choice [28][45]. Picking beats
   describing for non-designers, and it is exactly where the kit's real-section previews already point.

## Sources

1. Sacra, Framer — https://sacra.com/c/framer/ (Aug 2025)
2. Pulse 2.0, Framer $100M Series D at $2B — https://pulse2.com/framer-100-million-series-d-funding-raised-at-2-billion-valuation (Aug 2025)
3. TechRadar, Framer Spring 2025 AI features — https://www.techradar.com/pro/framer-aims-to-increase-productivity-but-maintain-magic-with-new-website-building-features (2025)
4. Framer Academy, Wireframer — https://www.framer.com/academy/lessons/generating-layouts-with-ai-using-wireframer (2025)
5. Siter.io, Framer pricing (read 2026-09-03) — https://siter.io/framer-pricing (Sep 2026)
6. Framer creators page — https://framer.com/creators ; CreateWith, Dec payout $784K — https://www.createwith.com/tool/framer/updates/december-creator-payout-total-surpasses-780k (Jan 2026)
7. FlowStep, Relume pricing — https://flowstep.ai/blog/relume-pricing ; UXMagic review — https://uxmagic.ai/blog/relume-review-2026 (2026)
8. Relume, What's new — https://www.relume.io/whats-new (2025–2026)
9. Webflow, AI site builder evolved — https://webflow.com/updates/ai-site-builder-evolved (Feb 2026)
10. Webflow Conf 2025 recap — https://webflow.com/blog/webflow-conf-2025-keynote-recap (Sep 2025)
11. Wix press, Wix Harmony — https://www.wix.com/press-room/home/post/wix-launches-wix-harmony-the-ai-website-builder-that-merges-human-and-artificial-intelligence-rein (21 Jan 2026)
12. MarketBeat, Wix Q4 2025 call — https://www.marketbeat.com/instant-alerts/wixcom-q4-earnings-call-highlights-2026-03-04/ (4 Mar 2026); Techleap — https://finder.techleap.nl/news/feed/wix-launches-ai-website-builder-harmony-targets-50-of-new-sites-1 (Jan 2026)
13. Octet, Blueprint AI — https://octet.design/journal/squarespace-blueprint-ai ; AdNews, Human Powered — https://www.adnews.com.au/campaigns/squarespace-s-human-powered (2025)
14. Squarespace, Refresh 2025 — https://www.squarespace.com/press-releases/2025/9/30/squarespace-refresh-2025-built-to-stand-out-ready-to-scale (30 Sep 2025)
15. Let's Data Science, Lovable growth — https://letsdatascience.com/news/lovable-posts-explosive-revenue-and-user-growth-8c044471 ; Tech Insider — https://tech-insider.org/ie/lovable-vibe-coding-12-billion-2026/ (2026)
16. Banani, Unique UI with Lovable — https://www.banani.co/blog/lovable-ui-generation-guide ; vp0 — https://vp0.com/blogs/how-to-make-custom-ui-in-lovable (2026)
17. eesel, Lovable pricing 2026 — https://eesel.ai/blog/lovable-pricing (2026)
18. UI Bakery, v0 pricing 2026 — https://uibakery.io/blog/vercel-v0-pricing-explained-what-you-get-and-how-it-compares (Jul 2026)
19. v0 docs, Design systems — https://v0.app/docs/design-systems (2026)
20. SaaStr, v0 — https://www.saastr.com/saastr-ai-app-of-the-week-v0-by-vercel-the-vibe-coding-tool-that-4-million-people-use-to-ship-real-software-not-just-demos (2026)
21. Sacra, Bolt.new — https://sacra.com/c/bolt-new/ ; MorphLLM — https://www.morphllm.com/bolt-vibe-coding (2025–2026)
22. Jetadmin, Bolt pricing 2026 — https://www.jetadmin.io/blog/bolt-new-pricing-plans-tokens-and-real-costs-in-2026/ ; Banani — https://www.banani.co/blog/bolt-new-review (2026)
23. Sacra, Replit — https://sacra.com/research/replit ; Lago — https://getlago.com/blog/why-replits-9b-valuation-looks-cheap (Mar–Apr 2026)
24. Banani, Same.dev review — https://www.banani.co/blog/same-dev-review ; Kitemetric — https://kitemetric.com/blogs/same-dev-cloning-fails-ai-limitations-exposed (2025)
25. Z Potentials, Same interview — https://zpotentials.substack.com/p/z-potentials-exclusive-interview-32b ; YC — https://www.ycombinator.com/companies/same (2025)
26. Managed Code, Make vs Sites — https://www.managed-code.com/blog-post/figma-make-vs-figma-sites-when-to-use-which ; Figma Learn — https://help.figma.com/hc/en-us/categories/31304285531543-Figma-Make (2025–2026)
27. Banani, Figma pricing and credits 2026 — https://www.banani.co/blog/figma-pricing-and-credits (2026)
28. Tech Insider, Stitch March 2026 update — https://tech-insider.org/google-stitch-ai-design-tool-march-2026-update/ (18 Mar 2026)
29. Techleap, Google acquires Galileo — https://finder.techleap.nl/news/feed/google-acquires-galileo-ai-for-stitch (20 May 2025)
30. Banani, Stitch pricing — https://www.banani.co/blog/google-stitch-pricing-and-credits (Apr 2026)
31. Zoftwarehub, Readdy pricing — https://zoftwarehub.com/en-ae/products/readdy/pricing (2025)
32. ARR Club, Readdy $5M ARR — https://www.arr.club/readdy/readdy-reaches-5m-arr (2025)
33. TechRadar, Durable review 2026 — https://www.techradar.com/pro/software-services/durable ; Toolradar — https://toolradar.com/tools/durable/pricing (2026)
34. 10Web, Vibe for WordPress — https://10web.io/press-kit/press-release-vibe-for-wordpress/ (Oct 2025)
35. Tech.co, Hostinger builder pricing — https://tech.co/website-builders/hostinger-website-builder-pricing (2026)
36. Hostinger, 2025 results — https://www.hostinger.com/blog/?p=8625 ; Website Planet, Horizons — https://websiteplanet.com/news/hostinger-announces-horizons-ai-web-app-builder (2025–2026)
37. LowCode Agency, Dora — https://www.lowcode.agency/blog/claude-vs-dora-ai ; Design Trends — https://designtrends.beehiiv.com/p/dora-ai-no-code-3d-website-builder (2025)
38. Costbench, Spline pricing — https://costbench.com/software/ai-3d-generation/spline/ (Jun 2026)
39. MCP Directory, 21st.dev Magic guide — https://mcp.directory/blog/21st-dev-magic-mcp-complete-guide-2026 (2026)
40. Cline, 21st.dev MCP economy — https://cline.bot/blog/building-the-mcp-economy-lessons-from-21st-dev-and-the-future-of-plugin-monetization (2025)
41. 21st.dev, shadcn registry directory — https://21st.dev/blog/shadcn-registry-directory (2025)
42. Anthropic, Improving frontend design through skills — https://claude.com/blog/improving-frontend-design-through-skills (2025)
43. UNIL, Anthropic April 2026 releases (Claude Design) — https://wp.unil.ch/iaunil/en/three-new-releases-from-anthropic-around-claude-in-april-2026/ ; Blockchain.news — https://blockchain.news/ainews/claude-design-launch-anthropic-labs-debuts-opus-4-7-vision-workflow-for-rapid-prototypes-slides-and-one-pagers (17 Apr 2026)
44. wmedia, frontend-design skill — https://wmedia.es/en/tips/claude-code-frontend-design-skill ; Medium — https://medium.com/@porter.nicholas/anthropic-skills-marketplace-the-anti-ai-slop-ui-design-skill-a572d0cfef4f (2025–2026)
45. Abduzeedo, Variant — https://abduzeedo.com/variant-ai-design-tool-thinks-scrolls ; Banani review — https://www.banani.co/blog/variant-ai-review (2026)
46. GitHub topic design-md — https://github.com/topics/design-md ; Dembrandt — https://claudeskills.info/skills/dembrandt/dembrandt-skills/extract-design/ (2026)
47. Toolify, Aura.build — https://www.toolify.ai/tool/aura-build ; DesignCode, Aura with references — https://designcode.io/prompt-ui-compose-ui-with-references (2026)
