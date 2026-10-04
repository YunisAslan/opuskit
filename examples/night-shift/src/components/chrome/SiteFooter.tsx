import { FooterSection } from '@/components/sections/Footer'
import { ScrambleLink } from '@/components/site/ScrambleLink'
import { pages, site } from '@/content/site'
import { Logo } from './Logo'
import { StatusLine } from './StatusLine'

// Footer "Say hello": the invitation with the email at display size, hours and where it's taught beside it, the pages,
// then the line: copyright, the live status line and a plain sign-off.
export function SiteFooter({ status }: { status: [string, string] }) {
  return (
    <div className="border-t border-(--color-border) pb-20 md:pb-28">
      <FooterSection link={ScrambleLink} variant="contact" light invite="Ask before you enrol."
        contact={[{ label: site.email, href: `mailto:${site.email}` }]}
        logo={<Logo />}
        columns={[{ title: 'Pages', links: pages.map((p) => ({ label: p.label, href: p.href })) }]}
        details={
          <dl className="type-body space-y-3">
            <div><dt className="type-utility opacity-70">Answers</dt><dd>Weekdays 10:00–16:00, Oslo time, within a working day</dd></div>
            <div><dt className="type-utility opacity-70">Sessions</dt><dd>Tuesday and Thursday 19:00–21:30, live online, from a grading suite in Oslo</dd></div>
          </dl>
        }
        copyright={`© ${new Date().getFullYear()} Night Shift, Oslo`}
        end={
          <div className="flex flex-col gap-2 border-t border-current/20 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <StatusLine fallback={status} menu={false} className="text-(--color-text)" />
            <p className="type-utility tabular-nums text-(--color-muted)">{'// Out at 21:30. See you Tuesday.'}</p>
          </div>
        }
      />
    </div>
  )
}
