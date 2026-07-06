'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BottomNav, SectionCard, SiteHeader, SiteShell } from '../dormdash-ui';
import { formatCurrency } from '../dormdash-data';
import { useDormDash } from '../dormdash-context';

export default function ConfirmationPage() {
  const router = useRouter();
  const { cartCount, orderSnapshot, setSurveyOpen, setCheckoutStep } = useDormDash();

  return (
    <>
      <SiteHeader cartCount={cartCount} />
      <SiteShell>
        <div className="space-y-6 pt-5">
          <SectionCard className="p-5 md:p-6">
            <div className="text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-500 text-4xl text-white shadow-sm">✓</div>
              <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">Order confirmed — your move-in kit is on its way!</h1>
              <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-slate-600">Sit back and relax. We are coordinating the delivery so everything arrives before classes begin.</p>
            </div>

            <div className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-lg border border-stone-300 bg-slate-50 p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">Order number</p>
                <p className="mt-2 font-display text-3xl font-bold text-orange-600">{orderSnapshot?.orderNumber ?? 'DD-000000'}</p>
                <div className="mt-5 space-y-3">
                  <p className="text-lg font-bold text-slate-950">Purchased items</p>
                  {orderSnapshot?.items.length ? orderSnapshot.items.map(({ product, quantity }) => (
                    <div key={product.id} className="flex items-center justify-between gap-4 border-b border-stone-200 pb-3 last:border-0 last:pb-0">
                      <div>
                        <p className="font-semibold text-slate-900">{product.name}</p>
                        <p className="text-sm text-slate-500">{product.category} • Qty: {quantity}</p>
                      </div>
                      <p className="font-bold text-slate-900">{formatCurrency.format(product.price * quantity)}</p>
                    </div>
                  )) : <p className="text-sm text-slate-600">No order data found. Return to the cart and try again.</p>}
                </div>
              </div>

              <div className="rounded-lg border border-blue-100 bg-blue-50 p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">Delivery message</p>
                <p className="mt-2 text-base leading-7 text-slate-700">We’ve saved your selected items, and the delivery is planned for the earliest student-friendly window before move-in day.</p>
                <div className="mt-5 rounded-lg bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between py-1 text-sm text-slate-700"><span>Subtotal</span><span className="font-bold text-slate-950">{formatCurrency.format(orderSnapshot?.subtotal ?? 0)}</span></div>
                  <div className="flex items-center justify-between py-1 text-sm text-slate-700"><span>Delivery fee</span><span className="font-bold text-blue-700">{(orderSnapshot?.deliveryFee ?? 0) === 0 ? 'FREE' : formatCurrency.format(orderSnapshot?.deliveryFee ?? 0)}</span></div>
                  <div className="flex items-center justify-between py-1 text-sm text-slate-700"><span>Estimated tax</span><span className="font-bold text-slate-950">{formatCurrency.format(orderSnapshot?.tax ?? 0)}</span></div>
                  <div className="mt-3 flex items-end justify-between border-t border-stone-200 pt-3"><span className="text-lg font-bold text-slate-950">Total</span><span className="font-display text-3xl font-bold text-orange-600">{formatCurrency.format(orderSnapshot?.total ?? 0)}</span></div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={() => { setSurveyOpen(true); setCheckoutStep(3); router.push('/survey'); }} className="inline-flex flex-1 items-center justify-center rounded-lg bg-blue-600 px-5 py-4 text-base font-bold text-white shadow-sm hover:bg-blue-700">Complete 30-second survey</button>
              <Link href="/shop" className="inline-flex flex-1 items-center justify-center rounded-lg border border-stone-300 bg-white px-5 py-4 text-base font-bold text-slate-700 hover:bg-stone-50">Back to shopping</Link>
            </div>
          </SectionCard>
        </div>
      </SiteShell>
      <BottomNav />
    </>
  );
}
