'use client'
// FAQ's remembered moment — "Ask it in your own words". The search box is the page's headline: what you type is set in
// the display face, at display size, on the raster — and the ruled list under it answers with a live count, like
// Questions (14) → (3). Matches are underlined in the answers; nothing moves but the list. When nothing matches, the
// empty state offers the question itself, ready to send to the school.
import { useMemo, useState } from 'react'
import { Command, CommandInput } from '@/components/ui/command'
import { FaqList } from './FaqList'
import { faqs, site, type Faq } from '@/content/site'

const TOPICS: Faq['topic'][] = ['The course', 'Applying and paying', 'Online']

function words(q: string) {
  return q.toLowerCase().split(/\s+/).map((w) => w.replace(/[^\p{L}\p{N}]/gu, '')).filter((w) => w.length > 1)
}

export function FaqSearch() {
  const [query, setQuery] = useState('')
  const terms = useMemo(() => words(query), [query])
  const hits = useMemo(
    () => (terms.length ? faqs.filter((f) => terms.every((t) => `${f.q} ${f.a} ${f.topic}`.toLowerCase().includes(t))) : faqs),
    [terms],
  )

  const mark = (text: string) => {
    if (!terms.length) return text
    const re = new RegExp(`(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi')
    return text.split(re).map((part, i) => (i % 2 ? <span key={i} className="underline decoration-1 underline-offset-[0.2em]">{part}</span> : part))
  }

  return (
    <div>
      <div className="raster border-t border-(--color-text) pt-4">
        <h1 className="type-utility col-span-2 text-(--color-muted) sm:col-span-3 lg:col-span-6">
          Questions ({hits.length})
        </h1>
        <p className="type-utility col-span-2 text-right text-(--color-muted) sm:col-span-3 lg:col-span-6" aria-live="polite">
          {query ? (hits.length === 0 ? 'No answer yet' : hits.length === 1 ? '1 answer' : `${hits.length} answers`) : `${faqs.length} answered so far`}
        </p>
      </div>

      <Command shouldFilter={false} label="Search the questions" className="mt-8 lg:mt-12">
        <label className="group block">
          <span className="sr-only">Search the questions</span>
          <CommandInput
            value={query}
            onValueChange={setQuery}
            placeholder="Ask a question"
            enterKeyHint="search"
            className="type-display caret-(--color-accent) placeholder:text-(--color-border) [font-size:clamp(3rem,9vw,8.5rem)] leading-[1] [overflow-wrap:anywhere]"
          />
          <span aria-hidden className="mt-2 block h-px bg-(--color-border) transition-colors duration-150 group-focus-within:bg-(--color-text)" />
        </label>
      </Command>
      {query && (
        <button type="button" onClick={() => setQuery('')} className="press type-utility link-line mt-3 min-h-11">
          Clear
        </button>
      )}

      <div className="mt-12 lg:mt-20">
        {hits.length === 0 ? (
          <div className="raster gap-y-4 border-t border-(--color-border) pt-6">
            <p className="type-heading col-span-4 sm:col-span-6 lg:col-span-6">Nobody has asked that yet.</p>
            <p className="type-body col-span-4 text-(--color-muted) sm:col-span-6 lg:col-span-5 lg:col-start-8">
              Send it to us and we will answer within two working days:{' '}
              <a className="link-line text-(--color-text) underline decoration-current [overflow-wrap:anywhere]" href={`mailto:${site.email}?subject=${encodeURIComponent(`Question: ${query}`)}`}>
                write to {site.email}
              </a>
              .
            </p>
          </div>
        ) : (
          TOPICS.map((t) => {
            const list = hits.filter((f) => f.topic === t)
            if (!list.length) return null
            return (
              <section key={t} className="raster mb-12 gap-y-4 lg:mb-16" aria-label={t}>
                <h2 className="type-heading col-span-4 sm:col-span-6 lg:col-span-4">
                  {t} <span className="type-utility ml-1 align-top text-(--color-muted)">({list.length})</span>
                </h2>
                <div className="col-span-4 sm:col-span-6 lg:col-span-7 lg:col-start-6">
                  <FaqList key={query} items={list} render={mark} />
                </div>
              </section>
            )
          })
        )}
      </div>
    </div>
  )
}
