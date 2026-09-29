// Event facts and navigation — one place to change copy that repeats across pages.
// Placeholder contact details (phone, email, address) must be confirmed by the owner before launch.
export const site = {
  name: "RALPH&LAUREN",
  event: "Sheki Polo Weekend",
  dates: "11–13 June 2027",
  datesShort: "11–13 June",
  days: [
    { date: new Date(2027, 5, 11), label: "Friday 11 June", note: "Qualifying chukkas" },
    { date: new Date(2027, 5, 12), label: "Saturday 12 June", note: "Semi-finals" },
    { date: new Date(2027, 5, 13), label: "Sunday 13 June", note: "Final at 16:00" },
  ],
  rsvpBy: "1 May 2027",
  gates: "Gates open 10:00, first chukka 11:00",
  email: "rsvp@ralphandlauren.az",
  phone: "+994 24 244 00 00",
  phoneHref: "tel:+994242440000",
  address: ["Sheki Polo Ground", "Kish Road 14", "Sheki 5500, Azerbaijan"],
  mapHref: "https://maps.google.com/?q=Sheki+Azerbaijan",
  instagram: "https://instagram.com/",
}

export const primaryLinks = [
  { href: "/venue", label: "Venue & travel" },
  { href: "/gallery", label: "Gallery" },
  { href: "/faq", label: "FAQ" },
]

export const secondaryLinks = [{ href: "/contact", label: "Contact" }]

export const accountLinks = [
  { href: "/sign-in", label: "Sign in" },
  { href: "/sign-up", label: "Create account" },
]

export const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/cookies", label: "Cookie Policy" },
  { href: "/accessibility", label: "Accessibility" },
]
