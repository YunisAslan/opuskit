# Awwwards collections — full map and what the best sites do (2026-10-04)

Research for OpusKit's variety and beauty work. Follows `2026-10-awwwards.md` (12 sites) and `2026-10-home-anatomy.md`.
Structured data for every site looked at: `2026-10-04-awwwards-sites.json` (154 entries:
name, url, awwwards page, award, collections, kind, hero, sections, nav, footer, type, colour, signature, palette, tags, fonts seen).

## How this was done

- **Collections index**: `awwwards.com/collections/` lists 132 public collections (4 pages); the two house curators
  (`/awwwards/collections/`, `/awwwards_collections/collections/`) add the rest. **127 collections** were mapped, each opened
  and its newest ~96 items read (**6,927 items**: 4,977 "elements" — short videos of one part of a site — and 1,910 site
  submissions, each with tags).
- **Award lists**: the Awwwards page of all **248** Sites of the Year / of the Month / recent Sites of the Day (award, score,
  palette, tags, description, the site's own "elements").
- **Live sites**: **163 live visits** (headed Chrome, 1440×900): first screen + four scroll positions, plus a DOM read-out
  (headings in order, menu, footer text, fonts, backgrounds, canvas/video/libs). 154 rendered; 9 were blocked, geo-fenced or gone.
  Every screenshot was looked at (contact sheets).
- **Elements**: **349 element videos** downloaded from 26 element collections (menus, navigation, loaders, 404, hovers,
  transitions, galleries, footers, forms, contact, about/team, project, product, search, cookie, microcopy, marquee, players,
  minigames, drag, layout, typography, UI animation, filters, storytelling, e-commerce, SOTD elements); two frames each,
  read as contact sheets.
- Scripts, raw HTML, screenshots and sheets: scratchpad `aww/` (not committed).

### What the sample says at a glance (161 live pages)

| Measure | Share | Note |
|---|---|---|
| WebGL `<canvas>` on the page | 92 / 161 (57%) | three, OGL, in-house; 14 load Rive |
| `<video>` on the page | 72 (45%) | hero loops, reels, video walls |
| Smooth scroll (Lenis class) | 82 (51%) | — |
| Custom cursor element | 65 (40%) | mostly a dot / label cursor, a few mascots |
| Single-screen "app" (page height = viewport) | 44 (27%) | WebGL worlds, galleries, gates — not a normal page |
| Dark page ground | ~39 (24%) | the rest light: off-whites, warm greys, flat colour |
| A mono face for labels | 35 (22%) | Geist/Roboto/Supply/Akkurat/JetBrains Mono, always small |
| A serif in the pair | 32 (20%) | luxury, culture, hospitality, editorial portfolios |
| A condensed display face | 16 (10%) | sport, events, retro, e-com caps |
| Builder | Webflow 30, Nuxt 28, Next 6, Framer 4, WordPress 3 | GSAP + ScrollTrigger + SplitText is the default stack |

Display faces are almost all commercial grotesks (Neue Montreal in 6 cuts, Suisse, Aeonik, Diatype, Monument, Favorit,
Khteka, Die Grotesk, Lausanne) or editorial serifs (Canela, Noe, Louize, Reckless, PP Editorial, Instrument Serif, EB Garamond).
Inter appears on 8 pages — always the plainer sites.

---

## 1. Collection map

Grouped by kind. "Items" is the collection's own count; "Top items" are the newest entries (site names for site
collections, element titles for element collections). Awwwards' own style/industry collections were mostly last curated
2016–2021; for *current* work the Sites of the Day / Month / Year lists and the element collections (updated weekly) are
the live sources, so this report leans on those for "what the best sites do now".

### Industry / use case

