// The site's copy, shared where the same chapter appears on more than one page. Written for this build — the quotes,
// names, prices and details are placeholders in the studio's voice, to be replaced with the real ones.
export const services = [
  { name: 'First visit', line: 'An hour to talk, test how you move and agree a plan in plain words.' },
  { name: 'Hands-on treatment', line: 'Slow, specific manual therapy for backs, necks, shoulders, hips and knees.' },
  { name: 'Slow-movement sessions', line: 'One to one on the mat: the exercises, taught until they feel like yours.' },
  { name: 'After surgery or injury', line: 'A steady plan back to walking, lifting, running or sleeping well.' },
  { name: 'Your home programme', line: 'A short written set of exercises after every visit, changed as you improve.' },
]

export const team = [
  { name: 'Ines Calder', role: 'Physiotherapist', media: 'team1', line: 'I spend the first visit asking the questions most people have never been asked about their pain.' },
  { name: 'Tom Reyes', role: 'Physiotherapist, shoulders and sport', media: 'team2', line: 'My favourite moment is when someone lifts an arm overhead and forgets to wince.' },
  { name: 'Ruth Hale', role: 'Founder, slow-movement teacher', media: 'team3', line: 'I opened Hane so treatment would not end at the door. The exercises are the part you keep.' },
] as const

export const quotes = [
  { quote: 'I came in for my back and left with three exercises I still do every morning. Two years on, it has not come back.', name: 'Maya', role: 'treated for lower back pain' },
  { quote: 'They asked about my sleep, my desk and my running before anyone touched me.', name: 'Daniel', role: 'runner' },
  { quote: 'After my knee operation Tom gave me a plan that fitted on one page. I followed it.', name: 'Priya', role: 'after knee surgery' },
  { quote: 'Quiet rooms and nobody rushing. I had forgotten treatment could feel like that.', name: 'Ana', role: 'neck and shoulders' },
]

export const faq = {
  referral: { q: 'Do I need a referral from my GP?', a: 'No, you can book directly. If you have a letter, scan results or notes from a hospital, bring them along.' },
  wear: { q: 'What should I wear?', a: 'Something loose you can move in, like leggings or shorts and a T-shirt. There is a blanket for the parts we are not treating.' },
  sessions: { q: 'How many sessions will I need?', a: 'Most people come three to six times over about six weeks. We tell you what we expect at the first visit, and we say so when you no longer need us.' },
  insurance: { q: 'Is it covered by insurance?', a: 'Many private health insurers cover physiotherapy. Check with yours before you book; we give you an itemised receipt after every visit.' },
  cancel: { q: 'What if I need to cancel?', a: 'Move or cancel up to 24 hours before at no cost, by email or phone. Later than that, we charge half the session.' },
  surgery: { q: 'Can I come after an operation?', a: 'Yes, once your surgeon is happy for you to start. Bring any exercises or notes you were given when you left hospital.' },
  access: { q: 'Is the studio step-free?', a: 'The treatment rooms are up one flight of stairs. Tell us when you book and we will see you in the ground-floor room instead.' },
  children: { q: 'Do you see children?', a: 'We see young people from 12, with a parent or guardian in the room for every visit.' },
}
export const allFaq = Object.values(faq)

export const reservation = {
  title: 'Book a time',
  text: 'Choose a treatment, a day and a time. Your mail app opens with it all filled in; send it and we confirm within one working day.',
}
