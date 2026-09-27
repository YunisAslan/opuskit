import Link from 'next/link'
import { HomeHero } from '@/components/home/HomeHero'
import { AssetReality, Assembly, BuildWithAI, ChooseFeeling, Ingredients, InspirationToRecipe, type ToolTree } from '@/components/home/HomeStory'
import { inspirationSources } from '@/data/patterns'
import { seedBySlug } from '@/data/recipes'
import { adapters } from '@/features/build-packages'
import { composeRecipe, specFromSeed } from '@/features/recipes/engine'

const STUDY: Record<string, string> = {
  awwwards: 'Juried craft. Study how award-level sites pace a story and when they choose restraint.',
  siteinspire: 'Filter by style and type. Study typography and small details in quiet, well-made sites.',
  'land-book': 'Landing pages by category. Study how products structure a page from promise to proof.',
  cssda: 'Front-end craft. Study interaction details, transitions and how effects stay usable.',
}

export default async function Home() {
  const recipe = composeRecipe(specFromSeed(seedBySlug['cinematic-editorial']))
  const tools: ToolTree[] = await Promise.all(
    (['claude-code', 'cursor', 'v0', 'lovable'] as const).map(async (id) => {
      const pkg = await adapters[id].generate(recipe)
      return { id, name: adapters[id].name, description: adapters[id].description, files: pkg.files.map((f) => f.path) }
    }),
  )

  return (
    <>
      <HomeHero />
      <Assembly />
      <InspirationToRecipe />
      <ChooseFeeling />
      <Ingredients />
      <AssetReality />
      <BuildWithAI tools={tools} recipeTitle={recipe.title} />

      <section className="py-20 md:py-28" aria-labelledby="refs">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <h2 id="refs" className="display text-[clamp(2.4rem,5vw,4.6rem)]">Study the principle. Build something original.</h2>
            <p className="prose-serif self-end text-ink-2">Every recipe points to references on the best curated galleries — with a note on what to study. We never suggest copying a site; we show you why it works.</p>
          </div>
          <ul className="mt-12 border-t border-ink">
            {inspirationSources.map((s) => (
              <li key={s.id} className="border-b border-line">
                <a href={s.url} target="_blank" rel="noreferrer" className="group grid gap-2 py-6 md:grid-cols-[1fr_2fr_auto] md:items-baseline">
                  <span className="text-2xl font-medium tracking-tight group-hover:text-pencil">{s.name}</span>
                  <span className="text-ink-2">{STUDY[s.id]}</span>
                  <span className="text-sm text-muted">Visit<span className="sr-only"> {s.name} (opens in a new tab)</span></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ink text-paper" aria-labelledby="cta">
        <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-8 md:py-36">
          <h2 id="cta" className="display max-w-5xl text-[clamp(2.8rem,7vw,7rem)]">Your next website starts with a direction.</h2>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link href="/create" className="btn bg-paper text-ink hover:bg-white">Create your Opus</Link>
            <span className="text-paper/60">6–10 visual decisions. No design vocabulary required.</span>
          </div>
        </div>
      </section>
    </>
  )
}
