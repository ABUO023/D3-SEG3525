'use client';

import { useRouter } from 'next/navigation';
import { type FormEvent } from 'react';
import { BottomNav, PageTitle, SectionCard, SiteHeader, SiteShell, Stepper, SummaryCard } from '../dormdash-ui';
import { useDormDash } from '../dormdash-context';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cartCount,
    checkoutStep,
    setCheckoutStep,
    studentDetails,
    setStudentDetails,
    paymentDetails,
    setPaymentDetails,
    subtotal,
    deliveryFee,
    tax,
    total,
    submitStudentDetails,
    submitPayment,
    clearCart,
  } = useDormDash();

  function handleStudentSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitStudentDetails();
  }

  function handlePaymentSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitPayment();
    clearCart();
    router.push('/confirmation');
  }

  return (
    <>
      <SiteHeader cartCount={cartCount} />
      <SiteShell>
        <div className="space-y-6 pt-5">
          <SectionCard className="p-5 md:p-6">
            <PageTitle eyebrow="Checkout" title="Guided move-in purchase" description="Follow the instructions: add an item, enter personal details, use fake payment information, and finish with confirmation." />
            <div className="mt-5">
              <Stepper currentStep={checkoutStep} />
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
              <div className="space-y-5">
                {checkoutStep <= 1 ? (
                  <form onSubmit={handleStudentSubmit} className="space-y-4 rounded-lg border border-stone-300 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-700">✦</div>
                      <div>
                        <h3 className="font-display text-2xl font-bold text-slate-950">Student Details</h3>
                        <p className="text-sm text-slate-600">Enter personal information for the move-in order.</p>
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2 md:col-span-2"><label htmlFor="fullName" className="text-sm font-bold text-slate-700">Full name</label><input id="fullName" required value={studentDetails.fullName} onChange={(event) => setStudentDetails((current) => ({ ...current, fullName: event.target.value }))} className="w-full rounded-lg border border-orange-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100" /></div>
                      <div className="space-y-2"><label htmlFor="email" className="text-sm font-bold text-slate-700">Email</label><input id="email" type="email" required value={studentDetails.email} onChange={(event) => setStudentDetails((current) => ({ ...current, email: event.target.value }))} className="w-full rounded-lg border border-orange-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100" /></div>
                      <div className="space-y-2"><label htmlFor="university" className="text-sm font-bold text-slate-700">University</label><input id="university" required value={studentDetails.university} onChange={(event) => setStudentDetails((current) => ({ ...current, university: event.target.value }))} className="w-full rounded-lg border border-orange-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100" /></div>
                      <div className="space-y-2 md:col-span-2"><label htmlFor="residence" className="text-sm font-bold text-slate-700">Residence / address</label><input id="residence" required value={studentDetails.residence} onChange={(event) => setStudentDetails((current) => ({ ...current, residence: event.target.value }))} className="w-full rounded-lg border border-orange-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100" /></div>
                      <div className="space-y-2"><label htmlFor="moveInDate" className="text-sm font-bold text-slate-700">Move-in date</label><input id="moveInDate" type="date" required value={studentDetails.moveInDate} onChange={(event) => setStudentDetails((current) => ({ ...current, moveInDate: event.target.value }))} className="w-full rounded-lg border border-orange-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100" /></div>
                      <div className="space-y-2"><label htmlFor="notes" className="text-sm font-bold text-slate-700">Notes</label><input id="notes" value={studentDetails.notes} onChange={(event) => setStudentDetails((current) => ({ ...current, notes: event.target.value }))} className="w-full rounded-lg border border-orange-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100" /></div>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button type="button" onClick={() => setCheckoutStep(0)} className="inline-flex flex-1 items-center justify-center rounded-lg border border-stone-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:bg-stone-50">Back to cart</button>
                      <button type="submit" className="inline-flex flex-1 items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-blue-700">Continue to payment</button>
                    </div>
                  </form>
                ) : null}

                {checkoutStep >= 2 ? (
                  <form onSubmit={handlePaymentSubmit} className="space-y-4 rounded-lg border border-stone-300 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-700">▣</div>
                      <div>
                        <h3 className="font-display text-2xl font-bold text-slate-950">Payment</h3>
                        <p className="text-sm text-blue-700">Prototype only — no real payment is processed.</p>
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2 md:col-span-2"><label htmlFor="cardholderName" className="text-sm font-bold text-slate-700">Cardholder name</label><input id="cardholderName" required value={paymentDetails.cardholderName} onChange={(event) => setPaymentDetails((current) => ({ ...current, cardholderName: event.target.value }))} className="w-full rounded-lg border border-orange-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100" /></div>
                      <div className="space-y-2 md:col-span-2"><label htmlFor="cardNumber" className="text-sm font-bold text-slate-700">Card number</label><input id="cardNumber" required inputMode="numeric" placeholder="4242 4242 4242 4242" value={paymentDetails.cardNumber} onChange={(event) => setPaymentDetails((current) => ({ ...current, cardNumber: event.target.value }))} className="w-full rounded-lg border border-orange-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100" /></div>
                      <div className="space-y-2"><label htmlFor="expiryDate" className="text-sm font-bold text-slate-700">Expiry date</label><input id="expiryDate" required placeholder="MM/YY" value={paymentDetails.expiryDate} onChange={(event) => setPaymentDetails((current) => ({ ...current, expiryDate: event.target.value }))} className="w-full rounded-lg border border-orange-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100" /></div>
                      <div className="space-y-2"><label htmlFor="cvc" className="text-sm font-bold text-slate-700">CVC</label><input id="cvc" required inputMode="numeric" placeholder="123" value={paymentDetails.cvc} onChange={(event) => setPaymentDetails((current) => ({ ...current, cvc: event.target.value }))} className="w-full rounded-lg border border-orange-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100" /></div>
                      <div className="space-y-2 md:col-span-2"><label htmlFor="billingPostalCode" className="text-sm font-bold text-slate-700">Billing postal code</label><input id="billingPostalCode" required placeholder="M5V 2T6" value={paymentDetails.billingPostalCode} onChange={(event) => setPaymentDetails((current) => ({ ...current, billingPostalCode: event.target.value }))} className="w-full rounded-lg border border-orange-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100" /></div>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button type="button" onClick={() => setCheckoutStep(1)} className="inline-flex flex-1 items-center justify-center rounded-lg border border-stone-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:bg-stone-50">Back to details</button>
                      <button type="submit" className="inline-flex flex-1 items-center justify-center rounded-lg bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-orange-600">Place order →</button>
                    </div>
                  </form>
                ) : null}
              </div>

              <SummaryCard subtotal={subtotal} deliveryFee={deliveryFee} tax={tax} total={total} note="Prototype only — no real payment is processed." cta={<div className="rounded-lg border border-dashed border-slate-300 bg-white px-4 py-3 text-sm text-slate-600">Your order will move to confirmation after payment is submitted.</div>} />
            </div>
          </SectionCard>
        </div>
      </SiteShell>
      <BottomNav />
    </>
  );
}
