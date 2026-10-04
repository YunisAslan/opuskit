# Unconventional business models for OpusKit (2026-10-04)

The question: beyond (1) MCP/CLI engine, (2) API licensing to AI site platforms, (3) a smart-cart store, which ways of making money fit a small team in Baku? Figures are public or third-party estimates (marked "est."). Sources are at the end.

**One fact shapes everything.** In Baku a business-card site costs 150–300 AZN, a corporate site 300–800 AZN [1]. Local SMBs will not pay award-level prices. The money is in **selling abroad** (USD/EUR clients and agencies) and in **local institutions that pay on behalf of SMBs** (banks, hosts, telcos, state programmes). Model the work with that split.

---

## 1. Productised "award-level site in 72 hours" (done-for-you)

**How:** fixed scope, fixed price (for example $2.5–6k), fixed turnaround. The kit makes the recipe in a client call. Claude Code builds it from the Build Package. A human finishes media and QA. Sell to US/EU founders, cafés, studios and boutiques.
**Precedent:** Designjoy (one founder, flat monthly subscription) reached about $3.1M ARR in Oct 2024 and $145k MRR in Feb 2025 [2]. One Day Design made $54.9k with one person [3]. Mapletree Studio sells a "72-hour package" [4].
**Needs from OpusKit:** already exists. The 16 example sites are the portfolio. Sela Mor is the quality bar.
**Effort:** days. **Revenue:** $10–50k/month with 2–4 people. Does not scale beyond headcount.
**Risks:** turns into an agency, with revisions creeping in. Mitigate with one revision round and a "pick from the kit" rule.

## 2. White-label production for Western agencies

**How:** agencies resell under their own brand, and OpusKit Baku delivers. Agencies typically bill $15k for a site they buy at $6k (60% gross margin) [5]. Webflow white-label subscriptions start at $3,900/month [5].
**Precedent:** Appsrow and PandaCodeGen (white-label Next.js, "founding-partner pricing") [5].
**Needs:** the same engine, an NDA, Clutch and Upwork profiles. The recipe and QA documents are the selling point ("every site passes 40 distinctiveness checks").
**Effort:** weeks (outbound to 50 agencies). **Revenue:** $5–30k/month per anchor agency on a retainer. **Risks:** depends on a few clients, and the agency owns the relationship.

## 3. White-label builder for banks, hosts and telcos (B2B2SMB)

**How:** a bank's SMB app offers "your website" as a non-financial service that keeps customers. The institution pays per active site or a licence. It is the end-SMB who sees a simplified kit (Design → Pages → publish).
**Precedent:** Duda, est. $15–25M revenue. Its biggest accounts are IONOS, Thryv, Hibu and UOL, which embed it under their own brands [6]. BaseKit sells exactly this to banks and telcos (etisalat by e&, Tele2, Telefónica) in 40+ markets [7]. 10Web pivoted from direct-to-consumer to a white-label AI builder API for WordPress hosts [8]. Lloyds and Bank of Scotland bundle GoDaddy for SMB customers [9]. Hostinger made €275M in 2025 (+51%), driven by AI builders [10].
**Local angle:** Kapital Bank (Birbank Biznes, "best digital bank for SMEs 2025") [11], ABB, PASHA, Azercell/Bakcell, and hosts such as azhosting.az (which already bundles a free domain) [1]. In Saudi Arabia, Monsha'at's **Mazaya** platform lists partner discounts for SMEs (Geidea, PayPal and TikTok signed MoUs) [12]. That is a ready channel for a vendor to apply to.
**Needs:** hosted publishing (the static export already exists: `public/live/`), multi-tenant accounts, Azerbaijani/Russian/Turkish/Arabic UI, an SLA.
**Effort:** 3–6 months to a pilot. Sales cycles are slow. **Revenue:** large. One bank with 35k SME clients at 3% adoption × 10 AZN/month is about 126k AZN/year, from one contract. **Risks:** procurement, competing on price with BaseKit and Duda. Win on "your SMEs look premium, not templated".

## 4. State and donor-funded SME digitalisation

