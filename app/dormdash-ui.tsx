'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { formatCurrency, stepLabels, type Product } from './dormdash-data';

export function SiteShell({ children }: { children: ReactNode }) {
  return <div className="mx-auto w-full max-w-7xl px-4 pb-24 pt-3 sm:px-6 lg:px-8">{children}</div>;
}

export function SiteHeader({ cartCount = 0 }: { cartCount?: number }) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 -mx-4 border-b border-stone-300 bg-[#f8fbff]/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 text-left">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500 text-sm font-bold text-white shadow-sm">DD</span>
          <div>
            <p className="font-display text-2xl font-bold tracking-tight text-orange-700">DormDash</p>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Move in ready, stress free.</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {[
            { href: '/', label: 'Home' },
            { href: '/shop', label: 'Shop' },
            { href: '/cart', label: 'Cart' },
            { href: '/checkout', label: 'Checkout' },
            { href: '/survey', label: 'Survey' },
          ].map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg border px-4 py-2 text-sm font-bold transition ${active ? 'border-orange-300 bg-orange-500 text-white' : 'border-stone-300 bg-white text-slate-700 hover:bg-stone-50'}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link href="/cart" className="rounded-lg border border-orange-200 bg-white px-4 py-2 text-sm font-bold text-orange-700 shadow-sm hover:border-orange-300 hover:bg-orange-50">
          Cart <span className="ml-2 rounded-full bg-orange-500 px-2 py-0.5 text-[11px] font-bold text-white">{cartCount}</span>
        </Link>
      </div>
    </header>
  );
}

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-300 bg-white/95 px-3 py-2 backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-5 gap-2 text-center text-xs font-bold text-slate-600">
        <Link href="/" className="rounded-lg px-2 py-2 hover:bg-stone-50">Home</Link>
        <Link href="/shop" className="rounded-lg px-2 py-2 hover:bg-stone-50">Shop</Link>
        <Link href="/cart" className="rounded-lg px-2 py-2 hover:bg-stone-50">Cart</Link>
        <Link href="/checkout" className="rounded-lg px-2 py-2 hover:bg-stone-50">Checkout</Link>
        <Link href="/survey" className="rounded-lg px-2 py-2 hover:bg-stone-50">Survey</Link>
      </div>
    </nav>
  );
}

export function SectionCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-xl border border-stone-300 bg-white shadow-sm ${className}`}>{children}</section>;
}

export function PageTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="space-y-2">
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">{eyebrow}</p>
      <h1 className="font-display text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">{title}</h1>
      {description ? <p className="max-w-3xl text-base leading-7 text-slate-600">{description}</p> : null}
    </div>
  );
}

export function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="grid grid-cols-4 gap-2 text-center sm:gap-3">
      {stepLabels.map((label, index) => {
        const isActive = currentStep === index;
        const isComplete = currentStep > index;

        return (
          <div
            key={label}
            aria-current={isActive ? 'step' : undefined}
            className={`rounded-lg border px-2 py-3 ${isComplete ? 'border-blue-200 bg-blue-50 text-blue-800' : isActive ? 'border-orange-300 bg-orange-500 text-white shadow-sm' : 'border-stone-300 bg-white text-stone-400'}`}
          >
            <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold">{isComplete ? '✓' : index + 1}</div>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] sm:text-[12px]">{label}</p>
          </div>
        );
      })}
    </div>
  );
}

export function FilterGroup({
  title,
  options,
  value,
  onChange,
}: {
  title: string;
  options: readonly string[] | readonly { value: string; label: string }[];
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <section className="space-y-3 rounded-lg border border-stone-300 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-stone-500">{title}</h3>
        <button type="button" onClick={() => onChange('')} className="text-xs font-semibold text-slate-500 hover:text-slate-900">
          Reset
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const optionValue = typeof option === 'string' ? option : option.value;
          const label = typeof option === 'string' ? option : option.label;
          const active = value === optionValue;

          if (title === 'Color / style') {
            const colorDot: Record<string, string> = {
              Neutral: 'bg-amber-100',
              Blue: 'bg-blue-200',
              Green: 'bg-emerald-200',
              Warm: 'bg-orange-200',
            };

            return (
              <button
                key={optionValue}
                type="button"
                aria-pressed={active}
                onClick={() => onChange(active ? '' : optionValue)}
                className={`flex h-8 w-8 items-center justify-center rounded-full border transition ${active ? 'border-orange-500 ring-4 ring-orange-100' : 'border-stone-300 hover:border-stone-400'}`}
                aria-label={label}
                title={label}
              >
                <span className={`h-5 w-5 rounded-full ${colorDot[optionValue] ?? 'bg-stone-200'}`} />
              </button>
            );
          }

          return (
            <button
              key={optionValue}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(active ? '' : optionValue)}
              className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${active ? 'border-orange-500 bg-orange-500 text-white shadow-sm' : 'border-stone-300 bg-white text-slate-700 hover:border-stone-400 hover:bg-stone-50'}`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export function ProductCard({ product, expanded, onToggle, onAddToCart }: { product: Product; expanded: boolean; onToggle: () => void; onAddToCart: () => void }) {
  return (
    <article className="overflow-hidden rounded-xl border border-stone-300 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className={`relative h-48 bg-linear-to-br ${product.imageGradient}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.65),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(15,23,42,0.03))]" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span className="rounded-lg bg-white/85 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-800 backdrop-blur">{product.category}</span>
          <span className="rounded-lg bg-slate-950/85 px-3 py-1 text-xs font-bold text-white backdrop-blur">{formatCurrency.format(product.price)}</span>
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <div className="rounded-lg bg-white/85 px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-700 backdrop-blur">{product.imageLabel}</div>
          <div className="rounded-lg bg-slate-950/85 px-3 py-2 text-xs font-bold text-white backdrop-blur">{product.deliverySpeed}</div>
        </div>
      </div>
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-2xl font-bold tracking-tight text-slate-950">{product.name}</h3>
            <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">{product.category} • {product.roomType}</p>
          </div>
          <p className="font-display text-2xl font-bold text-orange-600">{formatCurrency.format(product.price)}</p>
        </div>
        <p className="text-sm leading-6 text-slate-600">{product.description}</p>
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <span key={tag} className="rounded-lg border border-stone-300 bg-stone-50 px-3 py-1 text-xs font-semibold text-slate-600">{tag}</span>
          ))}
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg bg-stone-50 p-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">Best for</p>
            <p className="mt-2 text-sm leading-6 text-slate-700">{product.bestFor}</p>
          </div>
          <div className="rounded-lg bg-stone-50 p-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">Delivery</p>
            <p className="mt-2 text-sm font-semibold text-slate-700">{product.deliverySpeed}</p>
          </div>
        </div>
        {expanded ? (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">What is included</p>
            <ul className="mt-3 space-y-2">
              {product.includes.map((item) => (
                <li key={item} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-orange-500" /><span>{item}</span></li>
              ))}
            </ul>
          </div>
        ) : null}
        <div className="flex gap-3">
          <button type="button" onClick={onAddToCart} className="inline-flex flex-1 items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-blue-700">Add to cart</button>
          <button type="button" onClick={onToggle} className="inline-flex flex-1 items-center justify-center rounded-lg border border-orange-200 bg-white px-5 py-3 text-sm font-bold text-orange-700 hover:border-orange-300 hover:bg-orange-50">{expanded ? 'Hide details' : 'View details'}</button>
        </div>
      </div>
    </article>
  );
}

