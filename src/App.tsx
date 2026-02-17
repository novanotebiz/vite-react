import React, { useState } from 'react';

/**
 * NOVANOTE - ZERO-DEPENDENCY MOBILE VERSION
 * This version uses raw SVGs to prevent "Module Not Found" errors on Vercel.
 * * INSTRUCTIONS:
 * 1. Replace "YOUR_ID_HERE" on Line 15 with your Formspree ID.
 * 2. Delete EVERYTHING in GitHub's App.jsx first.
 * 3. Paste this entire block.
 */

export default function App() {
  // --- CONFIGURATION ---
  const FORMSPREE_ID = "https://formspree.io/f/maqdywan"; 
  const spotsLeft = 12;

  const [step, setStep] = useState(1);
  const [tier, setTier] = useState('spark');
  const [timing, setTiming] = useState('anytime');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [time, setTime] = useState('');

  const p = { spark: 1, blast: 5, anytime: 0, window: 1, exact: 5 };
  const total = (p[tier] || 0) + (p[timing] || 0);

  // SVG Icons (Inline to prevent dependency errors)
  const IconZap = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
  const IconTrend = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>;
  const IconSparkle = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M3 5h4"/><path d="M19 17v4"/><path d="M17 19h4"/></svg>;

  if (step === 1) return (
    <div className="min-h-screen bg-slate-950 text-white p-6 font-sans">
      <div className="max-w-md mx-auto pt-12">
        <div className="flex items-center gap-2 mb-8 text-indigo-500">
          <IconZap />
          <span className="font-bold text-xl italic uppercase text-white">NovaNote</span>
        </div>
        <div className="mb-4 inline-block px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">{spotsLeft} Spots Left</span>
        </div>
        <h1 className="text-4xl font-black mb-6 italic uppercase leading-none">The <br/><span className="text-indigo-500 text-5xl">Payload</span></h1>
        <div className="space-y-4 mb-8">
          <button onClick={() => setTier('spark')} className={`w-full p-6 rounded-3xl border-2 text-left transition-all ${tier === 'spark' ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/10 bg-white/5'}`}>
            <div className="flex justify-between items-center mb-2">
              <IconTrend />
              <span className="text-2xl font-black italic">$1</span>
            </div>
            <h3 className="font-bold">The Spark</h3>
            <p className="text-xs text-slate-400">25 rapid-fire celebration texts.</p>
          </button>
          <button onClick={() => setTier('blast')} className={`w-full p-6 rounded-3xl border-2 text-left transition-all ${tier === 'blast' ? 'border-amber-500 bg-amber-500/10' : 'border-white/10 bg-white/5'}`}>
            <div className="flex justify-between items-center mb-2">
              <IconSparkle />
              <span className="text-2xl font-black italic">$5</span>
            </div>
            <h3 className="font-bold">The Blast</h3>
            <p className="text-xs text-slate-400">100+ texts + curated emoji storm.</p>
          </button>
        </div>
        <button onClick={() => setStep(2)} className="w-full py-5 bg-indigo-600 rounded-2xl font-black text-lg shadow-xl shadow-indigo-600/20">SET TIMING</button>
      </div>
    </div>
  );

  if (step === 2) return (
    <div className="min-h-screen bg-slate-950 text-white p-6 font-sans">
      <div className="max-w-md mx-auto pt-12 text-center">
        <h1 className="text-4xl font-black mb-8 italic uppercase text-left">Mission <br/><span className="text-indigo-500">Timing</span></h1>
        <div className="space-y-3 mb-8">
          {['anytime', 'window', 'exact'].map(t => (
            <button key={t} onClick={() => setTiming(t)} className={`w-full p-5 rounded-2xl border-2 flex justify-between items-center transition-all ${timing === t ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/10'}`}>
              <div className="text-left">
                <div className="font-bold capitalize">{t === 'anytime' ? 'Standard' : t === 'window' ? 'Priority Window' : 'Exact Moment'}</div>
                <div className="text-[10px] text-slate-500 uppercase">{t === 'anytime' ? 'Within 24h' : t === 'window' ? '2-Hour Block' : 'Precise Minute'}</div>
              </div>
              <span className="text-indigo-400 font-black">{p[t] === 0 ? 'FREE' : '+$' + p[t]}</span>
            </button>
          ))}
        </div>
        {timing !== 'anytime' && (
          <div className="mb-8 animate-in zoom-in-95">
             <label className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block mb-2 text-left">Target Time</label>
             <input type="time" className="w-full bg-slate-900 p-4 rounded-xl border border-white/10 text-xl font-bold" onChange={e => setTime(e.target.value)} value={time} />
          </div>
        )}
        <div className="flex gap-4">
          <button onClick={() => setStep(1)} className="flex-1 py-5 bg-white/5 rounded-2xl font-bold text-slate-500 uppercase text-xs">Back</button>
          <button onClick={() => setStep(3)} className="flex-[2] py-5 bg-indigo-600 rounded-2xl font-black">LOGISTICS</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 font-sans">
      <form action={`https://formspree.io/f/${FORMSPREE_ID}`} method="POST" className="max-w-md mx-auto pt-12">
        <h1 className="text-4xl font-black mb-8 italic uppercase">Final <br/><span className="text-indigo-500">Logistics</span></h1>
        <input type="hidden" name="Tier" value={tier} />
        <input type="hidden" name="Timing" value={timing} />
        <input type="hidden" name="Time" value={time} />
        <input type="hidden" name="Total_USD" value={total} />
        
        <div className="space-y-5 mb-10">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest ml-1">Your Receipt Email</label>
            <input type="email" name="email" required className="w-full bg-white/5 p-4 rounded-2xl border border-white/10 focus:border-indigo-500 outline-none transition-all" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest ml-1">Target Mobile Number</label>
            <input type="tel" name="phone" required className="w-full bg-white/5 p-4 rounded-2xl border border-white/10 focus:border-indigo-500 outline-none transition-all" placeholder="+1..." value={phone} onChange={e => setPhone(e.target.value)} />
          </div>
        </div>

        <div className="p-8 bg-indigo-600 rounded-[2.5rem] shadow-2xl shadow-indigo-600/30 text-center relative overflow-hidden">
          <div className="relative z-10">
            <div className="text-[10px] uppercase font-black tracking-widest opacity-70 mb-1">Total Mission Cost</div>
            <div className="text-6xl font-black mb-6 italic tracking-tighter">${total}</div>
            <button type="submit" className="w-full py-5 bg-white text-indigo-700 rounded-2xl font-black text-xl shadow-xl active:scale-95 transition-all">PAY & DEPLOY</button>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-12 translate-x-12"></div>
        </div>
        
        <button type="button" onClick={() => setStep(2)} className="w-full mt-6 text-center text-slate-500 text-[10px] font-black uppercase tracking-widest italic">Modify Configuration</button>
      </form>
    </div>
  );
}
