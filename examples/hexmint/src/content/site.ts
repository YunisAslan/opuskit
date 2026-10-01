// All site copy in one place, in the recipe voice: precise, calm, evidence-based.
// Client names, quotes and numbers are stand-ins for a demo product. Replace them with real ones before launch.

export const brand = { name: 'Hexmint', email: 'hello@hexmint.app', support: 'support@hexmint.app' }

export const nav = [
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'FAQ', href: '/faq' },
]

export const heroStats = [
  { value: '5 min', label: 'from sign-up to first invoice' },
  { value: '1 click', label: 'to close the quarter' },
  { value: '2,431', label: 'banks with live feeds' },
  { value: '99.98%', label: 'uptime over the last 90 days' },
]

export const clients = ['Halden & Roe', 'Studio Ostra', 'Field Notes Press', 'Marrow Type', 'Kettle Audio', 'Northlight Films', 'Paper Moth', 'Lumen Joinery']

export const rows = [
  {
    label: '// invoices',
    name: 'Invoices that chase themselves',
    text: 'Send a branded invoice in under a minute. Hexmint sends polite reminders at 7, 14 and 30 days, and marks it paid the moment the money lands.',
    media: 'renderInvoices',
    link: { label: 'See invoicing', href: '/features' },
  },
  {
    label: '// expenses',
    name: 'Expenses sorted as they happen',
    text: 'Forward a receipt or snap it on your phone. Hexmint reads the amount, VAT and supplier, then matches it to the bank line it belongs to.',
    media: 'renderExpenses',
  },
  {
    label: '// books',
    name: 'A quarter that closes itself',
    text: 'When the last line is matched, the quarter is ready. One click files your VAT return and exports the books your accountant asked for.',
    media: 'renderBooks',
    link: { label: 'How the close works', href: '/features' },
  },
] as const

export const features = [
  { label: '// bank-sync', stat: '2,431', unit: 'banks', name: 'Bank feeds in real time', text: 'Transactions arrive within minutes of clearing, already sorted the way you sorted them last time.' },
  { label: '// vat', stat: '0', unit: 'spreadsheets', name: 'VAT worked out for you', text: 'Every line carries its rate. The quarterly return fills itself, and you see the total before you file.' },
  { label: '// currency', stat: '38', unit: 'currencies', name: 'Paid in any currency', text: 'Hexmint books the exchange rate on the day the money arrives, not an estimate from the day you invoiced.' },
  { label: '// projects', stat: '€0.01', unit: 'precision', name: 'Profit per project', text: 'Tag invoices and expenses to a job and see what each one actually made, down to the cent.' },
  { label: '// accountant', stat: '1', unit: 'invite link', name: 'Your accountant, invited', text: 'Read-only access in one click. They see the ledger you see, with every receipt attached to its line.' },
  { label: '// export', stat: '100%', unit: 'of your data', name: 'Leave whenever you like', text: 'Export everything as CSV or PDF at any time. Your books stay yours, with no fee to take them.' },
]

export const tools = ['Stripe', 'PayPal', 'Wise', 'Revolut Business', 'Shopify', 'Harvest', 'Toggl Track', 'Google Drive', 'Dropbox', 'Slack', 'Gmail', 'Xero export']

export const quotes = [
  { quote: 'We used to lose the first week of every quarter to receipts. Now the books are closed before the coffee is cold.', name: 'Ines Marrow', role: 'Founder, Marrow Type' },
  { quote: 'Reminders went out on their own, and two overdue invoices were paid the same week.', name: 'Tom Halden', role: 'Partner, Halden & Roe' },
  { quote: 'Our accountant logs in, sees everything, and has stopped emailing us about missing receipts.', name: 'Priya Ostrander', role: 'Producer, Northlight Films' },
  { quote: 'Setup really took five minutes. I timed it.', name: 'Jonas Field', role: 'Editor, Field Notes Press' },
]