**How:** become a listed provider in a programme that pays for SME digital tools.
**Precedent:** Azerbaijan's SME Digitalization Programme (KOBİA + IDDA, launched Oct 2024): digiMATE maturity assessments, roadmaps, grants and "CTO-as-a-Service" vouchers [13]. Turkey's KOSGEB funds corporate websites and e-commerce and plans to reach 52k SMEs in 2025 [14]. EU4Business makes SME digitalisation a priority across Azerbaijan, Georgia and Armenia [15]. Meta Boost in Saudi Arabia targets 20k SMEs [12].
**Needs:** an Azerbaijani-language kit, a "digital presence in 5 days" package priced to fit a voucher, impact reporting (sites launched, traffic).
**Effort:** relationship-heavy, but the founder is local, which is an unfair advantage here. **Revenue:** lumpy contracts of $20–200k, plus credibility for the bank deals in model 3. **Risks:** slow payment, politics, low per-site price. Treat it as a channel and reference, not the core.

## 5. Per-brand themes for Shopify, Framer and Webflow (the generator as a factory)

**How:** use the engine to mass-produce *distinct* themes and templates. That is the opposite of what marketplaces are full of.
**Precedent:** Shopify pays theme developers with 0% revenue share on the first $1M/year, and themes sell at about $350–400 [16]. Framer creators keep 100% of sales, and Framer paid out $753k in a single month. Top template creators make $10–40k/month [17]. Relume (Webflow/Figma components → AI sitemap builder) is bootstrapped, about 32 staff, est. $1.8M revenue [18].
**Needs:** an adapter from recipe → Framer/Shopify Liquid. That is a new Build Package target, which fits `src/features/build-packages/`.
**Effort:** 1–2 months per platform. **Revenue:** $2–20k/month passive per platform once 10+ templates are listed. **Risks:** marketplace review times, and Shopify's approval bar is high (but that also blocks competitors).

## 6. Open-core: free engine skill, paid library and cloud