export function CartRow({ product, quantity, onAdd, onRemove, onDelete }: { product: Product; quantity: number; onAdd: () => void; onRemove: () => void; onDelete: () => void }) {
  return (
    <article className="rounded-xl border border-orange-200 bg-white p-4 shadow-sm">
      <div className="flex gap-4">
        <div className={`h-24 w-24 shrink-0 rounded-lg bg-linear-to-br ${product.imageGradient}`} />
        <div className="min-w-0 flex-1">
          <p className="font-display text-xl font-bold leading-7 text-slate-950">{product.name}</p>
          <p className="mt-1 text-sm text-stone-500">{product.category} • {product.roomType}</p>
          <p className="mt-2 text-lg font-bold text-orange-600">{formatCurrency.format(product.price * quantity)}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="inline-flex items-center rounded-full bg-slate-100 p-1">
          <button type="button" onClick={onRemove} className="flex h-9 w-9 items-center justify-center rounded-full text-xl font-bold text-slate-700 hover:bg-white" aria-label={`Decrease quantity for ${product.name}`}>−</button>
          <span className="min-w-10 px-3 text-center text-sm font-bold text-slate-900">{quantity}</span>
          <button type="button" onClick={onAdd} className="flex h-9 w-9 items-center justify-center rounded-full text-xl font-bold text-slate-700 hover:bg-white" aria-label={`Increase quantity for ${product.name}`}>+</button>
        </div>
        <button type="button" onClick={onDelete} className="text-sm font-bold text-red-600 hover:text-red-700">Remove</button>
      </div>
    </article>
  );
}

export function SummaryCard({ subtotal, deliveryFee, tax, total, cta, note }: { subtotal: number; deliveryFee: number; tax: number; total: number; cta: ReactNode; note?: string }) {
  return (
    <div className="rounded-xl bg-slate-100 p-5">
      <div className="space-y-3 text-sm text-slate-700">
        <div className="flex items-center justify-between"><span>Subtotal</span><span className="font-bold text-slate-950">{formatCurrency.format(subtotal)}</span></div>
        <div className="flex items-center justify-between"><span>Delivery fee</span><span className="font-bold text-blue-700">{deliveryFee === 0 ? 'FREE' : formatCurrency.format(deliveryFee)}</span></div>
        <div className="flex items-center justify-between"><span>Estimated tax</span><span className="font-bold text-slate-950">{formatCurrency.format(tax)}</span></div>
      </div>
      <div className="mt-4 flex items-end justify-between border-t border-stone-200 pt-4"><span className="text-lg font-bold text-slate-950">Total</span><span className="font-display text-3xl font-bold text-orange-600">{formatCurrency.format(total)}</span></div>
      <div className="mt-5">{cta}</div>
      {note ? <p className="mt-3 text-center text-xs font-medium text-slate-500">{note}</p> : null}
    </div>
  );
}
