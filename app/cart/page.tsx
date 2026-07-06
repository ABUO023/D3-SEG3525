'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BottomNav, PageTitle, CartRow, SectionCard, SiteHeader, SiteShell, SummaryCard } from '../dormdash-ui';
import { products } from '../dormdash-data';
import { useDormDash } from '../dormdash-context';

export default function CartPage() {
  const router = useRouter();
  const { cartItems, cartCount, subtotal, deliveryFee, tax, total, addToCart, updateQuantity, removeItem, goToStudentDetails } = useDormDash();

  const cartDetails = cartItems
    .map((item) => {
      const product = products.find((entry) => entry.id === item.productId);
      return product ? { product, quantity: item.quantity } : null;
    })
    .filter(Boolean) as Array<{ product: (typeof products)[number]; quantity: number }>;

  return (
    <>
      <SiteHeader cartCount={cartCount} />
      <SiteShell>
        <div className="space-y-6 pt-5">
          <SectionCard className="p-5 md:p-6">
            <PageTitle eyebrow="Cart" title={`Your Cart (${cartCount} items)`} description="Review selected items, adjust quantities, and continue into the guided checkout flow." />
            <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
              <div className="space-y-4">
                {cartDetails.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-orange-200 bg-orange-50/70 p-6 text-center">
                    <p className="font-display text-2xl font-bold text-slate-950">Your cart is empty</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">Add a bundle or kit to begin the guided checkout process.</p>
                    <Link href="/shop" className="mt-4 inline-flex items-center justify-center rounded-lg bg-orange-500 px-5 py-3 text-sm font-bold text-white hover:bg-orange-600">Browse products</Link>
                  </div>
                ) : (
                  cartDetails.map(({ product, quantity }) => (
                    <CartRow key={product.id} product={product} quantity={quantity} onAdd={() => addToCart(product.id)} onRemove={() => updateQuantity(product.id, -1)} onDelete={() => removeItem(product.id)} />
                  ))
                )}
              </div>

              <SummaryCard
                subtotal={subtotal}
                deliveryFee={deliveryFee}
                tax={tax}
                total={total}
                note="Prototype only — no real payment is processed."
                cta={<button type="button" onClick={() => { goToStudentDetails(); router.push('/checkout'); }} className="inline-flex w-full items-center justify-center rounded-lg bg-orange-500 px-5 py-4 text-base font-bold text-white shadow-sm hover:bg-orange-600">Continue to checkout →</button>}
              />
            </div>
          </SectionCard>
        </div>
      </SiteShell>
      <BottomNav />
    </>
  );
}