**How:** open-source the recipe engine and an "anti-AI-slop" Claude/Cursor skill. Charge for the curated library (all sections and effects, new monthly drops), hosted kit, and team seats.
**Precedent:** Paul Bakaus's **Impeccable** anti-slop design skill passed 10k GitHub stars [19]. That proves demand, and it is also the free competitor. Tailwind Plus sells components and templates as a one-time $299 lifetime purchase [20]. Aceternity UI Pro made $8k in week one and $80k in two months [21]. Magic UI: free components, paid templates [22]. Webstudio: open-source builder plus paid cloud and private cloud for agencies [23]. Payload (MIT, Next.js) was bought by Figma in June 2025 [24]. Open core can end in an acquisition.
**Distribution:** Anthropic opened a public plugin-directory submission portal on 2026-09-25 (any paid-plan user, with usage analytics) [25]. Submit the OpusKit plugin (MCP + skills) now. Treat the directory as distribution, not a payment rail (claims about paid skill listings are unverified).
**Effort:** weeks. **Revenue:** $5–80k launch spikes, then $3–15k/month. **Risks:** the free tier cannibalises paid. Licence hygiene (OpusKit's MIT-only rule) is an asset here: say it out loud.

## 7. "Lighthouse for taste": design-score API and CI check

**How:** turn `npm run check`'s distinctiveness rules (ΔE palettes, AI-default fonts, cream-band clusters) plus a screenshot critique into a score. Ship it as an API, a GitHub Action, and a badge ("OpusKit Distinct: 87"). Sell to AI builders (Lovable, Bolt, v0 clones) as a quality gate, and to agencies as a QA report.
**Precedent:** Attention Insight sells predictive-attention heatmaps: 5k+ users from $23/month, €0.7M raised [26]. Thoughtworks' Radar lists "AI design reviewer" tools [27]. Anti-slop audit skills are spreading [19][28].
**Effort:** 4–8 weeks (rules exist, a vision critique is new). **Revenue:** small direct, but it is the **wedge into model (2) API licensing**: a builder that measures its slop score will buy the library to fix it. **Risks:** taste is subjective. Publish the rubric and calibrate it against Awwwards winners (the research already exists in `docs/research/`).

## 8. Education and certification: "AI Web Design, award-level"

**How:** a cohort course ($300–700) plus an "OpusKit Certified" badge, with a CIS/Turkish/Arabic-language version where English courses don't reach.
**Precedent:** Flux Academy makes $2M+/yr with a small team, and its Framer Masterclass costs $695 [29]. Awwwards Academy has 100+ courses, a Creative Pass at about $12/month, and $65 per site submission [30].
**Effort:** 1 month to record. **Revenue:** $5–30k per cohort, and certified designers become resellers of models 1 and 2. **Risks:** needs an audience. YouTube build-alongs of the 16 examples are the content.

## 9. Awards and competitions as marketing (surprising, cheap)

**How:** run the "Caspian Web Awards" or a monthly "Built with OpusKit" contest. Prize: launch on the examples page and a free year. Submission fee optional (Awwwards: $65) [30].
**Why it works:** each entry is a real site built on the engine (free examples). Partners (banks, IDDA) sponsor it. It creates regional press. **Effort:** low. **Revenue:** indirect. Sponsorship can cover costs.

## 10. Designer marketplace with revenue share

**How:** outside designers sell recipes, palettes and effects, which must pass `check.ts` and the licence rules. OpusKit keeps 15–30%.
**Precedent:** Framer (creators keep 100% and Framer monetises hosting) [17], Shopify's 15% above $1M [16].
**Verdict:** **later.** A marketplace needs both buyers and sellers. Without buyers, sellers won't come. Revisit at 5k paying users.

---

## Ranked shortlist

| # | Model | First revenue | Upside | Why for a Baku team |
|---|---|---|---|---|
| 1 | Productised 72h sites (sold abroad) | 2–4 weeks | Medium | Baku cost base, USD prices, engine already works |
| 2 | White-label for Western agencies | 4–8 weeks | Medium | Same delivery, recurring volume |
| 3 | Open-core skill + paid library (Claude directory, launch) | 4–6 weeks | Medium-high | Distribution is free right now (portal opened 2026-09-25) |
| 4 | Per-brand Framer/Shopify templates | 2–3 months | Medium (passive) | Engine = template factory, so variety is the moat |
| 5 | Banks/hosts/telcos white-label + state programmes (AZ → TR → GCC) | 4–9 months | **Highest** | Local relationships; Duda/BaseKit prove the category |

The taste-score API (7) is the bridge from 3 to API licensing. Education (8) and awards (9) are marketing, not models.

## Recommended 90-day path

**Days 1–30: cash and proof.**
- Launch "Award-level site in 72 hours" at $2,900, with Sela Mor and two other examples as the portfolio. Use Upwork, Contra, X/LinkedIn build-in-public, and 50 cold emails to US/EU agencies offering white-label at $1,500/site.
- Submit the OpusKit plugin (MCP + design skill, free tier) to Anthropic's directory. Ship a free `opuskit score <url>` CLI built on the check.ts rules.
- **Goal:** 3 paid sites, 1 agency pilot.

**Days 31–60: product from delivery.**
- Every paid build feeds new recipes and sections back into the library. Package that library as **OpusKit Pro** (one-time $249 or $29/month: all sections, effects and the hosted kit). Launch on Product Hunt and X with the 72h sites as proof.
- Build the Framer adapter and list 5 distinct templates.
- Start Azerbaijani UI localisation.
- **Goal:** $10k cumulative and 100 Pro buyers.

**Days 61–90: institutional channel.**
- Take a one-page "Premium websites for your SME clients" deck plus a live white-label demo (your-bank.opuskit.az) to Kapital Bank/Birbank Biznes, PASHA/ABB, a host (azhosting.az) and KOBİA/IDDA (digiMATE/voucher provider listing).
- Run the first "Built with OpusKit" contest, co-sponsored by one of them.
- Apply to Monsha'at Mazaya and KOSGEB-eligible partner lists (via a Turkish reseller) for the next quarter.
- **Goal:** 1 signed pilot (even unpaid) as the reference for model 5.

Service revenue (1–2) pays the bills and generates new library content. The library (3–4) turns delivery into product. Institutions (5) are the large, defensible prize that a local founder can win and a US competitor cannot easily reach.

---

## Sources

1. azhosting.az, website prices in Azerbaijan: https://azhosting.az/en/blog/veb-sayt-hazirlanmasi-qiymeti
2. Designjoy metrics: https://onepage-research.sliplane.app/products/designjoy ; https://www.indiehackers.com/post/how-designjoy-got-from-0-to-120k-month-with-no-paid-advertising-a31375fce0
3. One Day Design: https://getlatka.com/companies/oneday.design
4. Mapletree 72-hour package: https://mapletree.studio/72-hour-package/
5. White-label pricing and margins: https://www.krishaweb.com/blog/white-label-web-development-guide/ ; https://www.pandacodegen.com/partners ; https://www.appsrow.com/industry/b2b-partner
6. Duda partners and revenue (est.): https://startupim.com/company/duda ; https://duda.co/solutions/saas-platforms
7. BaseKit for banks and telcos: https://www.basekit.com/banking-partners/ ; https://www.basekit.com/telco-partners/
8. 10Web white-label API: https://10web.io/press-kit/press-release-ai-website-builder-wordpress-hosts/ ; https://thenewstack.io/api-lets-businesses-white-label-ai-powered-website-builder/
9. Lloyds × GoDaddy: https://lloydsbank.com/business/resource-centre/website-builder-offer.html
10. Hostinger 2025 results: https://cxotoday.com/media-coverage/hostinger-posts-fourth-consecutive-year-of-50-growth-driven-by-platform-wide-ai-agent-use/
11. Kapital Bank / Birbank Biznes: https://www.euromoney.com/article/hfd66er47jsw0ko0ss0gwo8c/awards-for-excellence-national-winners-2026-azerbaijan/ ; https://www.trend.az/business/3900558.html
12. Monsha'at Mazaya / Meta Boost: https://monshaat.gov.sa/en/node/428349 ; https://insight.astrolabs.com/meta-boost-2
13. Azerbaijan SME Digitalization Programme: https://idda.az/en/news/azerbaijan-launches-digitalization-program-for-small-and-medium-businesses ; https://www.smb.gov.az/en/all-news/a-program-for-the-digitalization-of-small-and-medium-sized-enterprises-smes-has-been-launched-in-azerbaijan
14. KOSGEB 2025: https://www.aa.com.tr/tr/ekonomi/kosgeb-2025te-52-bin-kobiye-destek-saglayacak/3482872 ; https://www.ideasoft.com.tr/kosgeb-dijitallesme-destegi-kobiler-icin-dijital-donusum-rehberi/
15. EU4Business Phase II: https://euneighbourseast.eu/projects/eu-project-page/?id=1931
16. Shopify theme revenue share: https://shopify.dev/docs/storefronts/themes/store/revenue-share
17. Framer creators: https://www.framer.com/creators ; https://www.framer.com/help/articles/how-the-creator-program-works/ ; https://uxdesign.cc/10-ways-designers-can-make-1-10k-per-month-with-framer-in-2024-37a073409211
18. Relume (est.): https://www.cbinsights.com/company/relume ; https://techcrunch.com/?p=2583714
19. Impeccable: https://emelia.io/hub/impeccable-ai-design-skill
20. Tailwind Plus: https://tailwindcss.com/plus
21. Aceternity UI Pro: https://www.starterstory.com/stories/aceternity-ui
22. Magic UI Pro: https://pro.magicui.design/pricing
23. Webstudio business model: https://webstudio.is/blog/sustainable-open-source
24. Figma acquires Payload: https://www.michiganbusiness.org/reports-data/success-stories/payload-cms/ ; https://uithings.com/figma-acquires-payload
25. Claude plugin directory portal: https://www.unite.ai/anthropic-opens-directory-submission-portal-for-claude-plugins/ ; https://claude.com/docs/directory/publish
26. Attention Insight: https://startuplithuania.com/?p=7684 ; https://www.cbinsights.com/company/attention-insight-1/financials
27. Thoughtworks Radar, AI design reviewer: https://www.thoughtworks.com/radar/tools/ai-design-reviewer
28. Anti-slop audit skill (Meng To): https://tessl.io/registry/skills/github/MengTo/Skills/audit-ai-design-slop/review
29. Flux Academy: https://swipefiles.com/everything-is-marketing/50 ; https://Flux-academy.com/courses/the-6-figure-freelance-designer
30. Awwwards fees and Academy: https://toolradar.com/tools/awwwards ; https://dynamicbusiness.com/ai-tools/awwwards-web-design-excellence-recognition-platform.html