| Collection | Items | Followers | Curator | Theme | Top items (newest first) |
|---|---|---|---|---|---|
| [Agency Portfolios](https://www.awwwards.com/awwwards/collections/agency-portfolios/) | 315 | 1349 | awwwards | Discover an exclusive selection of creative agency portfolios recognized globally. Explore | Locomotive®; Hero Collective; Design Office; Outpost; MannSales.co; Unseen Studio |
| [Freelance Portfolios](https://www.awwwards.com/awwwards/collections/freelance-portfolio/) | 360 | 2199 | awwwards | A great portfolio allows the work to speak for itself. Here are some of the best. | Diana Toloza - Portfolio 2024; Harry Atkins; Irene Butenko – Folio ’24; Værsågod; G. Colombel — Portfolio 2024; Hardik Bhansali |
| [Creative Portfolios](https://www.awwwards.com/rubensanchez/collections/creative-portfolios/) | 28 | 233 | rubensanchez | A interesting selection of creative portfolios | Veintidos Grados; Thomas Ciszewski Photography; Jean-Christophe Suzanne; Brice Darmon; Build in Amsterdam; Femme Fatale Studio |
| [Photography Portfolio](https://www.awwwards.com/favsto/collections/photography-portfolio/) | 18 | 131 | favsto | Photographers, filmmakers and image creators portfolio webstites | Anna Morosini; Ali Sharaf; Sam Lord Flavin; KATSUHIKO KUWAMOTO; Marmo Elite; Julien Belmonte |
| [E-Commerce](https://www.awwwards.com/awwwards/collections/e-commerce/) | 295 | 1559 | awwwards | Inspirational selection of the best eCommerce website designs. Awwwards winning Online Sto | Stenger Bike; Cay Skin; Skin Concept; Camp Suha 3D Van Builder; Mate Libre; Reef x Olivia Ponton |
| [Fashion Websites](https://www.awwwards.com/awwwards/collections/fashion/) | 71 | 525 | awwwards | This collection displays a variety of Fashion Websites | United Athle Look Book SS 2019; Sir The Label; Humankind Management; GETZ; ADANS; Cure, Unique Nail&Wax Boutique |
| [NonProfit Websites](https://www.awwwards.com/awwwards/collections/nonprofit-websites/) | 36 | 639 | awwwards | nonprofit websites from around the world | RadiatingHope®; UNICEF Australia; Gourmantour; Return to Hope; Greenpeace vs Killstarter; Into the Arctic - Greenpeace |
| [Startup Websites](https://www.awwwards.com/awwwards/collections/startup-websites/) | 10 | 397 | awwwards | Startups need eye-catching, creative, innovative and accessible websites to generate publi | Slides 4 by Designmodo; Quiver, new sharing made for peopl; Upper App; SwapSeats; Lingo; Moodily |
| [App Landing Page Website](https://www.awwwards.com/awwwards_collections/collections/app-landing-page-website/) | 34 | 4 | awwwards_collections |  | ListAcross; Isometrica 3D Illustrations; Flipaclip; Protagonist; Wealthsimple Cash; Superlist |
| [Movie Landing Page Design](https://www.awwwards.com/mireia_ortega/collections/movie-landing-page-design/) | 40 | 184 | mireia_ortega | The best microsite or websites created to promote a movie. | Once Upon a Time in Hollywood; Easy Tiger; Lady Bird; The Killing of a Sacred Deer; Despicable Me 3; Playing Lynch |
| [Games](https://www.awwwards.com/awwwards/collections/games/) | 148 | 746 | awwwards | Everyone loves to play! Web based Games and Mini Games developed in WebGL using Frameworks | Gucci Grip; The Snidewalk; Madame Turfu; Ask the AI Ball; Gucci Lips; ASAP PLZ - retro office game |
| [WebGL / HTML5 Games](https://www.awwwards.com/bryansaftler/collections/webgl-html5-games/) | 1 | 77 | bryansaftler |  There have been a proliferation of game engines and frameworks to create 2D and 3D HTML5  | — |
| [Immersive WebGL online exhibition](https://www.awwwards.com/awwwards_collections/collections/immersive-webgl-exhibition/) | 31 | 5 | awwwards_collections | Virtual entertainment, digital experience, interactive museum exhibition | Magical Reflections; The Queen and The Crown; SHUTDOWN.gallery; The World of Vogue Talents 21; The Unconventional Gallery; The Future in Mind |
| [Music Interfaces](https://www.awwwards.com/awwwards/collections/music-interfaces/) | 25 | 648 | awwwards | UI design of music players, mixers, audio visualizers and playlists. | SIRUP - cure - Playlist Site; Bastille: Eye of the Stormers; Noomo Beat quiz; 3D AI audiovisual experience; Audiovisual Album Experience for Ö; 3D camera scroll |
| [Film TV and Game Interfaces](https://www.awwwards.com/awwwards/collections/film-tv-and-game-interfaces/) | 37 | 633 | awwwards | Futuristic GUIs, FUIs, HUDs, gesture and conversational Interfaces, IA and chat bots... Th | Educational project - interactive ; Clean design, smooth motion and st; A fan-centric digital space for  N; Beyond the Fold - Customize your a; Mank the Unmaking - Digital campai; DARK TV serie - Exploring characte |
| [Inspiring Design Blogs](https://www.awwwards.com/awwwards/collections/inspiring-blog-design/) | 31 | 692 | awwwards |  | Letters From Venus; Blog; Blog Page; In the News; News page design - Cobo; Editorial layout composition |
| [Digital Design Blogs](https://www.awwwards.com/awwwards/collections/digital-design-blogs/) | 11 | 644 | awwwards | Design Blogs You Have to Read Everyday | Aiga - Eye on Design; Creative boom; The Outline; Fastcodesign; Smashing Magazine; Web Design Ledger |
| [Christmas Collection](https://www.awwwards.com/awwwards/collections/christmas-collection/) | 19 | 530 | awwwards |  | ASTRAL Seasons Greetings 2016; Se busca Elfo; Juntos pelo Natal; GlouGlou - Xmas Turkey Router; Telekom: Magic Advent Calendar; Christmas with Joy |
| [AI Powered Web Projects](https://www.awwwards.com/awwwards/collections/ai-powered-web-projects/) | 15 | 509 | awwwards |  | Background interaction; Digital Curator - AI to explore ar; Removing people from backgrounds i; Extract people from photo and make; Home Stallone [DeepFake]; Do not draw penis -drawing game |
| [Creative Spaces](https://www.awwwards.com/awwwards/collections/creative-spaces/) | 21 | 549 | awwwards | Inspiring studios, offices and workplaces of the world's leading digital design agencies. | McCann's office in Madrid; Kolektif house, coworking in Istan; Condé Nast entertainment, NY; Pallotta Teamworks office in Los A; Razorfish's Berlin office; Corus Quay's headquarters in Toron |
| [Newsletters](https://www.awwwards.com/awwwards/collections/newsletters/) | 20 | 643 | awwwards |  | Get your head straight with 3 mont; Underwear Built To Handle The Lock; Roll, punch, heat, cool, grind, cl; Last minute gifts for kids; Find Your Winter Outfit; ////\\\\Give Standout Gifts\\\\/// |

### Style / look

| Collection | Items | Followers | Curator | Theme | Top items (newest first) |
|---|---|---|---|---|---|
| [Minimal](https://www.awwwards.com/awwwards/collections/minimal/) | 28 | 895 | awwwards | Stripping down to the fundamentals, the following sites champion simplicity. | fanfanfan. design studio; Serino; Andreas Kleiberg; AÃRK Collective; Sang Han; Essen International |
| [Clean](https://www.awwwards.com/awwwards/collections/clean/) | 90 | 848 | awwwards | No fuss, pure, simple examples of great design. | fanfanfan. design studio; underpromise; Paul & Henriette; Slow; Thierry Chopain Portfolio 2020; Filippo Bello |
| [Brutalism](https://www.awwwards.com/awwwards/collections/brutalism/) | 83 | 810 | awwwards |  | WORK BY 10011; Design Thinkers 2020; Roze Bunker; Art Night London; HAN Kjøbenhavn; Yo yo yo |
| [Retro](https://www.awwwards.com/awwwards/collections/retro/) | 101 | 719 | awwwards | Recycled trends and fashions and vintage iconography portrayed through a modern medium. | GRETA; Anton Chalov's Portfolio; zach.dev; Shelter In Space by Khruangbin; Design Thinkers 2020; Blast Galaxy |
| [Vector](https://www.awwwards.com/awwwards/collections/vector/) | 50 | 641 | awwwards | Sites inspired by and containing a vector graphic apperance, SVG, low poly or flat design. | Fishfinger Creative Agency; Adult Swim Singles 2016; Cobay.es; Paper Planes; For Better Coffee; DENNIS: A Music Video |
| [Illustration in Web Design](https://www.awwwards.com/awwwards/collections/illustration-in-web-design/) | 112 | 530 | awwwards | This gallery of Illustration Websites displays a variety of styles and techniques like Vec | 10x19; Pratham Books Annual Report 19; Mille et UN Fund; YouTube Rewind 2019; Beyond the Pandemic; Spotify Pet Playlists |
| [Texture](https://www.awwwards.com/awwwards/collections/texture/) | 21 | 630 | awwwards | You'll want to touch these samples of texture acheived through details, elements and layer | Celebrating Chinese New Year 2015; YARA'N'YARED; Dragone; Happy 2015 from Dragone; Steven Mengin - Portfolio; DADA-DATA |
| [Black and White Websites](https://www.awwwards.com/awwwards_collections/collections/black-and-white-websites/) | 68 | 137 | awwwards_collections | Black and White Inspirational Sites | G!TheImagineers; Impermanence; NexBank; Benjamin Righetti; Levon Aronian; For the Love of Bread |
| [Minimal Black](https://www.awwwards.com/awwwards/collections/minimal-black/) | 60 | 280 | awwwards | Beautifully Designed Black Websites | Raxo; LEELA Beta; Andrew Leguay Folio 2020; Yannis Yannakopoulos; Shout; sabato.studio |
| [Dark Mode in Websites and Apps](https://www.awwwards.com/awwwards/collections/dark-mode/) | 29 | 79 | awwwards | Dark Mode Inspirations: Showcasing Stunning Examples of Dark Mode Websites and Designs. Ex | Dark Mode; Switch Theme; Light & Dark Mode; Mouse interaction and dark-light m; Aperture — Dark/light mode switch; Dark and light mode |
| [Pastel colors](https://www.awwwards.com/Mixallo/collections/pastel-colors/) | 1414 | 172 | Mixallo |  | Michael Tsirakis - Designer; Phobos; Canopy; tricks GmbH; Beetogreen; Cobloc |
| [Electric Colors](https://www.awwwards.com/awwwards/collections/electric-colors/) | 67 | 428 | awwwards | The virtue of being "intense" or particularly "vibrant" | Mistretta Coiffure; R A D A R; Kekubian Assassin; Detective Moustachio; One Shared House 2030; 3D Music XP - BDDI 2018 |
| [Yellow Websites](https://www.awwwards.com/awwwards_collections/collections/yellow-websites/) | 24 | 5 | awwwards_collections | Yellow Websites to Brighten Up Your day | ToyFight; BryBry; Musée des Canaris; The House That Yauch Built; MOSCOT; Kommigraphics |
| [Color Exploration](https://www.awwwards.com/awwwards/collections/color-exploration/) | 189 | 444 | awwwards | Color Trends in Web Design | Catapultismo; Sick Agency; Humbleteam; Avantt Typeface; SIRUP - cure - Playlist Site; Goliath Entertainment |
| [Color Palettes Websites](https://www.awwwards.com/mireia_ortega/collections/color-palettes-websites/) | 153 | 226 | mireia_ortega | Great Color Schemes! | Vana; Gusto Play 2; St. Martin Agency; poltronafrau.com; Mafanfa; kombu |
| [Trendy Gradients](https://www.awwwards.com/awwwards_collections/collections/trendy-gradients/) | 103 | 181 | awwwards_collections |  | monopo london; Floux design; Vita Architecture; SIRUP × Apple Music Playlist; Sarah Guo; Richard Sancho: Portfolio 2021 |
| [Gradient Gradients](https://www.awwwards.com/jessica/collections/gradient-gradients/) | 16 | 128 | jessica |  | Julie Bonnemoy Portfolio; Homepage; The Engine Gradients in hovers and; Stink Studios Gradients; Audio Capture Artwork; Shader Effects |
| [Trippy Sites](https://www.awwwards.com/favsto/collections/trippy-sites/) | 14 | 84 | favsto | Clearly LSD influenced websites | Adult Swim Singles 2016; Audiograph; Panera Land of Clean; The Dilla Dimension; Love Letters From Craig; Swiss Army Man |
| [Websites with Patterns](https://www.awwwards.com/awwwards_collections/collections/patterns/) | 13 | 5 | awwwards_collections | A selection of websites using Patterns + Patterns Galleries,Patterns Generators, Backgroun | Hello Buckwild; Sharpshooter; Riviera House; WeAreOSM; Basement2Boardroom; BananasApp |
| [Typography in Web Design](https://www.awwwards.com/jessica/collections/superselectionarticle-jess/) | 24 | 191 | jessica |  | Typography-Based Layout and Cute F; Flip typography animation; Magic People Vodoo People Scroll  ; Souffle - Typo Animation; Uncanny Valley Studio Typography A; Cream Co. Typography Layout |
| [Typography in Web Design](https://www.awwwards.com/awwwards/collections/typography-in-web-design/) | 268 | 1443 | awwwards | Best Examples of Typography in Web Design | Mama Joyce Peppa Sauce; Slava Kirilenko; WorkWithUs; Corentin Bernadou Folio No.01; mē-lo / Angela Milosevic; Käthe Kollwitz Memorial |

### Structure / narrative / layout

| Collection | Items | Followers | Curator | Theme | Top items (newest first) |
|---|---|---|---|---|---|
| [Storytelling](https://www.awwwards.com/awwwards/collections/storytelling/) | 91 | 1019 | awwwards | Successful storytelling merges visual and UI design to create sites that encourage user in | Life in Vogue; Humbleteam; Humain; Catapultismo; CREATIVE NIGHTS; FCXV FABIENNE CHAPOT |
| [Storytelling Websites](https://www.awwwards.com/xaviercusso/collections/story-telling-websites/) | 26 | 221 | xaviercusso |  | Google Cloud Infrastructure; The House That Yauch Built; End Family Fire; Harmony. Mastered from Chaos.; Sevenhills - Nature's Combinations; HP Magic Words |
| [Interactive Narratives](https://www.awwwards.com/mireia_ortega/collections/interactive-narratives/) | 18 | 135 | mireia_ortega | My favorite multimedia storytellings | Gucci Beauty Wishes; Kerrygold - The Magical Pantry; Time for a Mammogram; One Last Beat; FAFSWAGVOGUE.COM; In My World |
| [Interactive Experience](https://www.awwwards.com/mireia_ortega/collections/interactive-experience/) | 49 | 198 | mireia_ortega | Engaging and personally stimulating sites which attract the user with interactive elements | E.C.H.O.; Marseille by La Phase 5; Into the Storm; Le Voyage Azarien; The MythBuster Challenge; Life in Vogue |
| [One Page](https://www.awwwards.com/awwwards/collections/one-page/) | 111 | 988 | awwwards | Single page websites like these are fully loaded in the initial page load making the exper | Avantt Typeface; Balance; frame OPTIK; Media Election; Divenamic; Teletype |
| [Layout](https://www.awwwards.com/awwwards/collections/layout/) | 168 | 763 | awwwards | Web Design Layout is about architecture of contents and accessibility, but it also needs t | Julia Johnson; Typography Principles; Extraset Type Foundry; Blumenkopf; Pizza Pizza; Grids |
| [Grid Layout](https://www.awwwards.com/awwwards/collections/grid-layout/) | 26 | 15 | awwwards | Explore the most stunning grid-based websites crafted by top designers—ignite your creativ | Oh Happy Days; Webflow Redis Agency; Duling Hall; IKONY; Bienal Arquitectura Urbanismo; Salt Architecture |
| [Horizontal Layout Websites](https://www.awwwards.com/awwwards_collections/collections/horizontal-layout-websites/) | 75 | 57 | awwwards_collections | Horizontal layout websites are less common than vertical layout websites - horizontal scro | Avantt Typeface; Wanda; Fuoripista; Palazzo Monti; Benjamin Righetti; Tiger Tells about Voodoo |
| [Horizontal Scrolling](https://www.awwwards.com/awwwards/collections/horizontal-scrolling/) | 4 | 36 | awwwards |  | Horizontal Scroll; Horizontal scroll navigation; Horizontal infinite scroll; Horizontal scroll |
| [Parallax](https://www.awwwards.com/awwwards/collections/parallax/) | 108 | 895 | awwwards | Adds depth and a slight 3D effect by causing the background to move at a slower rate to th | Stock Dutch Design; Temporary Measures; Cure, Unique Nail&Wax Boutique; RZ Collection; adidas Climachill; L'Avenir, Dental Clinic |
| [Responsive Design](https://www.awwwards.com/awwwards/collections/responsive-design/) | 45 | 687 | awwwards | Examples of Responsive Design that are a joy to use. | New Micra: play it your way; AIAIAI; ETQ; Karim Rashid; Chris Niedenthal; Brdr. Krüger |
| [Mobile UI](https://www.awwwards.com/awwwards/collections/mobile-ui/) | 169 | 85 | awwwards | There are approximately 4.32 billion active mobile internet users, and more than 60% of we | Mobile – Talent & Menu; Mobile View; Mobile; Mobile; Mobile; Mobile |
| [360º](https://www.awwwards.com/awwwards/collections/360/) | 49 | 681 | awwwards | A spherical recording or 3D scenario which allows a full 360º view creating an immersive e | New Micra: play it your way; interactive products page; Fire safety-driven immersive exper; 360 Enviroment Navigation; Plus X digital showroom - Virtual ; Skolkovo Business District - 3D to |
| [WebVR - VR in the browser](https://www.awwwards.com/awwwards/collections/webvr-vr-in-the-browser/) | 59 | 657 | awwwards | WebVR is an experimental JavaScript API that opens the browser to virtual reality experien | Dunkirk WebVR; Spot-the-Bot; Marpi: Demos; Petra VR Experience; Bear71 VR; Earth 2050 |
| [Maps, Geolocation, StreetView](https://www.awwwards.com/awwwards/collections/maps-geolocation-streetview/) | 71 | 740 | awwwards |  | iMapa; Marseille by La Phase 5; Local Guides; Umami Land; European Fashion Map 2019; Radio Garden |

### Technique / technology

| Collection | Items | Followers | Curator | Theme | Top items (newest first) |
|---|---|---|---|---|---|
| [WebGL](https://www.awwwards.com/awwwards/collections/webgl/) | 293 | 988 | awwwards | Enjoy this great selection of WebGL websites !! | Into the Storm; J Dilla's Donuts: 15y tribute; Le Voyage Azarien; WLDLGHT; Design Embraced; Dark: Official Netflix Guide |
| [WebGL Inspiration](https://www.awwwards.com/teoross/collections/webgl/) | 43 | 150 | teoross | A selection of impressive WebGL projects. | kirifuda inc.; The Frontier Within; Yambo Studio; Lusion; Questions in the sky; Adult Swim Singles 2018 |
| [WebGL Animations](https://www.awwwards.com/du-haihang/collections/webgl-animations/) | 46 | 280 | du-haihang |  | KODE Immersive; David Whyte Experience; Hatom; Igloo Inc; Sculpting Harmony; Lusion v3 |
| [Three.js](https://www.awwwards.com/awwwards/collections/three-js/) | 119 | 828 | awwwards | Three.js is a JavaScript library for creating animated 3D graphics. Three.js simplifies th | this place [of mine] Art Hub; twenty øne piløts - Banditø; Mirrorball; Intangible Matter; Magic in New York; Creazioni Lifestyle |
| [Shaders are Easy](https://www.awwwards.com/awwwards/collections/shaders-are-easy/) | 15 | 604 | awwwards |  | Into Vertex Shaders; ShaderFrog, The shader editor for ; cables; Shader School; The Book of Shaders; ISF Interactive Shader Format Edit |
| [WebGL Shaders + Code](https://www.awwwards.com/awwwards/collections/webgl-shaders-code/) | 27 | 773 | awwwards | Experiment and learn with all these stunning WebGL filters and effects created with shader | Code Smooth WebGL Shader Transform; Visually Explained: MVP Transforma; Platonics - 3D animated cube by Li; Math for Art and Graphics; Shadertoy Tutorial; Immersive experience - The Turn of |
| [CSS & JS Animations](https://www.awwwards.com/awwwards/collections/css-js-animations/) | 145 | 1150 | awwwards | Examples of stunning CSS3 and Javascript animation examples. Featuring UI elements, scroll | Fluid box reposition; Footer; Contact Hover Animation; Wizard; Sofi pod showcase; Desktop to Mobile morphing |
| [CSS Animations](https://www.awwwards.com/du-haihang/collections/css-animations/) | 77 | 477 | du-haihang | CSS3 Animations make it possible to animate transitions from one CSS style configuration t | Inkwell; Exat typeface; Onto; AIM — AI Modernism of Kharkiv; Abetka; Hervé Baillargeon |
| [Animation Libraries Examples & Inspiration](https://www.awwwards.com/awwwards/collections/animation-libraries-examples-inspiration/) | 25 | 779 | awwwards | We have selected projects using the most common animation libraries like TweenMax from GSA | Full Animation Sequence (clean); 3D Force-Directed Graph; RGB Split Effect on scroll; Walkers Experiment with p5.js; Rough.js - Create graphics with a ; Zdog -Pseudo-3D engine for canvas  |
| [Web Audio API  and Audio Visualization](https://www.awwwards.com/awwwards/collections/web-audio-api-and-adio-visualization/) | 37 | 647 | awwwards |  | JazzKeys; Arkade London / Audio Reactive Art; Patatap; Audiograph; Deja vu / KAMRA; Orchestre de Paris - Resonance |
| [Sound Design](https://www.awwwards.com/awwwards/collections/sound-design/) | 76 | 685 | awwwards |  | Pusher Music; Takahisa Mitsumori; Patatap; Arkade London / Audio Reactive Art; Sten Valin; Sounds Like You |
| [Filters and Effects](https://www.awwwards.com/awwwards/collections/filters-and-effects/) | 108 | 932 | awwwards |  | CAMPER FW16; Anagram - Paris; VeilHymn |
| [UI Animation and Microinteractions](https://www.awwwards.com/awwwards/collections/animation/) | 243 | 1682 | awwwards | These prime examples use Canvas, SVG, CSS3, WebGL and more to enhance visual content. | Cookie Crumbs Animation; Interaction; Media page; Hover; Dynamic Navigation UI; Index |
| [HTML5 Game Engines, Technologies and APIs](https://www.awwwards.com/awwwards/collections/html5-game-engines-technologies-and-apis/) | 19 | 599 | awwwards | A collection of HTML5 game engines,libraries and frameworks to create 2D and 3D WebGl or C | Gameplay; PlayCanvas; Goo Create: Make Games and VR for ; A-Frame: A web framework for VR ex; PixiJS v4; BabylonJS |
| [Built with React](https://www.awwwards.com/awwwards/collections/build-with-react/) | 27 | 667 | awwwards | React is a JavaScript library for building user interfaces and reusable UI components. Rea | Cold Press Juice; DRAFT CORPORATE SITE; Intangible Matter; Sequence website; STRV - Digital Agency; Zero |
| [Built with Angular](https://www.awwwards.com/awwwards/collections/build-with-angular/) | 17 | 597 | awwwards | AngularJS is an open source Javascript framework designed to build dynamic websites and ri | Herman Miller–Aeron Remastered; Uprising™ Creative Studio; Femme Fatale Studio; Project Sunday; Capital of Children; Google Fonts |
| [Built with WordPress](https://www.awwwards.com/awwwards/collections/build-with-wordpress/) | 25 | 557 | awwwards |  | Hugo & Marie; Smith; Nightshift; Glitty; StartupLab; Sparkbit |
| [Built with Bootstrap](https://www.awwwards.com/awwwards/collections/build-with-bootstrap/) | 37 | 540 | awwwards |  | Herman Miller–Aeron Remastered; The Horological Smartwatch; STRV - Digital Agency; Creazioni Lifestyle; Villes & Paysages; ANNIE |
| [Built with Node.js](https://www.awwwards.com/awwwards/collections/build-with-node-js/) | 24 | 539 | awwwards |  | Paper Planes; RSQ; Bastille: Eye of the Stormers; Cobay.es; Kygo Life; Space Advisor |
| [Built with Backbone.](https://www.awwwards.com/awwwards/collections/build-with-backbone/) | 32 | 538 | awwwards |  | MING Labs; Smith; Heineken Go Places; Vodafone Powerful Connections; 51 Sprints - The Human Race; Alexandre Rochet |

### Element / component

| Collection | Items | Followers | Curator | Theme | Top items (newest first) |
|---|---|---|---|---|---|
| [Menu Inspiration](https://www.awwwards.com/awwwards/collections/menu/) | 773 | 2512 | awwwards | A menu is the principal UI interaction element that groups the navigation, guiding the use | Menu / Navbar; Menu Gini Vini; Navigation dropdown hover; Dropdown Menu; Dynamic Menu; Menu Transition / Interactions |
| [The Best of Navigation](https://www.awwwards.com/awwwards/collections/the-best-of-navigation/) | 493 | 2125 | awwwards | Examples of Innovative Navigation for Your Inspiration | Procedural Slider Re-Arrangment; Home Page; 3D immersion; Scroll through the different lands; Home Scroll; Clip Animation |
| [Footer Design Best Practices](https://www.awwwards.com/awwwards/collections/website-footer-design-best-practices/) | 273 | 1413 | awwwards | The bottom of a web page, which contains general and legal info about the company, as well | Footer; Footer Let's Meat; Footer clock; Footer; Footer; Footer |
| [Creative Footers](https://www.awwwards.com/awwwards/collections/creative-footers/) | 2 | 36 | awwwards |  | Footer; Jumble Footer |
| [Loading Animations](https://www.awwwards.com/awwwards/collections/loading-page/) | 542 | 1580 | awwwards | A page or animated element which shows the progress of the loading process. | Loading Animation; Preloading; Loading; Desktop Loading Animation - Donpro; Loading animation; Pre-loader |
| [Intro Animations](https://www.awwwards.com/awwwards/collections/intro-animations/) | 2 | 36 | awwwards |  | Intro; Intro |
| [404 Error Page](https://www.awwwards.com/awwwards/collections/404-error-page/) | 475 | 1052 | awwwards | Cute examples of the HTTP standard response code which informs the user they have clicked  | Büro website — 404 Page; 404 Page; 404; ZETR 404 page; 404; 404 Page |
| [Hovers, Cursors and Cute Interactions](https://www.awwwards.com/awwwards/collections/hovers-cursors-and-cute-interactions/) | 466 | 1523 | awwwards | Hovers, Cursors, Animations, Interactions,RollOvers | 3D Cursor Interaction; Autoplay video on Hover; Flower Page; Titcket page; Canvas grid; Hover Buttons |
| [Transitions](https://www.awwwards.com/awwwards/collections/transitions/) | 366 | 2078 | awwwards | Transitions are the animated changes between two pages, states or views to provide visual  | List Transition; SteviaPlease - Navigation / Page t; Page Transition; Page Transition; Page flip; Default page transition |
| [Galleries and SlideShows](https://www.awwwards.com/awwwards/collections/image-gallery-and-slideshows/) | 441 | 1381 | awwwards | Galleries where photos are displayed in thumbnail grid or tiled mosaic-style layouts or a  | Case Study Gallery; Project Gallery - Donprod Portfoli; Porfolio; Testimonials Slider; Expo page; Motion |
| [Text Marquee animation](https://www.awwwards.com/awwwards_collections/collections/text-marquee-effect/) | 40 | 39 | awwwards_collections | The <marquee> tag was a popular internet feature in the late 1990s. The HTML marquee is a  | WorkWithUs; Another Lora ☺ Fashion Designer; Dola - Marquee text; Miranda Paper Portfolio - Marquee ; Mama Joyce Peppa Sauce - Animated ; k72 - Animated Marquee Text Effect |
| [Contact Pages](https://www.awwwards.com/awwwards/collections/contact-pages/) | 232 | 1020 | awwwards | A company's contact information included forms presented in an accessible way to encourage | Desktop Contact Page - Donprod Por; Contact; SAAPRO Contact page; Contact Form; Contact Page; Book Experiene |
| [Forms & Semantic Forms](https://www.awwwards.com/awwwards/collections/forms-and-conversational-interfaces/) | 98 | 915 | awwwards | These creative contact forms and natural language forms are created with minimalistic inte | Cocota - Contact form; Rethink Contact Form; Let's Talk; Contact form; Contact form - Dgrees Studio; Contact form - Cobo |
| [Team & About Pages](https://www.awwwards.com/awwwards/collections/about-page/) | 300 | 1019 | awwwards | Agencies using creative and innovative galleries, cursors, navigation and more to introduc | About Page; About Us; About; SteviaPlease - About page; About; Team Section |
| [Project Page](https://www.awwwards.com/awwwards/collections/project-page/) | 173 | 983 | awwwards | A portfolio showcasing the projects carried out by a company, the most important content o | Rogue Studio; Studio Mærtens; Rapid Scroll feature; Opening project; Project Grid; Home - works slider |
| [Product Page](https://www.awwwards.com/awwwards/collections/product-page/) | 141 | 1154 | awwwards | Showcasing your products with beautiful photos and descriptions to get the user to the che | Products navigation; Product line; Product Page Mooor; Say Hello!; Product Listing Page; Discover the products |
| [Search Filters](https://www.awwwards.com/awwwards/collections/search-filters/) | 77 | 797 | awwwards | A collection of interfaces that allow users to sort their search criteria to find results  | Filter Animtion; Search Interaction; Filtering & Sorting; Search Motion; REV – Search; Index page |
| [Search Box UX](https://www.awwwards.com/awwwards/collections/search/) | 39 | 37 | awwwards | Explore best practices in search box UX design through examples from leading websites. Lea | Search Page; Search; Search; Massive Bold Capitals Search Filte; Stykka - Hero search typography; Drop down search |
| [Cookie Policy](https://www.awwwards.com/awwwards/collections/cookie-policy/) | 74 | 257 | awwwards | Privacy UX: Better Cookie Consent Experiences | Cookie Animation; Privacy policy - Lazarev; Cookie policy - WOW page; Nike PLAYlab - Marquee on hover co; Lunchbox - UX writing  marquee ani; PichiAvo - Hero cookie policy |
| [Microcopy and UX writing](https://www.awwwards.com/awwwards/collections/microcopy-and-ux-writing/) | 98 | 509 | awwwards | Brands can express their voice and tone and connect emotionally with users via the communi | ImReallyATRex; Teddys Last Ride; Tarot-o-bot; Femme & Fierce |
| [Video and Audio Players](https://www.awwwards.com/awwwards/collections/video-and-audio-players/) | 95 | 747 | awwwards |  | Earth Eclipsed; Ali Ali; JazzKeys |
| [Minigames & Playful Interactions](https://www.awwwards.com/awwwards/collections/minigames-playful-interactions/) | 73 | 344 | awwwards | A collection of playful microinteractions and MiniGames to delight and entertain the user. | Canvas Study WebProject; Burn the tickets game; Console Snake; Arcade Game; How it Works? 🐶; Flecto 404 Page |
| [Drag, Gestures & Other Interactions](https://www.awwwards.com/awwwards/collections/drag-interactions/) | 150 | 1041 | awwwards | Drag and drop, click and hold, keyboard and camera input, are some of the most important b | Quiz Questions; Article page; Interactive Elements; Fire safety-driven immersive exper; Custom color picker; Animation and custom color of Laco |
| [Social Interaction & Social Integration](https://www.awwwards.com/awwwards/collections/social-iteraction-social-integration/) | 72 | 701 | awwwards | A web site where the social interactions between the users provide the content. Social but | The laughing cow® 100 years; Acordes; Codeology; Christmas Express; Under Armour: Will Beats Noise; Nokia - The Zoom Project |
| [Home Hero Image](https://www.awwwards.com/awwwards/collections/home-hero-image/) | 1 | 36 | awwwards |  | Hero - Slider |
| [3D UI Elements](https://www.awwwards.com/awwwards/collections/3d-ui-elements/) | 2 | 36 | awwwards |  | Hero image_3D_animation; Home 3D motion |
| [UI Elements GUI](https://www.awwwards.com/awwwards/collections/ui-elements-gui/) | 10 | 588 | awwwards | UI Elements, sliders, knobs, forms, buttons and GUI design | Branding; Bugatti Smartwatches - Hero Buy CT; UI button hover gradient - Boost; Drop Shadow Effect In Retro Style ; Card Pattern to Display Content; Click interaction - Yanlin Ma UI e |
| [Paragraphs](https://www.awwwards.com/awwwards/collections/paragraphs/) | 1 | 277 | awwwards | Paragraphs | SVG mask hover microinteraction -  |
| [SOTD Elements](https://www.awwwards.com/awwwards/collections/best-sotds-elements/) | 447 | 664 | awwwards | A collection of elements taken from the sites which are held in highest regard by the Awww | Main Scrolling Interaction; Exhibition Artists; Take a Snapshot; Creators Directory; Brand and digital project for DrDa; Corporate website for BMS United |

### Curated mixes

| Collection | Items | Followers | Curator | Theme | Top items (newest first) |
|---|---|---|---|---|---|
| [Hot Right Now 🔥 🔥](https://www.awwwards.com/awwwards/collections/hot-right-now/) | 85 | 765 | awwwards | Your first stop for discovering the hottest, freshest new trends as they happen, experimen | Jonny McLaughlin; Osk; Gilles Tossoukpé Portfolio |
| [Design & Interactions](https://www.awwwards.com/biron/collections/favourites/) | 246 | 349 | biron |  | Maciej Bączkowski—Designer & Art D; Open; Alec Doherty Jewellery; Low Intervention / Natural Wine Sh; About / Sedilia; Kōpiko / Kōpiko |
| [creative webdesigns](https://www.awwwards.com/casperbdv/collections/inspiration/) | 34 | 85 | casperbdv |  | Scrolling makes images go to diffe; Interactive menu; Unique menu; cursor casts light and creates wav; subtle scrolling effect; home page color transition |
| [Best Websites Design](https://www.awwwards.com/awwwards_collections/collections/best-websites-design/) | 2 | 4 | awwwards_collections |  | Street Art News; The message to Ukraine - Scroll-tr |
| [Likes](https://www.awwwards.com/awwwards/collections/likes/) | 164 | 430 | awwwards | Your favourites | R64X — Crypto Gallery; PocketVerse; The Swell Gallery by Ripple; Ball Metaverse; Totem.earth; Continuum NFT Drop |
| [Likes](https://www.awwwards.com/awwwards_collections/collections/likes/) | 0 | 4 | awwwards_collections | Your favourites | — |
| [Site of the Month Nominees](https://www.awwwards.com/awwwards/collections/sotm-nominees/) | 6 | 474 | awwwards |  | Merci-Michel; Rainforest Foods Experience; Veintidos Grados; Storytrail; Mi Banxico; Pursuit Of Sound |

### Resources (not websites)

| Collection | Items | Followers | Curator | Theme | Top items (newest first) |
|---|---|---|---|---|---|
| [Free Fonts](https://www.awwwards.com/awwwards/collections/free-fonts/) | 288 | 4091 | awwwards | A selection of complimentary typography for your web projects. Best free fonts for designe | Fontshare; Galgo Condensed by Giulia Boggio; Aalto Display Font; Unique Typeface; Geist by Vercel; Round 8 by atipo |
| [Best Fonts](https://www.awwwards.com/awwwards/collections/best-fonts/) | 140 | 1002 | awwwards | Best fonts for Web Designers and Digital Projects | Whirly Birdie Typeface; Blaze Type; Graphit Type |
| [Google Fonts](https://www.awwwards.com/awwwards/collections/google-fonts/) | 27 | 82 | awwwards | Google Fonts is a library of 1464 open source font families and APIs for convenient use vi | Open Sans - Google Font; Oxygen - Google Font; Source Sans Pro - Google Font; Nunito - Google Font; Poppins - Google Font; Montserrat - Google Font |
| [Calligraphy Fonts](https://www.awwwards.com/awwwards/collections/hand-made-fonts/) | 73 | 646 | awwwards |  | Palm Canyon monoline font; Millesh Script - Quirky Monoline H; Creme Espana - Free calligraphy  f; Intro Script Font; Story Telling Display Font; Rolest script font |
| [Handy Tools and Apps for Designers](https://www.awwwards.com/awwwards/collections/tools-apps-platforms-worth-trying/) | 194 | 1057 | awwwards |  | Isometrica 3D Illustrations; Colir; Pikkovia - Stylized 3D Icons; Streamline Icons; Morrow / User not found; Desktop |
| [AI Tools For Designers](https://www.awwwards.com/awwwards/collections/ai-tools-for-designers/) | 35 | 131 | awwwards | Enhance Your Creativity and Efficiency! Awwwards brings you our collection of artificial i | Desktop; Gen AI Guide; Musho AI; Midjourney; Magnific AI - Image Upscaler; Udio: Revolutionizing Audio Experi |
| [Code Editors and Online Front-end Tools](https://www.awwwards.com/awwwards/collections/code-editors-and-online-front-end-tools/) | 25 | 600 | awwwards |  | The React Cheatsheet for 2020 + re; Coding a Dark Mode for your Websit; Laying out Forms using Subgrid; Atom; Basis Universal, the highly compre; Codeanywhere · Cross Platform Clou |
| [Wireframing and Protoyping Tools](https://www.awwwards.com/awwwards/collections/wireframing-and-protoyping-tools/) | 34 | 709 | awwwards | A useful collection of tools taking you from planning a site's structure and functionality | Atomus Design system for Figma; Lo-Fi Wireframe Kit for Figma; Introducing the LottieFiles After ; The Marie Kondo of Wireframe kits; Prototype, collaborate, design too; Proto Pie - prototyping deisgn too |
| [Talks and Interviews](https://www.awwwards.com/awwwards/collections/talks/) | 19 | 463 | awwwards | Conference Talks, Presentations, Interviews, ect | New PRO Content available: watch N; New PRO Content available: watch G; New PRO Content available: watch M; New PRO Content available: watch T; New PRO Content available: watch L; New PRO Content available: watch A |
| [Speakers Slides - Awwwards Conference](https://www.awwwards.com/awwwards/collections/speakers-slides-awwwards-conference/) | 6 | 465 | awwwards | Here you can find the slides shared by our speakers, not all slides will be posted here as | Ash Huang - Design Was Supposed to; Val Head - Designing a New Reality; Haraldur Thorleifsson, Founder and; Good to Great UI Animation by Pabl; The Design of Tools by Tom Giannat; Interactive Design and Adobe XD by |
| [Agency Life](https://www.awwwards.com/awwwards/collections/agency-life/) | 30 | 505 | awwwards | Agency Life & Culture | The Good Vibes Only Mural at Jam3 |
| [Design Culture](https://www.awwwards.com/awwwards/collections/design-culture/) | 9 | 534 | awwwards | Beatiful resources for Designers | Vote Now! The Best of the Year 202; Your Opinion Counts! Take the 2022; AirSelfie, a Dedicated Selfie Dron; Vufine+, A 960 x 640 Screen In Fro; Guide to Computing; Requiem for the Mac Pro via Mashab |
| [Inspiring UX Design](https://www.awwwards.com/awwwards/collections/inspiring-ux-design/) | 8 | 650 | awwwards |  | Conversational Contact Page using ; Onboarding Animation - Navigation ; Survey - User Input, Form Elements; Natural Language Form - Chatbot - ; Progressive Disclosure; Conversational Interface |
| [Live Sessions](https://www.awwwards.com/awwwards/collections/live-sessions/) | 33 | 283 | awwwards |  | Deconstructing Winning Websites / ; Deconstructing Winning Websites wi; Deconstructing Websites with Margh; Deconstructing Websites: Shaban Id; Creating people-centered AI experi; Live Design Jury Website Reviews:  |

---

## 2. What the best sites do — by use case

Each block: usual first screen → the page in order → what makes it feel premium. Example sites in brackets (all in the
JSON with URLs).

### Agencies and studios (Locomotive, Lusion, Exo Ape, Lama Lama, Watson, Monolog, Oimachi, Warm & Fuzzy, Akaru, Nothin', Trionn, 14islands, Ask Phill, Hero Collective…)
- **First screen** is one of four: a giant statement (Monolog 140px, Exo Ape 250px light, Nothin' wordmark), a 3D toy that
  reacts to the pointer (Lusion, Noomo, Pensatori), a reel/video (Warm & Fuzzy, Partizan), or a typographic paragraph with
  images set *between the words* (Watson, 2xA, Locomotive's pictogram line).
- **Order**: claim → selected work (3–8, big) → what we do (a list, not cards) → clients as names → one personality beat
  (store, extras, culture, awards) → a footer that asks for the brief. Testimonials almost never.
- **Premium tells**: the footer is a moment (giant wordmark, live local time, "Booking projects for Q4", brief form with
  budget chips, click-to-copy email); work as a mono table index with hover image ("WORK [14]"); clients as giant type, not
  logos (Bennett & Clive, Yambo, Hero Collective); one self-aware joke ("Footer®", "Make the logo bigger", "PRESS THIS,
  CHANGE YOUR YEAR").

### Freelance / personal portfolios (Jesper Landberg, Gil Huybrecht, Léo Parpeix, Hiroto Sato, Miranda, Bleibtgleich, Artem Shcherbakov, Meer Mohsin, Gionatan Nese, Bruno Simon)
- Usually **one screen that is the work**: infinite drag canvas (Gil Huybrecht), curved 3D carousel (Jesper), ring of
  projects like a clock (Gionatan), a real object as menu (Hiroto's street pole: the signs say PROJECTS / CONTACT), a game
  world (Bruno Simon).
- Or a strong **metaphor page**: the newspaper (Miranda — masthead, columns, "ALL WORK!", page tears), a Swiss poster
  (Bleibtgleich — wordmark split to the two edges, "nothing more than a sentence.").
- Personality via one hand-made layer: doodles (Artem), a mascot cursor (Léo's bee), a signature loader.

### Film / production companies (Partizan, Depo Luxe, Milledollars, Inkfish, Siena Film Foundation, Bennett & Clive, Glitch&Grit)
- Video first, always: a **living video wall** that keeps reshuffling (Partizan); **one film per screen** with a centred
  italic serif title in quotes (Depo Luxe); **rounded video cards** opening full-screen (Milledollars); a **poster grid that
  re-arranges** itself (Siena); a **mono index** of work with counts (Inkfish).
- Black grounds, tiny type, director names as labels; footers with city clocks.

### Photographers and image-makers (Pontus Rudolfson, Diana Toloza, Synchrodogs, Body of Water, Julien Calot)
- Name huge (Pontus: red serif across the width), then an **endless masonry** with a floating Filter pill; or a **contact
  sheet** that opens into a horizontal story with flat colour blocks between photos (Body of Water); or one artwork per
  screen (Julien Calot). Synchrodogs: saturated orange ground, mirrored landscapes, projects as giant titles.

### E-commerce — fashion and beauty (Serotoninn, L'Oiseau Dé, Vero, Cay Skin, Decathlon Yestalgia, Brunello Cucinelli AI)
- **Model cut-outs on white with condensed category words** (Serotoninn: DRESSES, CORSETS, SPACE (TRANSFORMATION)), then a
  **torn-paper edge** into a grungy editorial band — clean shop + raw story.
- Portrait + giant white brand name (L'Oiseau Dé), categories as photo/flat-colour tiles, product cards, footer = wordmark
  over photo. Luxury: italic-lower + roman-caps statement ("where INNOVATION meets CRAFTSMANSHIP"), archive grid,
  full-width serif wordmark footer (Vero). Brunello Cucinelli's SOTD is a page-less, AI-conversation shop.
- Element patterns: cart drawer over the product photo; a side "buying panel" over full-bleed action video; configurator
  (AIAIAI "choose your parts"); press-logo marquee (Cay Skin).

### E-commerce — food, drink and wellness (Mana, Ciao Energy, Mate Libre, Cob, Rebel Rabbit, Tibico, Simply Chocolate, Bennett Tea, Argeta, Spylt)
- **The product is the guide**: the can flies and turns down the page (Mana, Spylt), or sits on a lit pedestal with a
  **flavour switcher** (Ciao). **Every flavour brings its own ground** (Simply Chocolate gradients, Bennett Tea colour
  schemes, Argeta tins on orange). Flat illustration or loud packaging colour; chunky rounded or condensed caps.
- Commerce furniture: free-shipping marquee bar, subscription toggle, discount popup (flower badge on Cob), age gate
  (Garden Party checkerboard; a mezcal "Are you of legal drinking age?" in marquee rows).

### Product launches and hardware (Opal Tadpole, Radian, Moto Finance, Oryzo, /zeroz, Energym, Butter)
- Product **on a plinth like a sculpture** (Moto's card in a dark gallery; Oryzo's cork coaster rotating; Vero's bride on a
  plinth). Founder letter over a top-down table photo (Opal). "Explain it like I'm 5": a paragraph whose inline product
  icons light up as you read (Opal). Product name in parentheses as a device: "Awaken Energy, ( /zeroz ) Drive Everything".
- Footer often a giant brand wordmark (Opal's outlined repeating pattern, Butter's iridescent 3D script).

### SaaS / AI / developer tools (Cerebrium, Butter, Vectr, Illoca, Kriss, Nory, Inkwell, Anime.js, Made with GSAP, Microsoft AI)
- Two families: **dark tech** (navy + one hot keyword colour, wireframe globe, mono labels, ribbon-shader footer —
  Cerebrium) and **warm humanist** (peach light blur, italic serif "Humanist Superintelligence", watercolour illustration,
  signed letter — Microsoft AI). Illustrated SaaS is back: a two-colour cobalt-on-beige drawing that zooms into a plan and
  then a 3D building (Illoca); 3D food icons (Nory); a pale isometric city (Vectr); a typewriter rotating role over a
  dollhouse cutaway (Kriss).
- Inkwell: **the sky changes as you scroll** (white → peach sunset → navy network of avatars) — a world, not sections.
- Footers: giant wordmark (Inkwell, Vectr), dense link grid with coloured bullets (Anime.js), lime CTA (Made with GSAP).

### Deep tech, industrial, B2B (USAvionix, Seasats, Edolus, SSTR, CoffeeTech, CoMinVi, United Carriers, Terminal Industries, Yucca, Petralithe, Floema, Montfort, Aspen Search)
- Dark product renders (drones, drill bits, mining vehicles), thin claims, mono labels, hairline grids, **live telemetry**
  in the footer (Seasats: 3.3 knots, 6.813 nm). Extended or outlined giant wordmarks behind the product (USAvionix, Seasats,
  United Carriers). "■ READY" preloader on a grid (SSTR). A Swiss hairline grid with **dithered/halftone photos** and one mint
  block (Aspen). Extreme restraint for finance (Montfort: clouds + spaced thin caps).
- B2B makes industries the navigation: three industry tabs on the hero, repeated as three cards in the footer (Yucca).

### Finance / web3 (Sharplink, Dragonfly, Igloo, Zentry, Moto)
- A chrome 3D symbol on a gradient (Sharplink), a statement that **lights up as you read**, a giant metallic wordmark cut by
  the bottom edge. Dragonfly: letters pinned to the four viewport corners, numbered chapters, orange on black. Zentry:
  video inside a clip-path polygon that unfolds.

### Real estate and architecture (ERA Residence, Son Daven, Sobha, Likova, Realevate, Normal is Boring, Kononenko, Cobloc, Makhno, Lyon Béton, House of Honey)
- **Script + condensed serif** on a wine ground (ERA), a giant phone number as display type, investment numbers in the hero
  (Son Daven "UP TO 10% / UP TO 30%"), an **engraving** in the footer (Son Daven's stacked Hutsul sheep).
- Scroll moves a **camera around a 3D building** (Likova); giant cropped Didone letters behind project cards (Normal is
  Boring); collections as **tall colour cards with vertical titles** (Realevate); collections as a centred **word index**
  (Lyon Béton: BERKSHIRE NEW DICE RETROFUTUR); "SHOP … NOW" split across the width with products between.

### Hospitality and travel (Tengile MalaMala, White Desert, Palazzo Sogni, Chalet Matthe, Paris by Emily, Pasqua)
- Full-bleed nature/wildlife photo with thin serif in two staggered lines ("UNMATCHED / ABUNDANCE"), quiet cream ground, an
  olive/earth footer with booking. White Desert: glass card over ice texture, giant condensed navy wordmark footer with
  "Dates & Rates / Enquire". Palazzo Sogni: fresco ceiling, powder blue, facade **illustration** as footer. Paris by Emily:
  **two tilted city cards** to choose from. Pasqua: an oil-painting landscape as the gate.

### Nonprofits and causes (Radiating Hope, AMPLIFY, QUIN, The Other Side of Truth, Restore Hope element)
- Human portrait hero with two pills (Upcoming events / Donate), programme photo cards, **events list with date, price and
  "Save my spot"**, membership band, 4-column footer. QUIN: halftone protest photo + Acknowledgement of Country as the gate.
  Donation appeal card with preset amounts and the raised total (Restore Hope).

### Culture, museums, exhibitions, archives (Getty Tracing Art, Sculpting Harmony, 21 Hrs on the Moon, Hearst Exhibit, Mosby's Files, Colonia Zacamil, AIM, Persepolis)
- A **sketch that draws itself** (Gehry's pencil lines on orange — Sculpting Harmony), a **map with HUD hotspots** after
  "SCROLL TO LAND" (Moon), **two magazine covers as doors** (Hearst), **CSS file-cabinet tabs** of architect names (Mosby's),
  "FLY TO [aerial strip] ZACAMIL" giant words with an image band between, a rotating word inside a serif statement (Getty).
  Sound is common ("Turn on your sound", headphones icon).

### Events and festivals (C2 Montréal, Festivent, Thessaloniki sto Piato, Mutek element)
- Dates as the biggest type ("May 24–26 2023", "13.02 – 28.02"), overlapping colour shapes, pixel/checker patterns built from
  the event's letters, a line-up marquee, a vertical side nav with rotated labels (C2), lime GET PASSES.

### Personal brands, artists, music (Lando Norris, Trevor Noah, Paul Kalkbrenner, No Art, Michael Gatt)
- Lando (SOTY 2025): race number "4" as the loader mask with his face inside, acid lime, **signature script scribbled over
  headlines**, ON TRACK / OFF TRACK chapters, 3D helmets, a pit-stop mini-game. Trevor Noah: cut-out head whose skull opens
  and spills objects, giant pink rounded name, tour list, a menu with his face + speech bubble "Leaving so soon?".
  Paul Kalkbrenner: a photo chip between first and last name; video archive counter "01/08".

### Brand guidelines, type foundries, reports (Dropbox Brand, Squarespace Foundations, PP Neue Montreal, Pangram Pangram, AI in Design Report, Shopify Renaissance Edition)
- **Bento of colour tiles** that open into chapters (Dropbox). **Numbered full-screen chapter slides** with ← → (Squarespace).
  A specimen as a "travel guide" with a rotating letter badge (Neue Montreal). Font cards that show their own face (Pangram).
  A report whose footer is its numbers (AI in Design). Release notes as torn painting collages + dense catalogue columns.

### Games and brand experiences (Messenger, Lacoste Polo Factory / Ace Breaker, The Tie-break, Miu Miu House, Ponpon Mania, Igloo)
- A gate ("Start the tour", "Begin"), then one world: customise a polo in a 3D factory (Lacoste), explore a house to find the
  bags (Miu Miu), an interactive comic (Ponpon), deliver letters on a tiny planet (Messenger, SOTY 2025).

---

## 3. What the best sites do — by style

| Style | How it is built | Examples |
|---|---|---|
| Swiss hairline / grid | white or warm grey, 1px rules, mono labels, live clock, halftone photos, one mint/lime/orange block | Aspen Search, AIM, Bleibtgleich, Oimachi, Boc |
| Monochrome luxury | black or cream, small serif, full-bleed film, italic title in quotes | Depo Luxe, Sobha, Vero, Immersive Garden |
| Editorial warm | cream ground, mixed italic/roman serif statement, olive/terracotta footer | Tengile, Slow Down, House of Honey, Microsoft AI |
| Dark tech | navy/black, one hot keyword colour, wireframe globe, ribbon shader, mono | Cerebrium, USAvionix, Edolus, Sharplink |
| Console / HUD | status rows with green dots, coordinates, corner brackets, terminal 404 | Pensatori, Igloo, 21 Hrs, ZETR 404 |
| Candy-flat maximal | flat brights per section, rounded heavy grotesk, flat or 3D illustration | Aardvark, MindMarket, Mana, Ponpon, Dropbox |
| Retro / Memphis / Y2K | squiggles, grid floor, lightning bolts, script logos, dot-matrix type | Decathlon Yestalgia, 2xA dot-matrix, MicroWaver, RCA drum-pad 404 |
| Brutalist / raw | condensed caps, red/black, collage, hand-drawn circles | Hero Collective, Glitch&Grit, The Line, Bulletproof |
| Print / paper | newspaper columns, torn edges, page flip, magazine covers | Miranda, Serotoninn, Renaissance Edition, Hearst |
| Illustrated | two-colour riso, engraving, watercolour, flat characters, team line drawing | Illoca, Son Daven, David Whyte, MindMarket, Kin |
| Pattern-led | checkerboards, pixel blocks made from letters, wallpaper patterns | Garden Party, Thessaloniki, Noho checkerboard |
| Gradient / light blur | peach/violet blurs, liquid fabric shader | Microsoft AI, Be the Buzz, Monogrid, nk.studio |
| Colour collections | Pastel (1,414 items — the biggest style collection by far), Black & White, Minimal Black, Electric, Yellow, Trendy Gradients | see the map |

---

## 4. Element pattern catalogue

From the element collections (videos read frame by frame) plus the live sites. Each: the pattern → examples.

### Menus (773) and navigation (493)
1. **Hover-preview menu** — pages listed left; hovering swaps a photo right → [naturopathy dropdown](https://www.awwwards.com/inspiration/navigation-dropdown-hover-practice-leandra-isler), Spylt (can grid changes per item), [Saisei](https://www.awwwards.com/inspiration/menu-animation-saisei-architecture).
2. **Menu as a strip of photo cards** (one card per page, with a label) → [Gini Vini](https://www.awwwards.com/inspiration/menu-gini-vini-gini-vini-1), [Vazzi shop menu](https://www.awwwards.com/inspiration/e-commerce-fullscreen-menu-vazzi), P448 mega menu.
3. **Giant stacked condensed words over a film-still grid** → [Opositive Films](https://www.awwwards.com/inspiration/hamburger-animation-opositive-films), [Yourbana orange panel](https://www.awwwards.com/inspiration/page-menu-yourbana), Spylt cream panel.
4. **Compact ticket/pill that expands into a list with thumbnails** → [Siena](https://www.awwwards.com/inspiration/dynamic-menu-siena-film-foundation), [Ottografie dynamic-island pill](https://www.awwwards.com/inspiration/dynamic-navigation-ui-ottografie-2025).
5. **Full-screen flat colour with three words in a row** → [P10](https://www.awwwards.com/inspiration/p10-menu-pesquera-diez-p10).
6. **Real object as navigation** → hirotos.com (street signs), [Analogue sound board](https://www.awwwards.com/inspiration/contact-sound-board-analogue), mosbyfiles.com (file tabs).
7. **Vertical side tabs on the right** (coloured, stacked) → seasats.com, c2mtl (rotated labels).
8. **Footnoted / slash nav** "(1) Partnerships, (2) Capabilities" → watson.la; "HOME / WORK / FEED" → thelinestudio.com.
9. **Live status in the bar** (local time, ONLINE dot, availability) → boc.studio, inkfishnyc.com, 2xa.studio.
10. **Horizontal fold-out accordion** with vertical labels 01/02/03 → [Next Big Thing](https://www.awwwards.com/inspiration/horizontal-fold-out-menu-next-big-thing), realevate.agency.

### Loaders and intros (542)
1. **Brand-mark mask** — logo/number as a window with a photo inside, then it grows → landonorris.com ("4"), [walbi](https://www.awwwards.com/inspiration/intro-loading-animation-walbi), [P10 letters converge](https://www.awwwards.com/inspiration/p10-loading-pesquera-diez-p10).
2. **Corner counter** 0→100, then the page → lusion.co, why.zero.university ("87"), [Gregory Lallé "75 → Works."](https://www.awwwards.com/inspiration/homepage-loader-reveal-gregory-lalle-24); dot-matrix percent ([orange card](https://www.awwwards.com/inspiration/preloading-david-denni-25-folio)).
3. **Thumbnails that grow into the hero** → [Art of Documentary](https://www.awwwards.com/inspiration/pre-loader-art-of-documentary), poster column cycling.
4. **Stickers pile up** as it counts; products explode in after a script logo → [Spylt](https://www.awwwards.com/inspiration/preloader-animation-spylt-milk).
5. **Letterbox frame** with letters in the corners that opens onto a photo → [Heloise Thibodeau](https://www.awwwards.com/inspiration/intro-animation-and-horizontal-scroll-heloise-thibodeau-architecte-1); "■ READY" on a grid (sstr.tech).
6. **Gate instead of loader** — wordmark + Enter (unseen.co, siena.film, Miu Miu "turn on your sound"); playful (dontboardme.com "Bounce a ball to get to the site"); acknowledgement (quin.org.au); age gate (shopgardenparty.com).

### 404 pages (475)
Drum-machine pads ([RCA Records](https://www.awwwards.com/inspiration/rca-records-404-page-rca-records)); terminal log ([ZETR](https://www.awwwards.com/inspiration/zetr-404-page-zetr)); iridescent glass that shatters ([Terradactyl](https://www.awwwards.com/inspiration/animated-broken-glass-404-terradactyl)); a mosaic of project images forming 404; a plant growing through the 0 ([SAAPRO](https://www.awwwards.com/inspiration/saapro-404-page-saapro-mobile-waste-management)); marquee "4 NOT FOUND 4" with a crushed can (Spylt); keyhole eye with suggested links; pixel blocks reassembling; "I'm Lost Too (002). Oh shoot…" doodles.

### Footers (273 + live sites)
1. **Giant wordmark** — dominant (≈40 of 154 sites): cropped by the bottom edge (akaru.fr, sharplink.com), outlined (usavionix.com, unitedcarriers.com), repeated (kononenkogroup.com KNKO, 2xa.studio dot-matrix marquee), multicolour letters (noho.ink "happy modern"), metallic/iridescent 3D (butter.video), over a photo (alethia.earth, L'Oiseau Dé), dissolving on hover ([Duten](https://www.awwwards.com/inspiration/footer-micro-interaction-duten)).
2. **Invitation** — "Let's make something great together" + giant email (14islands.com), "BRIEF US SOMETHING." (lamalama.com), "Ready when you are" (analogueagency.com), click-to-copy email (warmnfuzzy.tv).
3. **Footer as the brief form** — email, project, budget chips (noomoagency.com); newsletter card (matelibre.com).
4. **Footer as full index** — every page/service/post listed (oimachi.co, pangrampangram.com, animejs.com with coloured bullets).
5. **Live footer** — clocks ([footer clock](https://www.awwwards.com/inspiration/footer-clock-spasoje-perovic), bennettandclive.com cities, bymonolog.com), telemetry (seasats.com), availability.
6. **Illustrated footer** — engraving (sondaven.com), facade (palazzosogni.com), toile ([Social Impact Capital](https://www.awwwards.com/inspiration/subscribe-form-social-impact-capital)), loyalty-card stamps ([AMICI](https://www.awwwards.com/inspiration/footer-loyalty-card-with-logo-amici)), giant arches (houseofhoney.com).
7. **Oversized playful** — 3D extruded letters + wavy edge ([La Boca gelato](https://www.awwwards.com/inspiration/oversized-footer-gelato-la-boca)), "Stay wet" over water ([Vazzi](https://www.awwwards.com/inspiration/wet-footer-vazzi)), self-aware "Footer®" (studio-size.com).
8. **Bento footer** — logo block + colour CTA block (aspensearch.com), three nav cards (vectrfl.com), three industry cards (yucca.co.za).

### Hovers and cursors (466)
Tickets/stickers scatter after the mouse; a plus-shaped icon-cluster cursor ([Fiddle](https://www.awwwards.com/inspiration/canvas-grid-fiddle-digital-design-agency)); fluid pink cloud ([House of Dreamers](https://www.awwwards.com/inspiration/mouse-move-fluid-effect-house-of-dreamers)); letters that swap for an image/texture on hover ([Radiance](https://www.awwwards.com/inspiration/interactive-letters-on-the-main-screen-radiance-team), [Duten brushed steel](https://www.awwwards.com/inspiration/texture-hover-reveal-duten)); a 3D wire smiley; googly eyes / emoji peeking between words (unseen.co, [DEN.COOL](https://www.awwwards.com/inspiration/header-interaction-den-cool)); autoplay video in a list row on hover; a mascot cursor (leoparpeix.com bee).

### Page transitions (366)
Pages as a card stack ([Cyd Stumpel](https://www.awwwards.com/inspiration/default-page-transition-cyd-stumpel-portfolio-2025)); book page flip ([Seasoned](https://www.awwwards.com/inspiration/page-flip-seasoned)); list → thumbnail column expands ([Mario Roudil](https://www.awwwards.com/inspiration/list-transition-mario-roudil)); mask reveal from a centre frame ([Amaterasu](https://www.awwwards.com/inspiration/mask-reveal-page-transition-amaterasu)); pixel dissolve ([Teletech](https://www.awwwards.com/inspiration/pixelated-transition-teletech)); two cream panels part like doors; ground colour swap (Netflix green → yellow); nested colour frames zoom (Stevia Please).

### Galleries (441) and project pages (173)
Video contact sheet; vertical cover-flow of folded images ([Motion](https://www.awwwards.com/inspiration/motion-graphic-design)); an exhibition corridor ([Warhol Expo](https://www.awwwards.com/inspiration/expo-page-warhol-arts)); a horizontal bar crossing a poster ([Perspectives](https://www.awwwards.com/inspiration/image-selector-perspectives)); prints with a sticky note ([Inside Kristallnacht](https://www.awwwards.com/inspiration/photo-galleries-inside-kristallnacht)); a tilted card between two words "BRANDING DIGITAL [card] UNITS COMMUNITY" ([Radiance](https://www.awwwards.com/inspiration/selected-works-radiance-team)); light-serif project names with offset thumbnails on embossed plaster ([Immersive Garden](https://www.awwwards.com/inspiration/rapid-scroll-feature-immersive-garden-website)); "WORK [14]" mono table ([Inkfish](https://www.awwwards.com/inspiration/work-hover-inkfish)); a fan of tilted colour case cards "Trusted by the finest" ([Ask Phill](https://www.awwwards.com/inspiration/case-studies-ask-phill-2)); object cut-outs on white + index ([Arvin Leeuwis](https://www.awwwards.com/inspiration/project-navigation-arvin-leeuwis-portfolio)).

### Contact pages (232) and forms (98)
1. **Mad-lib letter form** — "Hello Coeval, my name is ___, I work on ___, I would like to ___" in big light serif with underlines; chips inside the sentence ("I'd like to discuss [Website] [Branding]; a budget of [30–50K]") ([example](https://www.awwwards.com/inspiration/contact-form-terradactyl)); [IKEA natural-language letter](https://www.awwwards.com/inspiration/ikea-family-natural-language-form).
2. **Step form with a giant counter** 1/4 → 4/4 ([Cobo](https://www.awwwards.com/inspiration/contact-form-cobo)); progress bars + chip answers + a lime Submit block ([Cocota](https://www.awwwards.com/inspiration/cocota-contact-form-cocota)); budget chips 15–30K / 30–50K / 50–100K / 100K+.
3. **Three huge circles** Name / Email / Message + "LET'S DO THIS | OR SEND EMAIL" ([Umault](https://www.awwwards.com/inspiration/big-form-umault)).
4. **The page shrinks into a card** that becomes the form ([Eva Habermann](https://www.awwwards.com/inspiration/eva-habermann-contact-form-scale-transition)); a slide-in panel ([Otherlife](https://www.awwwards.com/inspiration/contact-form-opening-animation-otherlife)).
5. Giant caps statement + photo + repeating-text band ("READY WHEN YOU ARE." Donprod); K72 "TO TALK ABOUT NOTHING IN PARTICULAR".

### About / team (300)
"WE ARE" thin serif with a photo inside the letters ([Boyd](https://www.awwwards.com/inspiration/about-page-boyd)); team as a **list of names with the portrait on hover** ([Quatre Cent Quatre](https://www.awwwards.com/inspiration/team-section-quatrecentquatre)); the team as a **line drawing** standing in a row (Kin); a paragraph with italic serif words over a cinematic still ([Thibaud Fellay](https://www.awwwards.com/inspiration/about-page-hover-thibaud-fellay-portfolio-24)); a vertical giant name + "what's in my bag" flat-lay; B/W childhood photos under a marquee with handwritten pink words ([Bulletproof](https://www.awwwards.com/inspiration/bulletproof-strategic-brand-design-agency)).

### Product pages (141) and e-commerce (295)
Flavour carousel with a giant ghost name ([Argeta](https://www.awwwards.com/inspiration/products-argeta-2)); configurator ([AIAIAI TMA-2](https://www.awwwards.com/inspiration/product-editor-tma-2), [Lacoste colours](https://www.awwwards.com/inspiration/Animation-and-custom-color-of-Lacoste-polo)); per-product colour ground ([Simply Chocolate](https://www.awwwards.com/inspiration/simply-chocolate-product-page), [Bennett Tea](https://www.awwwards.com/inspiration/bennett-tea-color-palette-product-page)); a buying panel over action video ([X-Bionic](https://www.awwwards.com/inspiration/buying-panel-x-bionic-terraskin-x00-c)); a cart drawer ([Oakame](https://www.awwwards.com/inspiration/shopping-cart-oakame)); "Explain it like I'm 5" ([Opal](https://www.awwwards.com/inspiration/explain-it-like-i-m-a-5-yo-opal-tadpole)); a dangling speaker you pull ([Toyfight](https://www.awwwards.com/inspiration/say-hello-toyfight-1)); feature slides on flat orange with a 3D object ([Grab&Go](https://www.awwwards.com/inspiration/grab-go-stores-location-grab-go)); a colourway showroom grid ([sneaker showroom](https://www.awwwards.com/inspiration/virtual-showroom-sneaker-brand)).

### Search and filters (77 + 39)
Colour-swatch squares floating round a giant name ([Mario Roudil](https://www.awwwards.com/inspiration/filter-animtion-mario-roudil)); sentence search "Looking for [design] in [everywhere]" with frequency / A–Z / random ([GCD Studio](https://www.awwwards.com/inspiration/index-page-gcd-studio)); "Type an artist name" ([Arts Project Australia](https://www.awwwards.com/inspiration/custom-artist-search-arts-project-australia)); giant category words with counts "LAMPE(4)" ([custom image searching](https://www.awwwards.com/inspiration/custom-image-searching)); a frosted filter sheet; a floating Filter pill (pontusrudolfson.com).

### Cookie notes (74) and microcopy (98)
Cookie as a round blob "Ok / Functional only" ([PichiAvo](https://www.awwwards.com/inspiration/pichiavo-hero-cookie-policy)); a marquee accept button ([Lemkus](https://www.awwwards.com/inspiration/lemkus-lifestyle-magazine)); "We don't use cookies yet, but you never know" ([Stykovka](https://www.awwwards.com/inspiration/stykovka-cookies)); consent as the entry gate ([this place [of mine]](https://www.awwwards.com/inspiration/this-place-of-mine-cookie-policy)); a script "Cookies" card (era-residence.com). Microcopy: "nerdy reads for your inbox biome" ([Seed](https://www.awwwards.com/inspiration/seed-nerdy-reads-email-sign-up)); dark mode that "saves 30% battery" ([change mode](https://www.awwwards.com/inspiration/change-mode-popup)); googly-eyes "OVER HERE" ([Jomor](https://www.awwwards.com/inspiration/jomor-design-hover-effects)); "PUSH ME" submit; "Make the logo bigger" (designoffice.nz).

### Text marquees (40)
Bilingual serif/sans rows ([Dola](https://www.awwwards.com/inspiration/dola-marquee-text)); a "BUY NOW ✦" badge frame round a product ([Mama Joyce](https://www.awwwards.com/inspiration/mama-joyce-peppa-sauce-animated-call-to-action-button)); text running round the four edges of a portrait ([Togethxr](https://www.awwwards.com/inspiration/togethxr-scrolling-text)); marquee inside pill buttons on hover ([Miranda Biondi](https://www.awwwards.com/inspiration/miranda-biondi-marquee-text-mouse-over)); an age gate in marquee rows ([Esfuerzo Mezcal](https://www.awwwards.com/inspiration/esfuerzomezcal-text-marquee-privacy-policy)); a line-up as giant names ([Mutek](https://www.awwwards.com/inspiration/mutek-festival-artist-line-up)).

### Video and audio players (95)
A film-strip of thumbnails under the main video ([view changer](https://www.awwwards.com/inspiration/video-view-changer-submission-67a26ad2b55d5888810030)); scroll-driven video with "Forward / Pause" + timecode ([Petra Garmon](https://www.awwwards.com/inspiration/single-video-player-desktop-petra-garmon)); a podcast chapter pill over an illustrated street ([audio timeline](https://www.awwwards.com/inspiration/smiling-audio-timeline-the-search-for-work-happiness)); a song page with lyrics / liner notes / credits tabs.

### Minigames and gestures (73 + 150)
Snake hidden in a feed ([Stripe dev](https://www.awwwards.com/inspiration/console-snake-stripe-dot-dev)); click-to-pop arcade ([Analogue](https://www.awwwards.com/inspiration/arcade-game-analogue)); connect-the-dots → colouring page ([Woset](https://www.awwwards.com/inspiration/woset-gamification)); a pixel drawing canvas ([Lama Lama](https://www.awwwards.com/inspiration/lama-lama-canvas-drawing)); a "SHUFFLE" button ([Victoire Douy](https://www.awwwards.com/inspiration/victoire-douy-portfolio-playful-interaction)); illustrated "how it works" cards ([Don't Board Me](https://www.awwwards.com/inspiration/how-it-works-dont-board-me-1)); a dial quiz ([Acura](https://www.awwwards.com/inspiration/quiz-questions-acura-unlock-your-energy)); a lanyard badge that swings ([Next.js Conf](https://www.awwwards.com/inspiration/interactive-elements-1)); press-and-hold reveal ([Cowboy](https://www.awwwards.com/inspiration/cowboys-u-s-launch-teaser)); long-press paints a watercolour ([David Whyte](https://www.awwwards.com/inspiration/longpress-landscape-reveal-david-whyte-experience)).

### Storytelling (91)
An isometric diorama zoom with an info card ([RSPCA](https://www.awwwards.com/inspiration/world-zoom-rspca-animal-futures)); archive photos scattered on a map with a giant year ([Kalso](https://www.awwwards.com/inspiration/kalso-mega-scrolling-storytelling-experience)); painting crops + serif ([VENUS](https://www.awwwards.com/inspiration/venus-non-commercial-project-by-loonar-studios)); a flat map with country stickers ([Ukraine #30ua](https://www.awwwards.com/inspiration/30th-anniversary-of-ukraine-scroll-triggered-animations)); landscapes painted in as you scroll ([David Whyte](https://www.awwwards.com/inspiration/scroll-through-the-different-landscapes-david-whyte-experience)).

---

## 5. The 30 most transferable ideas — and what OpusKit already has

Compared with `src/data/patterns.ts` (heroes, sections, signaturePatterns, concepts, navStyles, footerStyles),
`src/data/pieces.ts` and the looks in `src/data/taxonomy.ts`.
**NEW** = nothing like it; **BETTER-VERSION-OF** = we have the idea, the best sites do it better or in more ways;
**ALREADY-HAVE** = covered, keep.

| # | Idea | What it is | Why it works | Examples | Layer | Status |
|---|---|---|---|---|---|---|
| 1 | Mad-lib contact form | The form is one sentence with blanks and chips: "Hi, I'm ___ from ___, I'd like to talk about [Brand] [Website]; budget [30–50K]" in big light type | Feels like writing a letter, not filling a form; doubles as personality | [form example](https://www.awwwards.com/inspiration/contact-form-terradactyl), [IKEA](https://www.awwwards.com/inspiration/ikea-family-natural-language-form) | section (contact-cta / contact page look) | **NEW** |
| 2 | Footer that takes the brief | Footer holds email + "project is about" + budget chips + send | Visitors who reach the end are ready; no extra page | noomoagency.com, [Cocota](https://www.awwwards.com/inspiration/cocota-contact-form-cocota) | footer | **BETTER-VERSION-OF** `contact` footer |
| 3 | Wordmark footer treatments | The giant name — but cropped by the bottom edge, outlined, repeated as a pattern, a dot-matrix marquee, multicolour letters, or over a photo | The most common premium ending (≈40/154); treatments stop every site ending the same | akaru.fr, sharplink.com, 2xa.studio, noho.ink, alethia.earth | footer | **BETTER-VERSION-OF** `wordmark` |
| 4 | Index footer | Footer lists every page, service, product and post in 3–4 columns with tiny icons/bullets | A sitemap that shows depth; calm end for content-rich sites | oimachi.co, pangrampangram.com, animejs.com | footer | **NEW** footer style |
| 5 | Live line in the chrome | Local time + "online" / "booking Q4", city clocks, or live numbers in nav/footer | Proves a real, present team; cheap; ages well | boc.studio, bennettandclive.com, seasats.com, bymonolog.com | nav / footer detail | **BETTER-VERSION-OF** `live-status` (today tied to the live-console concept; make it a free detail) |
| 6 | Client names as the proof | Clients set as giant type (stacked over the hero photo, or a serif list with full stops) instead of a logo strip | Type reads as confidence; logos read as template | bennettandclive.com, yambo-studio.com, herocollective.co | section (clients look) | **BETTER-VERSION-OF** `clients` |
| 7 | Mono work index with counts | "WORK [14]" then a table: name / client / type / year; row hover shows the image | Fast to scan, editorial, scales to 50 projects | [Inkfish](https://www.awwwards.com/inspiration/work-hover-inkfish), thelinestudio.com, yambo-studio.com | section (featured-work look) | **BETTER-VERSION-OF** `hover-preview-list` |
| 8 | Counts on labels | Superscript or bracket counts on nav, filters and categories: Work[17], LAMPE⁽⁴⁾, sculptures³ | Tiny, precise, says "there is a lot here" | inkfishnyc.com, [image search](https://www.awwwards.com/inspiration/custom-image-searching), [Cream Co.](https://www.awwwards.com/inspiration/cream-co-typography-layout) | piece / look rule | **NEW** |
| 9 | Paragraph with images and footnotes | An intro sentence with small images between words and (1)(2) footnote marks that link | Turns the about line into the hero; very current | watson.la, 2xa.studio, paulkalkbrenner.net, [Max Kaplun](https://www.awwwards.com/inspiration/max-kaplun-portfolio) | hero / piece | **BETTER-VERSION-OF** `media-between-text` (add footnotes, inline logos) |
| 10 | The site is an object | One real-world object is the interface: a street pole with signs, a drum machine, file-cabinet tabs, a sound board | Instantly memorable; the brand metaphor does the navigation | hirotos.com, [Analogue sound board](https://www.awwwards.com/inspiration/contact-sound-board-analogue), mosbyfiles.com, [RCA 404](https://www.awwwards.com/inspiration/rca-records-404-page-rca-records) | big idea (concept) | **NEW** |
| 11 | Brand-mark mask loader | The logo/number is a window with a photo playing inside, then it grows into the hero | The loader becomes branding, not waiting | landonorris.com, [walbi](https://www.awwwards.com/inspiration/intro-loading-animation-walbi), [P10](https://www.awwwards.com/inspiration/p10-loading-pesquera-diez-p10) | piece (preloader variant) | **BETTER-VERSION-OF** `preloader` |
| 12 | Quiet gate | Wordmark + one line + "Enter" (+ "best with sound"), also age gates and acknowledgements | Sets the tone; the legit place for sound and consent | unseen.co, siena.film, immersivebags.miumiu.com, quin.org.au | piece / big idea | **BETTER-VERSION-OF** `entry-gate` (add a non-playful gate) |
| 13 | Product stage with variant switcher | Product on a lit pedestal; picking a flavour/colour swaps the product, its name and the ground | Makes a small range feel like a launch | ciaoenergy.com, [Argeta](https://www.awwwards.com/inspiration/products-argeta-2), [Simply Chocolate](https://www.awwwards.com/inspiration/simply-chocolate-product-page) | section (product-highlight look) | **BETTER-VERSION-OF** `theme-per-variant` + `product-stage` hero |
| 14 | Build-your-own configurator | Choose parts/colours, the preview and price follow | The highest-intent interaction in e-com; fun | [AIAIAI TMA-2](https://www.awwwards.com/inspiration/product-editor-tma-2), [Lacoste](https://www.awwwards.com/inspiration/Animation-and-custom-color-of-Lacoste-polo), builder.campsuha.com | section | **NEW** |
| 15 | Living video wall | A grid of autoplaying clips that reshuffle; click one to open | Shows a body of moving work at once | partizan.com, [video contact sheet](https://www.awwwards.com/inspiration/case-study-gallery-super-evil-genius-corp) | section / image presentation | **NEW** |
| 16 | Case titles as covers | Each case is a giant client word over its image ("TIAA", "GOOGLE") with a two-line caption | Loud covers, quiet captions — magazine rhythm | herocollective.co, synchrodogs.com | section (featured-work look) | **BETTER-VERSION-OF** `featured-work` / `loud-and-quiet` |
| 17 | Tall colour accordion cards | 3–5 tall cards, each its own colour, titles vertical; one widens on hover/click | Turns categories into a bold, compact object | realevate.agency, [Next Big Thing](https://www.awwwards.com/inspiration/horizontal-fold-out-menu-next-big-thing) | section (categories / collection look) | **BETTER-VERSION-OF** `expandable-cards` |
| 18 | Bento chapter index | A grid of flat-colour tiles (Logo, Colour, Type, Motion…) each opening its chapter | One glance shows the whole site; colourful without chaos | brand.dropbox.com, oimachi.co, aspensearch.com (bento footer) | section / layout | **NEW** (bento exists only as a look) |
| 19 | Chapter deck | The page as numbered full-screen slides with ← → and an Index | Reads like a presentation — guidelines, reports, courses | brand.squarespace.com, dragonfly2.studiofreight.dev | layout / big idea | **NEW** |
| 20 | Paper and print | Newspaper columns, torn-paper edges between clean and raw bands, page-flip transitions, covers as doors | Tactile; instantly not-a-template | niccolomiranda.com, serotoninn.com, [page flip](https://www.awwwards.com/inspiration/page-flip-seasoned), hollywoodexhibit2026.com | look + piece (torn divider) | **BETTER-VERSION-OF** looks `news-grid` / `scrapbook` (torn-edge divider is NEW) |
| 21 | Engraving / two-colour illustration | Engraved or riso-style two-colour drawings as the brand layer (hero or footer) | Warm, ownable, no stock photo needed | sondaven.com, illoca.unseen.co, [Social Impact Capital](https://www.awwwards.com/inspiration/subscribe-form-social-impact-capital) | look / media | **NEW** |
| 22 | Sketch that draws itself | A pencil/line drawing traced on scroll (architect's sketch, a pipe, construction lines) | Process made visible; perfect for makers and architects | gehry.getty.edu, sstr.tech, xv.labienal.es | hero / signature moment | **BETTER-VERSION-OF** `timeline-line` |
| 23 | Viewport frame | Letters, labels or HUD brackets pinned to the four corners of the screen | Every screen feels composed; cheap | dragonfly2.studiofreight.dev, 21hrs.space, [letterbox loader](https://www.awwwards.com/inspiration/intro-animation-and-horizontal-scroll-heloise-thibodeau-architecte-1) | piece (site-wide) | **NEW** |
| 24 | Dithered photos in a hairline grid | Halftone/dither applied to the photos, set in a 1px Swiss grid with one colour block | Technical-premium; unifies mixed photos | aspensearch.com, quin.org.au | look / photo treatment | **BETTER-VERSION-OF** `shader-dither` + `grid-pattern` (apply to photos, not only backgrounds) |
| 25 | Two doors | The first choice is between two big cards (city, gallery, audience) | Clear, playful, routes visitors early | parisbyemily.com, hollywoodexhibit2026.com, landonorris.com (on/off track) | hero / section | **NEW** |
| 26 | Script signature over type | A handwritten word/signature laid over a headline or logo | Human, luxurious; personal brands love it | landonorris.com, era-residence.com, pensatori-irrazionali.com | piece | **NEW** |
| 27 | Explorable map with hotspots | After the hero, a map/terrain with labelled hotspots that open cards | Exploration beats reading for places and histories | 21hrs.space, getty.edu/persepolis, [RSPCA](https://www.awwwards.com/inspiration/world-zoom-rspca-animal-futures) | big idea | **BETTER-VERSION-OF** `guided-walk` |
| 28 | Toys, not just gates | Small optional games inside the page: snake in a list, connect-the-dots, a pixel canvas, a shuffle button, a pit-stop | Rewards curiosity; gets shared | [Stripe snake](https://www.awwwards.com/inspiration/console-snake-stripe-dot-dev), [Woset](https://www.awwwards.com/inspiration/woset-gamification), [Lama Lama](https://www.awwwards.com/inspiration/lama-lama-canvas-drawing), [shuffle](https://www.awwwards.com/inspiration/victoire-douy-portfolio-playful-interaction) | piece / signature moment | **BETTER-VERSION-OF** `playful-way-in` |
| 29 | Voice in the small print | Funny cookie notes, joke buttons, a 404 with a story, newsletter promises ("nerdy reads for your inbox biome") | Personality where nobody expects it; costs words, not code | [Stykovka](https://www.awwwards.com/inspiration/stykovka-cookies), designoffice.nz, studio-size.com, [Seed](https://www.awwwards.com/inspiration/seed-nerdy-reads-email-sign-up) | big idea / copy in the Build Package | **BETTER-VERSION-OF** `cookie-note` (extend to buttons, 404, newsletter) |
| 30 | Event dates as the headline | Dates set as the biggest type, the line-up as a marquee, a pattern made from the event's letters | The one fact visitors need, made iconic | c2mtl.koki-kiko.com, thessalonikistopiato.gr, festivent.ca, [Mutek](https://www.awwwards.com/inspiration/mutek-festival-artist-line-up) | hero / section (schedule look) | **BETTER-VERSION-OF** `type-statement` hero + `schedule` |

Confirmed **ALREADY-HAVE** (keep; they are everywhere in the sample): product as sculpture (`product-stage` hero), rotating
word (`word-rotate` / `text-loop` — Kriss, Getty), photo between words (`media-between-text`), infinite drag canvas
(`image-field` — Gil Huybrecht, Garden Eight), 3D image ring (`ring-carousel` — Cipher), words lighting up as you read
(`reading-highlight` — Sharplink), giant chapter words (`giant-chapters`), console chrome (`live-console` — Pensatori),
italic/roman two-voice headline (`duo-headline` — Vero, Sobha, Slow Down), hover image list (`hover-preview-list`), marquee
ribbons (`velocity-marquee`), stickers, pixel transition, curtain/blob page transitions, brand cursor, sound with mute
(`ambient-sound`), full-screen menu with image hover (`fullscreen-menu`), left side index (`side-index`).

### Gaps worth noting (missing types rather than ideas)
- **Navs**: a right-edge vertical tab menu (Seasats, C2) and a "status bar" nav (time + online) are not navStyles yet.
- **Looks**: 90s Memphis (Decathlon Yestalgia), engraving/etching, two-colour riso illustration, newspaper print, halftone
  Swiss — partly touched by `retro-seventies`, `scrapbook`, `news-grid`, `technical-minimal`, but none as its own recipe.
- **Sections**: an events list with price + "Save my spot" (nonprofits, venues); a donation appeal card with preset amounts
  and the raised total (better `donate`); configurator; video wall; bento index.
- **Pages**: the 404 is a showcase category of its own (475 items) — worth 3–4 looks of the `not-found` page.

---

## 6. Every site looked at

Name — url — kind — one-line note (award and collection membership are in the JSON). Live visits marked ●; ○ = Awwwards
page only (site blocked, geo-fenced or gone at visit time).

- ● **Yucca Packaging** — https://yucca.co.za/ — B2B packaging — industry cards in footer
- ● **Aspen Search** — https://www.aspensearch.com/ — B2B services (exec search) — halftone/dither photos inside a hairline grid
- ● **Yambo Studio** — https://www.yambo-studio.com/ — CGI studio — client names as the hero
- ● **Illoca** — https://illoca.unseen.co/ — SaaS (AI for architects) — scroll zooms from drawing into 3D building
- ● **Cerebrium** — https://cerebrium.ai/ — SaaS (AI infra) — wireframe globe; ribbon shader footer
- ● **Inkwell** — https://inkwell.tech/ — SaaS (AI) — scroll changes the sky/world
- ● **Greenly** — https://greenly.earth/ — SaaS (climate) — cookie-blocked
- ● **Kriss.ai** — https://kriss.ai/ — SaaS (health AI) — rotating role in headline over dollhouse cutaway
- ● **Nory.ai** — https://www.nory.ai/ — SaaS (restaurant AI) — 3D food icons
- ● **Vectr** — https://vectrfl.com/ — SaaS (staffing AI) — isometric city with airflow
- ● **Butter** — https://www.butter.video/ — SaaS (video tool) — iridescent logo footer
- ● **Dragonfly Redux** — https://dragonfly2.studiofreight.dev/ — VC fund (crypto) — letters pinned to the 4 viewport corners
- ● **Locomotive®** — https://locomotive.ca — agency — typographic address footer with icons inside the line
- ● **Unseen Studio** — https://unseen.co/ — agency — cartoon eyes follow cursor on the gate
- ● **Immersive Garden website** — https://immersive-g.com/ — agency — each project is one sculpted 3D object beside a quiet serif caption
- ● **Exo Ape** — https://www.exoape.com — agency — giant light-weight headline over photo
- ● **Lama Lama** — https://lamalama.com/ — agency — pixel canvas drawing toy; bracket buttons
- ● **Akaru** — https://akaru.fr/ — agency — wordmark footer cropped at the edge
- ● **Boc.Studio** — https://boc.studio/ — agency — live local time + online status in nav
- ● **Pensatori Irrazionali** — https://pensatori-irrazionali.com/ — agency — live console with green status dots; client logos on flying 3D ribbons
- ● **Oimachi** — https://www.oimachi.co — agency — footer as complete index of the site
- ● **MONOLOG** — https://bymonolog.com/ — agency — availability line + liquid shader footer
- ● **Warm & Fuzzy** — https://www.warmnfuzzy.tv/ — agency — click-to-copy email; marquee footer
- ● **Studio K95** — https://k95.it — agency — work floats as cards in a navigable 3D space
- ● **TRIONN** — https://trionn.com — agency — sound on hover lines
- ● **2xA Studio** — https://2xa.studio/ — agency — pixel dot-matrix wordmark; two city clocks
- ● **HOBRO DIGITAL** — https://hobro.digital — agency — letters in parentheses that animate
- ● **14islands V4** — https://www.14islands.com/ — agency — big ampersand composition
- ● **Hero Collective** — https://www.herocollective.co/ — agency — hand-drawn circle on a word
- ● **Analogue Agency** — https://analogueagency.com — agency — light-speed lines + one line
- ● **Noomo Agency** — https://noomoagency.com — agency (3D storytelling) — footer IS the brief form with budget chips
- ● **Lusion v3** — https://lusion.co/ — agency (3D) — showreel inside a WebGL portal; counter 0→100 preloader
- ● **Ask Phill** — https://askphill.com — agency (Shopify) — oversized UI
- ● **Watson** — https://watson.la/ — agency (entertainment) — paragraph with small images between words and footnote numbers
- ● **NOTHIN'** — https://www.noth.in — agency (fashion/luxury) — brand pun carried hero to footer
- ● **Glitch&Grit** — https://glitchandgrit.com/ — agency (film) — scrapbook collage with overlapping project titles
- ● **20 Years Inspired by People** — https://inspiring.nk.studio/es — agency anniversary archive — archive of people
- ● **Design Office** — http://designoffice.nz — agency side project — "Make the logo bigger" button joke
- ● **The Line Studio** — https://thelinestudio.com/ — animation studio — stretched wordmark
- ● **Kononenko Architectural Bureau** — https://kononenkogroup.com — architecture — repeating wordmark footer
- ● **cobloc** — https://www.cobloc.archi/ — architecture — material shapes float; infinite scroll
- ● **MAKHNO** — https://makhnostudio.com/ — architecture / hospitality — cinematic render
- ● **Bienal Arquitectura Urbanismo** — https://xv.labienal.es/ — architecture biennial — construction-line letters
- ● **Mosby's Files** — https://www.mosbyfiles.com/ — archive / culture — CSS-only file cabinet tabs
- ● **Julien Calot** — https://www.juliencalot.com — artist portfolio — infinite artwork scroll
- ● **L'OISEAU DÉ** — https://loiseau.framer.website/ — beauty e-commerce — photo + flat colour tile grid
- ● **Cay Skin** — https://cayskin.com/ — beauty e-commerce — press logo marquee
- ● **Lacoste — Polo Factory** — https://members-play.lacoste.com/polo-factory-experience — brand experience / game — customise a polo in a 3D factory
- ● **The Tie-break** — https://thetiebreak.merci-michel.com/ — brand experience / game — tennis mini-game
- ● **Squarespace Foundations** — https://brand.squarespace.com/ — brand guidelines — presentation-style chapter slides with ← →
- ● **Dropbox Brand** — https://brand.dropbox.com/ — brand guidelines — bento tiles that open into chapters
- ● **Slow Down Creative** — http://www.slowdowncreative.com — branding studio — italic-word statement
- ● **Studio Size** — https://studio-size.com/ — branding studio — self-aware footer word
- ● **Petralithe** — https://www.petralithe.com/ — building materials — product spec sheet
- ● **Garden Party** — https://www.shopgardenparty.com/ — cannabis e-commerce — patterned age gate
- ● **Alethia** — https://www.alethia.earth/ — climate data — natural 3D objects floating
- ● **Colonia Zacamil** — https://coloniazacamil.com/ — community / culture — image strip set between giant words
- ● **Michael Gatt** — https://michaelgatt.com/ — composer portfolio — sound-led universe
- ● **Montfort** — https://mont-fort.com/ — corporate (commodities) — extreme restraint
- ● **Microsoft AI** — https://microsoft.ai/ — corporate AI lab — watercolour illustration + signed letter
- ● **Depo Luxe** — https://depoluxe.xyz/ — creative agency (luxury) — cinematic one-project-per-screen slideshow
- ● **AIM — AI Modernism of Kharkiv** — https://aim.obys.agency/ — culture / experiment — Swiss hairline grid
- ● **EDOLUS** — https://edolus.com/ — deep tech (AI) — headphones prompt; cinematic sound
- ● **USAvionix** — https://www.usavionix.com/ — deep tech (defence drones) — outlined wordmark behind the product
- ● **Seasats** — https://www.seasats.com/ — deep tech (marine robotics) — vertical tab menu; live telemetry numbers in footer
- ● **Made With Gsap** — https://madewithgsap.com/ — developer resource — centre card between two halves of the headline
- ● **Anime.js** — https://animejs.com — developer tool — exploded technical line drawings
- ● **Sculpting Harmony** — https://gehry.getty.edu/ — digital exhibition (Getty) — pencil sketch lines draw on scroll; sound
- ● **Artem Shcherbakov** — https://artemartemartem.com/ — director portfolio — hand-drawn doodles around type
- ● **Mate Libre** — https://matelibre.com — drink e-commerce — still-life photo + lowercase headline
- ● **Rebel Rabbit Seltzer** — https://drinkrebelrabbit.com/ — drink e-commerce — dark product carousel
- ● **Decathlon Yestalgia** — https://decathlonyestalgia.com/ — e-commerce capsule (retro) — 90s Memphis kit: squiggles, grid floor, bolts
- ● **Serotoninn** — https://serotoninn.com/ — e-commerce fashion — torn-paper edge between clean shop and grungy editorial
- ● **Mana Yerba Mate** — https://en.manayerbamate.com/ — e-commerce food & drink — can travels and rotates down the page (one guide); flavour carousel with own colours
- ● **Aardvark Book Club** — https://aardvarkbookclub.com — e-commerce subscription — candy-flat colour blocks per section
- ● **Tibico Health** — https://www.tibicohealth.com/ — e-commerce wellness — subscription-first
- ● **Why Zero** — https://why.zero.university/ — education (immersive) — circular progress ring; sound
- ● **C2 Montréal** — https://c2mtl.koki-kiko.com/ — event (conference) — vertical side nav; dates as giant type
- ● **Hearst Exhibit 2026** — https://www.hollywoodexhibit2026.com — exhibition (photography) — two magazine covers as doors
- ● **21 Hrs On The Moon** — https://www.21hrs.space/ — exhibition / culture — scroll-to-land then explore a map with hotspots
- ● **Festivent** — https://festivent.ca/ — festival — line-up marquee
- ● **Siena Film Foundation** — https://siena.film — film production — procedural slider that re-arranges posters into a grid
- ● **Sharplink** — https://www.sharplink.com/ — finance (Ethereum treasury) — words light up as you read
- ● **Moto Finance** — https://www.moto-card.com/ — fintech (card) — product treated like a sculpture in a gallery
- ● **Energym - Shopify Ecommerce** — https://energym.io/ — fitness hardware shop — italic condensed claim over bike silhouette
- ● **Thessaloniki Sto Piato** — https://thessalonikistopiato.gr — food festival — pixel pattern built from Greek letters
- ● **Jesper Landberg** — http://jesperlandberg.com — freelance portfolio — curved cylinder carousel; star-wars text crawl
- ● **Gil Huybrecht** — https://gilhuybrecht.com/ — freelance portfolio — infinite drag canvas
- ● **Léo Parpeix - Portfolio 2026** — https://leoparpeix.com/ — freelance portfolio — 3D mascot that follows the cursor
- ● **Gionatan Nese '26** — https://www.gionatannese.com/ — freelance portfolio — circular project clock; sound
- ● **Hiroto Sato** — https://www.hirotos.com — freelance portfolio — real-world object as navigation
- ● **Miranda – Paper Portfolio** — https://niccolomiranda.com — freelance portfolio — portfolio as a printed newspaper
- ● **MEER MOHSIN** — https://www.meermohsin.me/ — freelance portfolio — gothic 3D emblem with script marquee
- ● **bleibtgleich'26** — https://bleibtgleich.dev — freelance portfolio — wordmark split to the two edges
- ● **Bruno's Portfolio** — https://bruno-simon.com — freelance portfolio (game) — drive a car to explore
- ● **Noho** — https://noho.ink — furniture brand (concept) — checkerboard of people-on-chairs tiles
- ● **Lyon Béton** — https://lyon-beton.com/ — furniture e-commerce — collections as a centred word index
- ● **Messenger** — https://messenger.abeto.co — game / experiment — multiplayer letter-delivery game on a planet
- ● **Zentry** — https://zentry.com/ — gaming / web3 — polygon clip-path reveal of video
- ● **Chalet Matthe** — https://www.chaletmatthe.sk/ — holiday rental — interior photo + serif title
- ● **Palazzo Sogni** — https://www.palazzosogni.com — hotel — facade illustration as footer
- ● **Son Daven** — https://sondaven.com/en — hotel / investment — engraving illustration footer; investment stats in hero
- ● **CoMinVi** — https://www.cominvi.com.mx/ — industrial (mining) — line-icon service grid
- ● **SSTR - Friction Reduction** — https://sstr.tech/en/ — industrial (oil drilling) — line-drawn pipe that draws itself
- ● **CoffeeTech®** — https://coffee-tech.com/ — industrial manufacturer — founder note with signature
- ● **Ponpon Mania** — https://ponpon-mania.com/ — interactive comic — scroll-read comic
- ● **Annie Downing Interiors** — https://anniedowning.com/ — interior design — light serif on dusty pink
- ● **House of Honey** — https://www.houseofhoney.com/ — interior design studio — giant arch shapes in footer
- ● **Don't Board Me** — https://dontboardme.com — local service (pet care) — mini-game entry gate; Lottie illustrations
- ● **United Carriers** — https://unitedcarriers.com/ — logistics — industries marquee
- ● **Terminal Industries** — https://terminal-industries.com — logistics tech — hairline grid chrome
- ● **Brunello Cucinelli - AI E-com** — https://shop.brunellocucinelli.com/en-gb/ai — luxury e-commerce (AI) — intent-led AI shopping instead of pages
- ● **Vero New-York** — https://verostudio.com/ — luxury e-commerce / atelier — italic lower + roman caps mixed statement
- ● **MIU MIU A House that we shaped** — https://immersivebags.miumiu.com/ — luxury fashion campaign — explore a house to find the bags
- ● **Tengile Malamala Collection** — https://tengilemalamala.com/ — luxury hospitality (safari) — staggered thin serif over photo
- ● **White Desert** — https://white-desert.com/ — luxury travel — glass card over texture; condensed wordmark footer
- ● **Tracing Art** — https://www.getty.edu/tracingart/ — museum research (Getty) — rotating word inside the statement; giant names over paintings
- ● **No Art** — https://www.noartmusic.com/ — music/art collective + shop — merch shown on real people
- ● **RadiatingHope®** — https://radiatinghope.org/ — nonprofit (health) — events list with price + save my spot
- ● **QUIN: Queer Info Network** — https://www.quin.org.au/ — nonprofit (health) — vintage zine halftone
- ● **AMPLIFY Australia** — https://www.amplifyaus.org/ — nonprofit / campaign — campaign cards
- ● **Lando Norris** — https://landonorris.com/ — personal brand / sports — his race number as the loader mask; signature script scribbled over headlines; 3D helmet viewer
- ● **Body of Water** — https://www.bodyofwateranthology.com — photo anthology — horizontal photo story with colour blocks
- ● **Diana Toloza - Portfolio 2024** — https://dianatoloza.co — photographer — loose scattered grid
- ● **Pontus Rudolfson** — https://www.pontusrudolfson.com — photographer — floating filter pill
- ● **Synchrodogs Portfolio** — https://synchrodogs.com/ — photographers — mirrored photo; projects titled huge
- ● **David Whyte Experience** — https://davidwhyte.com/experience/ — poet / subscription — long-press to paint the landscape in
- ● **/zeroz Brand Site** — https://otsuka-air.jp/ — product brand (food tech) — parentheses around the product as a typographic device
- ● **Cris.Araújo** — https://cristianaaraujo.com/ — product designer — phone UI mockups on dark
- ● **CIAO ENERGY - LAUNCH WEBSITE** — https://www.ciaoenergy.com/ — product launch (drink) — flavour switcher on a lit pedestal
- ● **Radian** — https://www.rideradian.com/ — product launch (e-moto) — classic product launch
- ● **Opal Tadpole** — https://www.opalcamera.com/opal-tadpole — product launch (hardware) — founder letter over a table photo; footer wordmark pattern
- ● **Oryzo AI** — https://oryzo.ai — product launch parody — luxury launch for a coaster (humour)
- ● **The Renaissance Edition** — https://www.shopify.com/editions/winter2026 — product release notes (Shopify) — torn-paper painting collages
- ● **Cipher** — https://cipher.tv/ — production / portfolio — drag-to-spin 3D image ring
- ● **Inkfish** — https://inkfishnyc.com/ — production company — mono table index with hover image; live clock
- ● **Partizan** — https://partizan.com/ — production company — mosaic of autoplaying clips that keep reshuffling
- ● **Bennett & Clive** — https://bennettandclive.com — production company — client-name stack over the hero photo; city clocks
- ● **LIKOVA** — https://likova.space — real estate (business centre) — scroll-driven camera around 3D building
- ● **ERA Residence** — https://www.era-residence.com/ — real estate (luxury) — script + condensed serif pairing; phone number as display type
- ● **Sobha Privy Collection** — https://sobha-privy-collection.com/ — real estate (ultra luxury) — staggered interior photos converging
- ● **Realevate** — https://realevate.agency/ — real estate agency — collections as tall coloured accordion cards with vertical titles
- ● **NORMAL IS BORING** — https://normalisboring.es/ — real estate brand — cropped giant Didone letters behind project cards
- ● **Ai in Design Report 2026** — https://stateofaidesign.com/ — report / editorial — report numbers as the footer
- ● **MindMarket** — https://mindmarket.com/ — research agency — candy-flat colour per section
- ● **Cob** — https://cobfoods.com — snack e-commerce — flower badge popup
- ● **Paris by Emily** — https://www.parisbyemily.com/ — travel / TV tie-in — choose-your-path cards
- ● **Pangram Pangram Foundry** — https://pangrampangram.com/ — type foundry shop — each card shows its own font
- ● **PP Neue Montreal** — https://neuemontreal.com/ — type foundry specimen — type specimen as a travel guide
- ● **Floema** — https://www.floema.com/en — urban furniture (B2B) — logo mark as the hero object
- ● **Milledollars** — https://milledollars.fr/ — video production — cards that open into full-screen films
- ● **Igloo Inc** — https://www.igloo.inc/ — web3 company / experiment — scroll moves a camera through 3 sculpted objects; HUD coordinates/dates
- ● **Navigate** — https://nvg8.io/ — web3 data platform — gamified data world
- ● **Pasqua Wines** — https://pasqua.it/ — wine brand — painted landscape as the entry

### Award pages read on Awwwards (palette, tags, description, elements) but not visited live — 129 sites

- LxL Creative — https://www.lxlcreative.co.uk/ — SOTD 2026 — Film & TV, Colorful, Navigation Menu, Transitions, Microinteractions, 
- L.I.S.A. — https://lisa.locomotive.ca/en — SOTD 2026 — Design Agencies, Technology, Experimental, Animation, 3D, Content arch
- The Tuscan Journey Begins — https://weekend-mm-2026-pasticcino-bag-master.monogrid.io/en/ — SOTD 2026 — Fashion, Music & Sound, Illustration, Sound-Audio, Storytelling, Gestu
- Trevor Noah — https://www.trevornoah.com/ — SOTD 2026 — Culture & Education, Promotional, Colorful, Typography, Storytelling, 
- Paul Kalkbrenner — https://www.paulkalkbrenner.net/ — SOTD 2026 — Art & Illustration, Music & Sound, Big Background Images, Clean, Flat 
- The state of the gallery — https://mesh3d.gallery/the-state-of-the-gallery — SOTD 2026 — Technology, Experimental, Scrolling, Single page, Data Visualization, 
- The Watch — https://thewatch.60fps.fr/ — SOTD 2026 — Experimental, Luxury, 360, 3D, Project Page, WebGL, Three.js
- PX PUSH — https://pxpush.com/ — SOTD 2026 — Business & Corporate, Design Agencies, Technology, Animation, Portfoli
- HAOQI.DESIGN — https://haoqi.design — SOTD 2026 — Design Agencies, Portfolio, Scrolling, Gallery, 3D, UI design, next.js
- Revelatio Studio — https://revelatio.studio/ — SOTD 2026 — Promotional, Photography, Clean, Unusual Navigation, Interaction Desig
- Produx Design — https://www.produx.design — SOTD 2026 — Design Agencies, Animation, 3D, Filters and Effects, 404 pages, GSAP, 
- Lacoste Ace Breaker — https://members-play.lacoste.com/ace-breaker-rg — SOTD 2026 — Fashion, Games & Entertainment, Sports, Fullscreen, Unusual Navigation
- Noomo Showcase — https://showcase.noomoagency.com — SOTD 2026 — Design Agencies, Promotional, Animation, Scrolling, Data Visualization
- Obys® Experiment Space — https://experiment.obys.agency/ — SOTD 2026 — Art & Illustration, Design Agencies, Experimental, Animation, Clean, T
- Spotify Wrapped Party — https://wrapped-party.activetheory.dev — SOTD 2026 — Games & Entertainment, Mobile & Apps, Music & Sound, Animation, Transi
- IZANAMI — https://izanami-official.com/ — SOTD 2026 — Art & Illustration, Business & Corporate, Scrolling, Typography, Story
- RISK — https://www.risk.film — SOTD 2026 — Film & TV, Animation, Fullscreen, Horizontal Layout, Infinite Scroll, 
- Longbow — https://db-longbow.webflow.io/ — SOTD 2026 — Promotional, Technology, Typography, Photo & Video, UI design, Footer 
- Hildén & Kaira — https://www.hildenkaira.fi/ — SOTD 2026 — Business & Corporate, Film & TV, Social responsibility, Social Integra
- GQ & AP The Extraordinary Lab — https://www.gq.com/sponsored/story/the-extraordinary-lab — SOTM 2026 — Fashion, Experimental, Responsive Design, 3D, Gestures / Interaction, 
- Cartier Watches & Wonders 2025 — https://cartier-waw-0225.dev.60fps.fr/ — SOTM 2025 — Experimental, Luxury, Animation, Responsive Design, Scrolling, 3D, Ges
- Active Theory V6 — http://activetheory.net — SOTM 2024 — Design Agencies, Technology, Colorful, 3D, Filters and Effects
- The Fabulous Cartier Journey — https://www.cartier.com/thefabulouscartierjourney — SOTM 2023 — Fashion, Games & Entertainment, Experimental, Animation, Big Backgroun
- Önnu Jónu Son — https://onnujonuson.com/clip/almost-over-you — SOTM 2023 — Music & Sound, Promotional, Animation, Typography, Transitions, Sound-
- Aten7 — https://www.aten7.com/ — SOTM 2023 — Games & Entertainment, Experimental, Animation, Responsive Design, Scr
- SILENCIO - DIGITAL PRODUCTS — https://silencio.es/ — SOTM 2023 — Design Agencies, Food & Drink, Graphic design, Scrolling, Sound-Audio,
- The Hall of Zero Limits — https://wakanda-forever-master.dogstudio-dev.co/zerolimits — SOTM 2023 — Architecture, Food & Drink, Promotional, Fullscreen, Scrolling, 3D
- KPR — https://kprverse.com/ — SOTY 2022 — Art & Illustration, Experimental, Animation, Colorful, Scrolling, Illu
- Adobe X Bowie — https://adobexbowie75.com/ — SOTM 2022 — Art & Illustration, Culture & Education, Games & Entertainment, Typogr
- Spotify -  Astrology Club — https://astrologyclub.byspotify.com — SOTM 2022 — Music & Sound, Animation, Colorful, Illustration, CSS, HTML5, WebGL
- B/D® JAMS — http://jams.basicagency.com — SOTM 2022 — Design Agencies, Music & Sound, Experimental, Colorful, Scrolling, Unu
- Coastal World — https://coastalworld.com — SOTM 2022 — Business & Corporate, Games & Entertainment, Colorful, Microinteractio
- Unleashing Your Best Version — https://unleashingbest.com/ — SOTM 2022 — Promotional, Technology, Colorful, Minimal, Typography, Transitions, S
- The Other Side of Truth — https://theothersideoftruth.com — SOTY 2022 — Social responsibility, Scrolling, Single page, 404 pages, WebGL, GSAP,
- Persepolis Reimagined — http://www.getty.edu/persepolis — SOTY 2022 — Architecture, Culture & Education, Scrolling, 360, Data Visualization,
- HAPE — http://www.hape.io — SOTM 2022 — Fashion, Games & Entertainment, Technology, Animation, Single page, 3D
- Welcome To The Continent — https://www.witchernetflix.com/ — SOTM 2022 — Film & TV, Mobile & Apps, Responsive Design, Unusual Navigation, Sound
- Magical Reflections — https://www.magische-spiegelungen.de — SOTM 2022 — Art & Illustration, Technology, Experimental, Clean, Unusual Navigatio
- The Unconventional Gallery — https://unconventionalgallery.ruinart.com — SOTM 2022 — Art & Illustration, Food & Drink, Animation, Gallery, Gestures / Inter
- 20 Years of Xbox Museum — http://museum.xbox.com/ — SOTM 2021 — Events, Games & Entertainment, Promotional, Unusual Navigation, Data V
- Star Atlas — https://staratlas.com — SOTY 2021 — Games & Entertainment, Technology, Storytelling, 3D, Filters and Effec
- The Shift — https://theshift.tokyo/en/ — SOTM 2021 — Business & Corporate, Animation, Clean, WebGL, GSAP, BARBA.js
- Grids — https://grids.obys.agency/ — SOTM 2021 — Culture & Education, Experimental, Animation, Horizontal Layout, Minim
- 2021 Virtual Webbys — https://watch.webbyawards.com/ — SOTM 2021 — Events, Colorful, Graphic design, Video, Filters and Effects, WebGL, P
- The Harmonic State — https://www.ibm.com/resources/activations/harmonic-state — SOTM 2021 — Games & Entertainment, Clean, Sound-Audio, Storytelling, Filters and E
- Aristide – Portfolio 2021 — https://www.aristidebenoist.com — SOTM 2021 — Promotional, Experimental, Graphic design, Portfolio, Interaction Desi
- Prometheus Fuels — https://www.prometheusfuels.com/ — SOTY 2021 — Business & Corporate, Technology, Animation, Clean, Colorful, Fullscre
- Superlist — https://superlist.craftedbygc.com/ — SOTM 2021 — Mobile & Apps, Technology, Startups, Animation, Clean, Illustration, 3
- Into the Storm — http://www.airforce.com/intothestorm — SOTM 2021 — Institutions, Promotional, Animation, Scrolling, Storytelling, 3D, Int
- Umami Land — https://umamiland.withgoogle.com/en — SOTY 2021 — Art & Illustration, Culture & Education, Food & Drink, Animation, App 
- Chungi Folio — https://www.chungiyoo.com/ — SOTY 2021 — Art & Illustration, Promotional, Animation, Colorful, Graphic design, 
- Sea Shepherd - No fishing net — https://www.no-fishing.net — SOTM 2021 — Institutions, Social responsibility, Animation, 3D, WebGL
- Mammut Expedition Baikal — https://eiger-extreme.mammut.com — SOTY 2020 — E-Commerce, Fashion, Sports, Typography, Unusual Navigation, Gallery, 
- Medal of Honor: Above & Beyond — http://www.oculus.com/medalofhonor — SOTM 2020 — Games & Entertainment, Technology, Animation, Parallax, Video, 360, St
- Kode Sports Club — https://www.kodeclubs.com/ — SOTY 2020 — Sports, Animation, Fullscreen, 3D, Three.js
- Dark: Official Netflix Guide — http://darknetflix.io — SOTY 2020 — Film & TV, Promotional, Transitions, Data Visualization, Responsive, S
- CHILE20 — https://adidaschile20.com/ — SOTM 2020 — Fashion, Promotional, Sports, Horizontal Layout, Minimal, Transitions,
- 2°C EARTH — https://www.2-c.earth/ — SOTM 2020 — Culture & Education, Music & Sound, Clean, Parallax, Typography, Sound
- Ali Ali — https://alitwotimes.com/ — SOTM 2020 — Film & TV, Clean, Minimal, Portfolio, Typography, Video, About Page, W
- Synchronized studio — https://synchronized.studio/ — SOTY 2020 — Design Agencies, Promotional, Animation, Parallax, Scrolling, Typograp
- Pioneer - Corn Revolutionized — https://cornrevolution.resn.global/ — SOTY 2020 — Business & Corporate, Scrolling, 3D
- Delassus — https://delassus.com — SOTM 2020 — Food & Drink, Colorful, Fullscreen, Parallax, CSS, HTML5
- Alan Menken — https://www.alanmenken.com/ — SOTM 2020 — Film & TV, Music & Sound, Animation, Portfolio, Typography, Transition
- Powerhouse Company — https://www.powerhouse-company.com/ — SOTM 2020 — Architecture, Animation, Flat Design, Fullscreen, Gallery, UI design, 
- Madeleine Dalla — https://www.madeleinedalla.com — SOTM 2020 — Photography, Experimental, Animation, Portfolio, Typography, Gallery, 
- The Year of Greta — https://theyearofgreta.com/ — SOTM 2020 — Culture & Education, Design Agencies, Single page, Unusual Navigation,
- Apple AirPods Pro — http://apple.com/airpods-pro — SOTM 2020 — Mobile & Apps, Technology, Animation, Graphic design, Scrolling, Singl
- CANALS — https://canals-amsterdam.com/ — SOTM 2019 — Magazine / Newspaper / Blog, Culture & Education, Colorful, Fullscreen
- Editorial New — https://editorialnew.com — SOTM 2019 — Art & Illustration, Promotional, Clean, Parallax, Retro, Typography, M
- MA — https://matruecannabis.com — SOTY 2019 — E-Commerce, Animation, Responsive, 3D, Microinteractions, CSS, HTML5, 
- Once Upon a Time in Hollywood — https://www.onceuponatimemag.com/ — SOTM 2019 — Film & TV, Mobile & Apps, Promotional, Graphic design, Copy design, HT
- The Cool Club x FWA — https://fwa.thecoolclub.co/ — SOTY 2019 — Art & Illustration, Games & Entertainment, Animation, Infinite Scroll,
- The Frontier Within — https://frontierwithin.thorne.com/ — SOTM 2019 — Art & Illustration, Experimental, Fullscreen, Transitions, Storytellin
- Dogstudio — http://www.dogstudio.co — SOTM 2019 — Design Agencies, Animation, Parallax, Transitions, 3D, Wordpress, WebG
- 2018: Year in Review — https://2018.craftedbygc.com/ — SOTM 2019 — Design Agencies, Experimental, Clean, Colorful, Parallax, Gallery, 3D,
- Nomadic Tribe — https://2019.makemepulse.com — SOTY 2019 — Art & Illustration, Experimental, Animation, Colorful, Unusual Navigat
- Everest — https://everest.agency — SOTM 2019 — Business & Corporate, Design Agencies, Minimal, Transitions, 3D, Gestu
- twenty øne piløts - Banditø — https://www.imabandi.to/ — SOTM 2018 — Music & Sound, Animation, Fullscreen, Transitions, Storytelling, 3D, F
- Orano — https://www.orano.group/experience/innovation/en — SOTY 2018 — Business & Corporate, Experimental, Parallax, Unusual Navigation, Tran
- Google Cloud Infrastructure — https://cloud.withgoogle.com/infrastructure/ — SOTM 2018 — Business & Corporate, Technology, Storytelling, 3D, UI design, WebGL, 
- Robin Mastromarino - Portfolio — http://robinmastromarino.com/ — SOTM 2018 — Design Agencies, Animation, Big Background Images, Clean, Portfolio, S
- Beyond Beauty — http://beyond-beauty.co/ — SOTM 2018 — Art & Illustration, Culture & Education, Animation, Graphic design, Il
- Foosball World Cup 18 — https://www.foosballworldcup18.com/ — SOTM 2018 — Games & Entertainment, Sports, Experimental, Colorful, Graphic design,
- koox — http://koox.co.uk/ — SOTY 2018 — Food & Drink, Hotel / Restaurant, Minimal, Responsive Design, Illustra
- Oat the Goat — http://oatthegoat.co.nz/intl.html — SOTM 2018 — Art & Illustration, Music & Sound, Animation, Fullscreen, Horizontal L
- Nike Reactor — https://www.nike-react.com/ — SOTM 2018 — Promotional, Sports, Experimental, Animation, 3D, CSS, WebGL, WebSocke
- Design Canada — https://designcanada.com — SOTM 2018 — Culture & Education, Events, Promotional, Animation, Clean, Flexible, 
- Frans Hals Museum — https://www.franshalsmuseum.nl/en/ — SOTY 2018 — Art & Illustration, Culture & Education, E-Commerce, Animation, Flat D
- Gallery of emerging species — http://playdoh-lagaleriedesespeces.com/en/ — SOTM 2018 — Games & Entertainment, Promotional, Colorful, Parallax, Gallery, 3D, W
- Couro Azul — https://www.couroazul.com/ — SOTM 2018 — Business & Corporate, Promotional, Photography, Animation, Big Backgro
- Active Theory v4 — https://activetheory.net — SOTY 2018 — Design Agencies, Design Websites, Portfolio, Video, Transitions, 3D, W
- TAO TAJIMA | Filmmaker — http://taotajima.jp/ — SOTM 2017 — Film & TV, Minimal, Portfolio, Video, Transitions, 3D, Filters and Eff
- The New Mobile Workforce — https://thenewmobileworkforce.imm-g-prod.com/ — SOTY 2017 — Events, Sports, Technology, Experimental, Transitions, Sound-Audio, 3D
- Simply Chocolate — https://simplychocolate.dk — SOTY 2017 — E-Commerce, Food & Drink, Promotional, Animation, Colorful, Fullscreen
- In My World — http://www.onedayinmyworld.com — SOTM 2017 — Art & Illustration, Culture & Education, Photography, Transitions, Gal
- Welcome to Hogwarts — https://my.pottermore.com/hogwarts — SOTM 2017 — Film & TV, Big Background Images, Fullscreen, Transitions, Storytellin
- Inside The Head — https://insidethehead.co/ — SOTY 2017 — Art & Illustration, Animation, Big Background Images, Clean, Colorful,
- Gleec Chat — https://gleechat.com/ — SOTM 2017 — Mobile & Apps, Promotional, Technology, Scrolling, Unusual Navigation,
- Dunkirk WebVR — https://webvrgame.dunkirkmovie.com/ — SOTY 2017 — Film & TV, Games & Entertainment, Promotional, 360, VR, WebVR, PHP
- OUIGO - Let's play — http://letsplay.ouigo.com — SOTY 2017 — Games & Entertainment, Other, Promotional, jQuery, WebGL, GSAP, PHP, G
- We The Fans — http://www.espn.com/espn/feature/story/_/id/19045647/we-fans-documentary-official-site-espn — SOTM 2017 — Sports, CSS, HTML5, jQuery, GSAP, Modernizr, Zepto, Yepnope, Lo-dash
- Mendo — http://www.mendo.nl — SOTY 2017 — E-Commerce, Animation, Design Websites, Parallax, Photographic, Wordpr
- A World With No Heroes — http://noheroes.ghostrecon.com — SOTM 2017 — Games & Entertainment, Promotional, Experimental, Sound-Audio, 3D, jQu
- For Honor - Scars — https://scars.forhonorgame.com/ — SOTM 2017 — Games & Entertainment, Experimental, Animation, Infinite Scroll, Sound
- Rainforest Foods Experience — https://rainforest.imm-g-prod.com/ — SOTM 2017 — Food & Drink, Experimental, Big Background Images, Colorful, Fullscree
- Residente — http://residente.com — SOTM 2016 — Music & Sound, Video, Sound-Audio, HTML5, GSAP, PHP, PixiJS
- Protest Sportswear — https://www.protest.eu — SOTY 2016 — E-Commerce, Fashion, Sports, Minimal, Responsive Design, Wordpress, jQ
- Paper Planes — http://paperplanes.world — SOTY 2016 — Culture & Education, Mobile & Apps, Animation, Colorful, 3D, WebGL, We
- Discover Your Patronus — http://pottermore.com/patronus — SOTM 2016 — Film & TV, Fullscreen, Unusual Navigation, Sound-Audio, 3D, Filters an
- KIKK Festival 2016 — http://www.kikk.be/2016/ — SOTY 2016 — Art & Illustration, Culture & Education, Promotional, Animation, Color
- Converse Diamonds — http://counterclimate.converse.com/ — SOTM 2016 — Fashion, Music & Sound, Animation, Design Websites, Video, jQuery, Web
- Solarin — http://www.sirinlabs.com — SOTM 2016 — Promotional, Technology, Big Background Images, Clean, Unusual Navigat
- Resn — http://resn.co.nz — SOTM 2016 — Art & Illustration, Music & Sound, Animation, jQuery, WebGL, GSAP, Und
- A Bear's-Eye View of Yellowstone — http://www.nationalgeographic.com/magazine/2016/05/yellowstone-national-parks-bears-video?source=NGcomm — SOTM 2016 — Design Websites, Flexible, HTML5
- Cavalier: Conqueror of Excellence — https://cavalierchallenge.com — SOTY 2016 — Games & Entertainment, Technology, Animation, Design Websites, CSS, HT
- Falter Inferno — http://falter.madebywild.com/#en — SOTY 2016 — Art & Illustration, Promotional, Animation, Single page, WebGL
- Because Recollection — http://www.because-recollection.com — SOTY 2015 — Music & Sound, Animation, Unusual Navigation, WebGL
- Weber - BBQ Cultures — http://bbqcultures.com — SOTY 2015 — Food & Drink, Other, Promotional, Graphic design, Photography, Trend, 
- Beagle - Better proposals — http://curvy.dk/beagle/site/ — SOTY 2015 — Promotional, Technology, Animation, Big Background Images, Responsive 
- In Pieces — http://species-in-pieces.com — SOTY 2015 — Art & Illustration, Culture & Education, Animation, Bright, Colorful, 
- Nixon eCommerce Platform — http://nixon.com — SOTY 2015 — E-Commerce, Fashion, Clean, Responsive Design
- AQuest — http://www.aquest.it — SOTY 2014 — Design Agencies, Portfolio, Responsive Design, CSS, HTML5
- Dragone — http://www.dragone.com — SOTY 2014 — Culture & Education, Events, Games & Entertainment, Animation, Big Bac
- A Journey Through Middle-earth — http://middle-earth.thehobbit.com — SOTY 2014 — Games & Entertainment, Mobile & Apps, Design Websites, CSS
- PHARRELL WILLIAMS - 24 HOURS OF HAPPY — http://24hoursofhappy.com — SOTY 2013 — Film & TV, Music & Sound, Unusual Navigation, Video, CSS, HTML5
- Into the Arctic - Greenpeace — http://www.hellomonday.net/archive/greenpeace/intothearctic/en/ — SOTY 2013 — Promotional, Animation, Design Websites, CSS, HTML5
- Blacknegative — http://www.blacknegative.com/ — SOTY 2012 — Games & Entertainment, Fullscreen, Minimal, Photography, CSS, jQuery
- Made in a Free World: Slavery Footprint — http://www.slaveryfootprint.org/ — SOTY 2011 — Mobile & Apps, Clean, Flexible, HTML5
- 360° Langstrasse Zürich — http://www.360langstrasse.sf.tv/ — SOTY 2011 — Promotional, Clean, Flexible, Infinite Scroll, Parallax, Unusual Navig
