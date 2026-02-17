import React, { useState } from 'react';
import { Zap, Clock, Target, Star, TrendingUp, Sparkles, ChevronRight, Lock } from 'lucide-react';

/**
 * NOVANOTE - BULLETPROOF MOBILE VERSION
 * 1. Replace YOUR_ID_HERE on line 12.
 * 2. DELETE EVERYTHING in your GitHub file first.
 * 3. Paste this entire block.
 */

export default function App() {
  const FORMSPREE_ID = "https://formspree.io/f/maqdywan"; 

  const [step, setStep] = useState(1);
  const [tier, setTier] = useState('spark');
  const [timing, setTiming] = useState('anytime');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [time, setTime] = useState('');

  const p = { spark: 1, blast: 5, anytime: 0, window: 1, exact: 5 };
  const total = (p[tier] || 0) + (p[timing] || 0);

  if (step === 1) return (
    <div className="min-h-screen bg-slate-950 text-white p-6 font-sans">
      <div className="max-w-md mx-auto pt-12">
        <div className="flex items-center gap-2 mb-8">
          <Zap className="text-indigo-500" fill="currentColor" />
          <span className="font-bold text-xl italic uppercase">NovaNote</span>
        </div>
        <h1 className="text-3xl font-black mb-6 italic uppercase">The Payload</h1>
        <div className="space-y-4 mb-8">
          <button onClick={() => setTier('spark')} className={`w-full p-6 rounded-2xl border-2 text-left ${tier === 'spark' ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/10'}`}>
            <div className="flex justify-between font-bold mb-2"><span>The Spark</span><span>$1</span></div>
            <p className="text-xs text-slate-400">25 rapid celebration texts.</p>
          </button>
          <button onClick={() => setTier('blast')} className={`w-full p-6 rounded-2xl border-2 text-left ${tier === 'blast' ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/10'}`}>
            <div className="flex justify-between font-bold mb-2"><span>The Blast</span><span>$5</span></div>
            <p className="text-xs text-slate-400">100+ texts + custom finale.</p>
          </button>
        </div>
        <button onClick={() => setStep(2)} className="w-full py-4 bg-indigo-600 rounded-xl font-bold">Next: Timing</button>
      </div>
    </div>
  );

  if (step === 2) return (
    <div className="min-h-screen bg-slate-950 text-white p-6 font-sans">
      <div className="max-w-md mx-auto pt-12">
        <h1 className="text-3xl font-black mb-6 italic uppercase">Timing</h1>
        <div className="space-y-3 mb-6">
          {['anytime', 'window', 'exact'].map(t => (
            <button key={t} onClick={() => setTiming(t)} className={`w-full p-5 rounded-xl border-2 flex justify-between ${timing === t ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/10'}`}>
              <span className="capitalize font-bold">{t}</span>
              <span className="text-indigo-400 font-bold">{p[t] === 0 ? 'FREE' : '+$' + p[t]}</span>
            </button>
          ))}
        </div>
        {timing !== 'anytime' && (
          <input type="time" className="w-full bg-slate-900 p-4 rounded-xl mb-6 border border-white/10" onChange={e => setTime(e.target.value)} value={time} />
        )}
        <div className="flex gap-3">
          <button onClick={() => setStep(1)} className="flex-1 py-4 bg-white/5 rounded-xl text-slate-400">Back</button>
          <button onClick={() => setStep(3)} className="flex-[2] py-4 bg-indigo-600 rounded-xl font-bold">Logistics</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 font-sans">
      <form action={`https://formspree.io/f/${FORMSPREE_ID}`} method="POST" className="max-w-md mx-auto pt-12">
        <h1 className="text-3xl font-black mb-6 italic uppercase">Logistics</h1>
        <input type="hidden" name="Tier" value={tier} /><input type="hidden" name="Timing" value={timing} />
        <input type="hidden" name="Time" value={time} /><input type="hidden" name="Total" value={total} />
        <div className="space-y-4 mb-8">
          <div><label className="text-[10px] uppercase font-bold text-slate-500">Your Email</label>
          <input type="email" name="email" required className="w-full bg-white/5 p-4 rounded-xl border border-white/10" value={email} onChange={e => setEmail(e.target.value)} /></div>
          <div><label className="text-[10px] uppercase font-bold text-slate-500">Target Phone</label>
          <input type="tel" name="phone" required className="w-full bg-white/5 p-4 rounded-xl border border-white/10" value={phone} onChange={e => setPhone(e.target.value)} /></div>
        </div>
        <div className="p-6 bg-indigo-600 rounded-3xl text-center">
          <div className="text-xs uppercase font-bold opacity-80 mb-1">Total Due</div>
          <div className="text-5xl font-black mb-4">${total}</div>
          <button type="submit" className="w-full py-4 bg-white text-indigo-600 rounded-xl font-black shadow-lg">PAY & DEPLOY</button>
        </div>
      </form>
    </div>
  );
}
