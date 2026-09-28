import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'

export const metadata: Metadata = { title: 'Accessibility' }

export default function AccessibilityPage() {
  return (
    <LegalPage
      title={['Accessibility']}
      updated="28 September 2026"
      intro="We aim for WCAG 2.2 level AA across this site. Where we fall short, we want to hear about it and we will fix it."
      sections={[
        { h: 'What we do', p: ['Body text is 17:1 contrast on the page colour. Every control works with a keyboard and shows a visible violet focus ring. Pages use landmarks and one main heading, and images carry text alternatives.'] },
        { h: 'Motion', p: ['If your system is set to reduce motion, smooth scrolling, the scroll-driven film and all reveals are turned off. The film is replaced by a still image with a play button, and every scene is shown as plain text.'] },
        { h: 'Known issues', p: ['The home page film has no audio and no captions are needed; its content is repeated as text on the page. The comparison table scrolls sideways on narrow screens.'] },
        { h: 'Report a problem', p: ['Email hello@keepersdrinks.com with the page address and what went wrong. We reply within two working days and aim to fix issues within 30 days.'] },
      ]}
    />
  )
}
