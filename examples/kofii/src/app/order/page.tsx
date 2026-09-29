import type { Metadata } from 'next'
import { PageHeader } from '@/components/PageHeader'
import { DemoForm, Field } from '@/components/DemoForm'
import { menu } from '@/config/site'

export const metadata: Metadata = { title: 'Order online' }

export default function OrderPage() {
  return (
    <>
      <PageHeader lines={['Order ahead']}>
        <p>Pick your drinks, choose a time, and collect at the counter. Delivery within two kilometres of the shop.</p>
      </PageHeader>
      <section aria-label="Order form" className="container-text pb-32">
        <DemoForm submit="Place order" done="Order placed. We start your drinks five minutes before your time.">
          <fieldset className="grid gap-4">
            <legend className="type-heading mb-4">Pickup or delivery</legend>
            <div className="flex flex-wrap gap-4">
              {['Pickup', 'Delivery'].map((o, i) => (
                <label key={o} className="flex min-h-12 cursor-pointer items-center gap-3 rounded-button border border-muted bg-surface px-6 has-[:checked]:border-primary has-[:checked]:bg-secondary">
                  <input type="radio" name="method" value={o} defaultChecked={i === 0} className="accent-primary" />
                  {o}
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset className="grid gap-12 md:grid-cols-2 md:gap-x-24">
            <legend className="type-heading mb-8">Your order</legend>
            {menu.map((s) => (
              <div key={s.title}>
                <h3 className="border-b border-border pb-2 font-bold">{s.title}</h3>
                <ul>
                  {s.items.map((it) => {
                    const id = `q-${it.name}`
                    return (
                      <li key={it.name} className="flex items-center justify-between gap-4 border-b border-border py-2">
                        <label htmlFor={id} className="grow">
                          {it.name} <span className="tabular-nums text-muted">{it.price}</span>
                        </label>
                        <input id={id} name={it.name} type="number" min={0} max={9} defaultValue={0} className="min-h-11 w-16 rounded-button border border-muted bg-surface px-2 text-center tabular-nums" />
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </fieldset>
          <div className="grid gap-6 sm:grid-cols-3">
            <Field label="Time" name="time" type="time" required />
            <Field label="Name" name="name" required autoComplete="name" />
            <Field label="Phone" name="phone" type="tel" required autoComplete="tel" />
          </div>
          <Field label="Delivery address (if delivery)" name="address" autoComplete="street-address" />
        </DemoForm>
      </section>
    </>
  )
}
