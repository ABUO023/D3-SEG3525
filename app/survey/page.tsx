'use client';

import { useRouter } from 'next/navigation';
import { type FormEvent } from 'react';
import { BottomNav, SectionCard, SiteHeader, SiteShell } from '../dormdash-ui';
import { useDormDash } from '../dormdash-context';

export default function SurveyPage() {
  const router = useRouter();
  const { cartCount, survey, setSurvey, surveySubmitted, setSurveySubmitted } = useDormDash();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSurveySubmitted(true);
  }

  return (
    <>
      <SiteHeader cartCount={cartCount} />
      <SiteShell>
        <div className="space-y-6 pt-5">
          <SectionCard className="p-5 md:p-6">
            <div className="max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">Communication process: post-purchase survey</p>
              <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-slate-950">Help us improve the move-in experience</h1>
              <p className="mt-3 text-base leading-7 text-slate-600">Tell us how your experience felt — we read every response.</p>
            </div>

            {surveySubmitted ? (
              <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-8 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-500 text-4xl text-white shadow-sm">✓</div>
                <h2 className="mt-5 font-display text-4xl font-bold text-slate-950">Thank you</h2>
                <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-slate-600">Your feedback helps DormDash support more students and make their move-in experience stress-free.</p>
                <button type="button" onClick={() => router.push('/')} className="mt-6 inline-flex items-center justify-center rounded-lg border border-blue-500 bg-white px-5 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50">Return to Dashboard</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-6 rounded-lg border border-stone-300 bg-white p-5 shadow-sm md:p-6">
                <div className="space-y-3">
                  <label className="text-sm font-bold uppercase tracking-[0.22em] text-slate-500">Overall rating</label>
                  <div className="flex flex-wrap gap-2">
                    {['1', '2', '3', '4', '5'].map((rating) => {
                      const active = survey.rating === rating;
                      return (
                        <button key={rating} type="button" aria-pressed={active} onClick={() => setSurvey((current) => ({ ...current, rating }))} className={`flex h-12 w-12 items-center justify-center rounded-full border text-sm font-bold transition ${active ? 'border-orange-500 bg-orange-500 text-white shadow-sm' : 'border-orange-200 bg-white text-slate-700 hover:bg-orange-50'}`}>{rating}</button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid gap-5 lg:grid-cols-2">
                  <div className="space-y-3">
                    <p className="text-2xl font-display font-bold text-slate-950">How easy was it to find what you needed?</p>
                    <div className="space-y-3">
                      {['Very Easy', 'Just Right', 'Needs Work'].map((option) => {
                        const active = survey.ease === option;
                        return (
                          <button key={option} type="button" aria-pressed={active} onClick={() => setSurvey((current) => ({ ...current, ease: option }))} className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left transition ${active ? 'border-blue-500 bg-blue-50 text-blue-900' : 'border-orange-200 bg-white text-slate-700 hover:bg-stone-50'}`}>
                            <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${active ? 'border-blue-600 bg-blue-600' : 'border-stone-300 bg-white'}`}><span className="h-2.5 w-2.5 rounded-full bg-white" /></span>
                            <span className="font-medium">{option}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-2xl font-display font-bold text-slate-950">How confident do you feel about move-in day?</p>
                    <div className="space-y-3">
                      {['Fully Prepared', 'Still a Bit Anxious'].map((option) => {
                        const active = survey.confidence === option;
                        return (
                          <button key={option} type="button" aria-pressed={active} onClick={() => setSurvey((current) => ({ ...current, confidence: option }))} className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left transition ${active ? 'border-blue-500 bg-blue-50 text-blue-900' : 'border-orange-200 bg-white text-slate-700 hover:bg-stone-50'}`}>
                            <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${active ? 'border-blue-600 bg-blue-600' : 'border-stone-300 bg-white'}`}><span className="h-2.5 w-2.5 rounded-full bg-white" /></span>
                            <span className="font-medium">{option}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="comment" className="text-sm font-bold uppercase tracking-[0.22em] text-slate-500">Anything else we should know?</label>
                  <textarea id="comment" rows={5} value={survey.comment} onChange={(event) => setSurvey((current) => ({ ...current, comment: event.target.value }))} placeholder="Your experience matters to us..." className="w-full rounded-lg border border-orange-200 bg-white px-4 py-3 text-slate-900 shadow-sm focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100" />
                </div>

                <button type="submit" className="inline-flex w-full items-center justify-center rounded-lg bg-orange-500 px-5 py-4 text-base font-bold text-white shadow-sm hover:bg-orange-600">Submit</button>
              </form>
            )}
          </SectionCard>
        </div>
      </SiteShell>
      <BottomNav />
    </>
  );
}
