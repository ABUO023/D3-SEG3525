"use client";

import Link from 'next/link';
import { products } from './dormdash-data';
import { BottomNav, PageTitle, ProductCard, SectionCard, SiteHeader, SiteShell } from './dormdash-ui';
import { useDormDash } from './dormdash-context';

export default function HomePage() {
  const { cartCount, addToCart } = useDormDash();
  const featured = products.slice(0, 4);

  return (
    <>
      <SiteHeader cartCount={cartCount} />
      <SiteShell>
        <div className="space-y-6 pt-5">
          <SectionCard className="border-stone-300 bg-white">
            <div className="border-b border-orange-200 bg-orange-500 px-4 py-2 text-center text-xs font-bold tracking-wide text-white sm:text-sm">
              Limited back-to-school bundles available — save up to 20% when you build your move-in cart today.
            </div>
            <div className="grid gap-6 p-5 md:p-7 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
              <div className="space-y-5">
                <div className="inline-flex rounded-lg border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-orange-700">
                  Student lifestyle e-commerce for Canada
                </div>
                <PageTitle eyebrow="DormDash" title="Everything you need for move-in day." description="Shop curated dorm bundles, campus essentials, and student starter kits delivered before classes begin." />
                <p className="max-w-2xl text-sm font-semibold text-slate-700 sm:text-base">Save up to 20% on curated move-in bundles this week.</p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link href="/shop" className="inline-flex items-center justify-center rounded-lg bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-orange-600">Shop essentials</Link>
                  <Link href="/shop?category=Bundle" className="inline-flex items-center justify-center rounded-lg border border-blue-400 bg-white px-6 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50">View bundles</Link>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { value: '12+', label: 'curated kits' },
                    { value: 'Canada', label: 'student delivery focus' },
                    { value: 'Fast', label: 'move-in friendly timing' },
                  ].map((item) => (
                    <div key={item.label} className="rounded-lg border border-stone-300 bg-stone-50 p-4 shadow-sm">
                      <p className="font-display text-2xl font-bold text-slate-950">{item.value}</p>
                      <p className="mt-1 text-sm text-slate-600">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <SectionCard className="border-sky-100 bg-linear-to-br from-white to-sky-50 p-5">
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-slate-500">Why DormDash works</p>
                  <h2 className="mt-2 font-display text-2xl font-bold text-slate-950">Warm, clean, and built for student life.</h2>
                  <p className="mt-4 text-sm leading-6 text-slate-600">The flow mirrors the mockups with clear cards, a bold hero, and a lightweight shopping experience.</p>
                </SectionCard>
                <SectionCard className="border-amber-100 bg-amber-50 p-5">
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-amber-800">Informational copy</p>
                  <p className="mt-2 text-base leading-7 text-amber-950">Each kit lists what is included, who it is best for, and when it can be delivered.</p>
                </SectionCard>
              </div>
            </div>
          </SectionCard>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              { title: 'Exploration process: faceted product search', text: 'Search by name, category, or description, then combine filters to narrow the catalog quickly.' },
              { title: 'Follow-instructions process: guided checkout', text: 'Move through cart, student details, fake payment, and confirmation with separate pages and a visible stepper.' },
              { title: 'Communication process: post-purchase survey', text: 'A short feedback flow asks how the experience felt and closes the loop in friendly student language.' },
            ].map((card) => (
              <SectionCard key={card.title} className="p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">{card.title}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{card.text}</p>
              </SectionCard>
            ))}
          </div>

          <SectionCard className="p-5">
            <div className="flex items-center justify-between gap-4">
              <PageTitle eyebrow="Featured" title="Best-selling student kits" description="Browse a few fast-start essentials before jumping into the full shop page." />
              <Link href="/shop" className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:bg-stone-50">Open shop</Link>
            </div>
            <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} expanded={false} onToggle={() => {}} onAddToCart={() => addToCart(product.id)} />
              ))}
            </div>
          </SectionCard>

          <SectionCard className="p-5">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-lg bg-stone-50 p-4">Friendly tone for student move-in planning.</div>
              <div className="rounded-lg bg-stone-50 p-4">High-contrast cards, clear hierarchy, and responsive layout.</div>
              <div className="rounded-lg bg-stone-50 p-4">Amazon and IKEA are the report inspiration references.</div>
              <div className="rounded-lg bg-stone-50 p-4">Prototype only, local state only, no real payment.</div>
            </div>
          </SectionCard>
        </div>
      </SiteShell>
      <BottomNav />
    </>
  );
}