export const close = {
  name: 'The one-click close',
  text: 'At quarter end Hexmint checks every line, files the return and hands your accountant a finished set of books. You press one button.',
  details: [
    { label: 'Reconciled', value: '1,284 of 1,284 lines' },
    { label: 'VAT return', value: 'Filed in 4 seconds' },
    { label: 'Accountant pack', value: 'PDF, CSV and DATEV' },
    { label: 'Time to close', value: '38 seconds' },
  ],
}

export const steps = [
  { name: 'Connect your bank', text: 'Pick your bank and sign in through it. Access is read-only and you can revoke it whenever you like.' },
  { name: 'Add your studio details', text: 'Name, VAT number and logo. Hexmint builds your invoice template from them.' },
  { name: 'Send the first invoice', text: 'Choose a client, add the lines, press send. The reminders are already scheduled.' },
]

export type Billing = 'monthly' | 'yearly'
export const plans = [
  { name: 'Solo', line: 'For one person and one bank account.', monthly: '€12', yearly: '€10', features: ['1 user', 'Unlimited invoices', '1 bank feed', 'VAT return filing', 'Email support'] },
  { name: 'Studio', line: 'For small teams with a few projects running.', monthly: '€29', yearly: '€24', recommended: true, features: ['Up to 5 users', 'Unlimited bank feeds', 'Profit per project', 'Accountant access', 'Priority support'] },
  { name: 'Agency', line: 'For studios with more than one company.', monthly: '€59', yearly: '€49', features: ['Up to 20 users', 'Everything in Studio', 'Multiple companies', 'Approval steps for spend', 'Phone support'] },
]

export const compare = [
  { row: 'Users', values: ['1', '5', '20'] },
  { row: 'Bank feeds', values: ['1', 'Unlimited', 'Unlimited'] },
  { row: 'Currencies', values: ['38', '38', '38'] },
  { row: 'Receipt scans per month', values: ['100', '1,000', 'Unlimited'] },
  { row: 'Companies', values: ['1', '1', 'Up to 5'] },
  { row: 'Support reply time', values: ['24 h', '4 h', '1 h'] },
]

export const faqAll = [
  { q: 'Is my bank connection safe?', a: "Hexmint connects through your bank's own open-banking sign-in and only ever gets read access. You can revoke it from your bank or from Hexmint at any time." },
  { q: 'Can I move over from another tool?', a: 'Yes. Import invoices, contacts and transactions from a CSV, or straight from Xero, QuickBooks or FreeAgent. Most studios are moved over in an afternoon.' },
  { q: 'Does Hexmint file my VAT return?', a: 'In the UK, Ireland, Germany and the Netherlands it files directly with the tax office after you approve the totals. Elsewhere it prepares the return for you or your accountant to submit.' },
  { q: 'Do I still need an accountant?', a: 'Many studios keep one for year-end and advice. Hexmint gives them read-only access, so their hours go on advice rather than chasing receipts.' },
  { q: 'What happens when the free trial ends?', a: 'Nothing is charged automatically. Choose a plan, or export everything and leave. Your data is kept for 90 days either way.' },
  { q: 'Which currencies can I invoice in?', a: '38, including EUR, GBP, USD, CHF, SEK and AZN. Exchange rates are booked on the day the payment arrives.' },
  { q: 'Where is my data stored?', a: 'In the EU, in Frankfurt, encrypted at rest and in transit. Backups run every hour and are kept for 30 days.' },
  { q: 'Can I cancel at any time?', a: 'Yes. Monthly plans stop at the end of the month. Yearly plans are refunded pro rata if you cancel in the first 60 days.' },
]

export const faqPricing = [
  faqAll[4],
  { q: 'Are prices shown with VAT?', a: 'No. Prices exclude VAT, which is added at checkout based on where your studio is registered.' },
  { q: 'Can I change plans later?', a: 'Any time, from settings. Moving up takes effect straight away; moving down applies from your next billing date.' },
  { q: 'Do you offer a discount for non-profits?', a: 'Yes, 50% on any plan for registered charities and cooperatives. Write to us with your registration number.' },
  faqAll[7],
]
