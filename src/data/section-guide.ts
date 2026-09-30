// Sections in plain words, for people who don't speak design: what each one looks like ("as a big project list") and
// when it's the right pick. The kit's Pages step shows a page as parts with a job (see sectionGroups.job in
// features/kit/plan.ts); these lines say how each part can look. Every grouped section needs an entry (check.ts).
import type { SectionId } from '@/types/domain'

export const sectionGuide: Partial<Record<SectionId, { look: string; bestWhen: string }>> = {
  intro: { look: 'a short statement', bestWhen: 'one or two sentences can say what you do and who it’s for.' },
  manifesto: { look: 'a bold point of view', bestWhen: 'you have a strong opinion and want it to be the first thing people read.' },
  about: { look: 'a portrait and your story', bestWhen: 'people choose you for who you are — a face and real names build trust.' },
  'editorial-story': { look: 'a magazine-style story', bestWhen: 'there’s a story worth a few paragraphs, with one line to pull out.' },
  'featured-work': { look: 'a big project list', bestWhen: 'you have 3–6 projects you’re proud of, each with a good picture.' },
  'case-study': { look: 'one project in depth', bestWhen: 'one project proves more than many — you can tell its problem, approach and result.' },
  gallery: { look: 'a photo gallery', bestWhen: 'the pictures speak for themselves and need few words.' },
  testimonials: { look: 'quotes from real people', bestWhen: 'people you worked for will say something specific about it.' },
  team: { look: 'the people, with photos', bestWhen: 'people choose you for the team — each face and role matters.' },
  stats: { look: 'a few big numbers', bestWhen: 'three or four true figures say more than a paragraph.' },
  clients: { look: 'a wall of client names', bestWhen: 'the names you’ve worked with are the proof.' },
  chapters: { look: 'colour chapters', bestWhen: 'you have 2–4 offers and want each to feel like its own chapter.' },
  services: { look: 'a list of services', bestWhen: 'you offer 4–6 clear things and people need to find theirs fast.' },
  process: { look: 'your process, step by step', bestWhen: 'people worry about how working with you goes.' },
  'how-it-works': { look: 'three or four simple steps', bestWhen: 'using your product or service takes a few easy steps.' },
  'feature-grid': { look: 'a grid of features', bestWhen: 'you have 3–6 capabilities to explain, each in a line.' },
  pricing: { look: 'price cards', bestWhen: 'your prices are fixed and saying them removes the last doubt.' },
  collection: { look: 'a collection intro', bestWhen: 'you release in seasons or ranges and want to set the mood first.' },
  lookbook: { look: 'styled looks', bestWhen: 'you sell a mood — outfits or sets people can shop from.' },
  'product-grid': { look: 'a product grid', bestWhen: 'people browse many products and pick one.' },
  'product-highlight': { look: 'one product up close', bestWhen: 'one product is the star and its details sell it.' },
  menu: { look: 'a menu', bestWhen: 'guests want to see dishes and prices before they come.' },
  reservation: { look: 'a booking block', bestWhen: 'the goal is a booked table, session or appointment.' },
  location: { look: 'address and opening hours', bestWhen: 'people need to find you and know when you’re open.' },
  faq: { look: 'questions and answers', bestWhen: 'people ask the same 5–8 questions before they decide.' },
  journal: { look: 'latest news and posts', bestWhen: 'you publish often and want it to look alive.' },
  'contact-cta': { look: 'a closing call to action', bestWhen: 'the page should end with one clear next step — write, book or buy.' },
}
