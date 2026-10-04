'use client'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { assets } from '@/config/assets'
import { bySlug, money } from '@/data/shop'
import { useBag } from '@/lib/bag'

export function CartView() {
  const { items, subtotal, setQty } = useBag()
  const [code, setCode] = useState('')
  if (items.length === 0) return (
    <div className="px-(--gutter) pb-8 pt-10">
      <div className="mx-auto max-w-(--container) rounded-(--radius-card) border border-(--color-border) bg-(--color-surface) p-8">
        <p className="type-heading">Your bag is empty</p>
        <p className="type-body mt-3 max-w-[52ch] text-(--color-muted)">Orders open in spring. Until then, anything you add stays here, in this browser. Most people start with the cleanser and the serum.</p>
        <Button asChild className="mt-6"><Link href="/shop">See the six</Link></Button>
      </div>
    </div>
  )
  return (
    <div className="px-(--gutter) pb-8 pt-10">
      <div className="mx-auto grid max-w-(--container) gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Table className="type-body">
            <TableHeader>
              <TableRow className="border-(--color-border) hover:bg-transparent">
                <TableHead className="type-utility text-(--color-muted)">Product</TableHead>
                <TableHead className="type-utility text-(--color-muted)">How many</TableHead>
                <TableHead className="type-utility text-right text-(--color-muted)">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((l) => {
                const p = bySlug(l.slug)!
                return (
                  <TableRow key={l.slug + l.option} className="border-(--color-border) hover:bg-transparent">
                    <TableCell className="py-4">
                      <Link href={`/shop/${p.slug}`} className="flex items-center gap-4">
                        <img src={assets[p.images[0]].src} alt="" className="aspect-(--ratio-card) w-16 rounded-(--radius-media) object-cover sm:w-20" />
                        <span className="whitespace-normal">{p.name}<span className="type-utility block text-(--color-muted)">{p.size}{l.option ? `, ${l.option}` : ''}</span></span>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Button size="icon" variant="ghost" aria-label={`One fewer ${p.name}`} onClick={() => setQty(l.slug, l.option, l.qty - 1)}>−</Button>
                        <span className="w-6 text-center tabular-nums">{l.qty}</span>
                        <Button size="icon" variant="ghost" aria-label={`One more ${p.name}`} onClick={() => setQty(l.slug, l.option, l.qty + 1)}>+</Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-right tabular-nums">{money(p.price * l.qty)}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
        <Card className="self-start rounded-(--radius-card) border-(--color-border) bg-(--color-surface) shadow-none lg:col-span-4">
          <CardHeader>
            <Badge variant="outline" className="type-utility mb-2 border-(--color-accent) text-(--color-accent)">Orders open in spring</Badge>
            <CardTitle className="type-heading text-[length:var(--type-heading-size)]!">Summary</CardTitle>
          </CardHeader>
          <CardContent className="type-body space-y-3">
            <p className="flex justify-between"><span>Subtotal</span><span className="tabular-nums">{money(subtotal)}</span></p>
            <p className="flex justify-between text-(--color-muted)"><span>Delivery</span><span>{subtotal >= 60 ? 'Free in Baku' : 'From 4 ₼'}</span></p>
            <Separator className="bg-(--color-border)" />
            <form className="space-y-2" onSubmit={(e) => { e.preventDefault(); toast('That code is not one of ours', { description: 'Codes will work once orders open in spring.' }); setCode('') }}>
              <Label htmlFor="code" className="type-utility text-(--color-muted)">A code from a friend</Label>
              <div className="flex gap-2"><Input id="code" value={code} onChange={(e) => setCode(e.target.value)} autoComplete="off" /><Button type="submit" variant="outline">Use</Button></div>
            </form>
          </CardContent>
          <CardFooter className="flex-col items-stretch gap-3 border-(--color-border) bg-transparent">
            <Button asChild size="lg"><Link href="/checkout">Go to checkout</Link></Button>
            <p className="type-utility text-(--color-muted)">There is no real checkout yet. Orders open in spring, and nothing is charged before then.</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
