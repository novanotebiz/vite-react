import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Smartphone, 
  CheckCircle2, 
  Gift, 
  Star, 
  Heart,
  Sparkles,
  ArrowRight,
  BellRing,
  Users,
  Lock,
  X,
  Check
} from 'lucide-react';

const App = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedMessages, setSimulatedMessages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (isSimulating) {
      const interval = setInterval(() => {
        setSimulatedMessages(prev => {
          const newMessage = `Happy Birthday! 🎈 #${Math.floor(Math.random() * 100)}`;
          if (prev.length > 4) return [newMessage, ...prev.slice(0, 3)];
          return [newMessage, ...prev];
        });
      }, 800);
      return () => clearInterval(interval);
    }
  }, [isSimulating]);

  const handleWaitlistSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setShowModal(false);
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 relative">
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/90 backdrop-blur-md">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl relative">
            <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100">
              <X className="w-5 h-5 text-slate-400" />
            </button>
            {!submitted ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3">
                  <Lock className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-black mb-2">Join the Founders' Club</h2>
                <p className="text-slate-500 mb-8 text-sm">Get your first 100-text barrage for <span className="text-indigo-600 font-bold">$1</span> when we launch.</p>
                <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                  <input required type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-600 outline-none font-bold" />
                  <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">Claim My $1 Spot</button>
                </form>
              </div>
            ) : (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"><Check className="w-8 h-8 stroke-[3px]" /></div>
                <h2 className="text-2xl font-black">You're on the list!</h2>
                <p className="text-slate-500 mt-2">Check your email soon.</p>
              </div>
            )}
          </div>
        </div>
      )}

      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2"><div className="bg-indigo-600 p-2 rounded-xl"><Zap className="text-white w-5 h-5" /></div><span className="text-xl font-black tracking-tight uppercase">NovaNote</span></div>
        <div className="bg-slate-100 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500">Status: Waitlist Active</div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-12 pb-24 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-8"><Users className="w-4 h-4" /> 84/100 Spots Remaining</div>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.85] mb-8">The phone <br/> <span className="text-indigo-600 underline decoration-8 decoration-indigo-100 underline-offset-8">explosion</span> <br/> is coming.</h1>
          <p className="text-xl text-slate-600 leading-relaxed mb-10 max-w-lg">Send 250+ celebratory texts in 5 minutes. Join the waitlist for <span className="font-bold text-slate-900">90% off</span> your first order during our private beta.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => setShowModal(true)} className="bg-indigo-600 text-white px-10 py-5 rounded-[2rem] font-black text-xl hover:scale-105 transition-all shadow-2xl shadow-indigo-200 flex items-center justify-center gap-3">Join Waitlist <ArrowRight className="w-6 h-6" /></button>
            <button onMouseEnter={() => setIsSimulating(true)} onMouseLeave={() => { setIsSimulating(false); setSimulatedMessages([]); }} className="bg-white border-2 border-slate-200 text-slate-700 px-10 py-5 rounded-[2rem] font-black text-xl hover:bg-slate-50 transition-all">See Simulation</button>
          </div>
        </div>
        <div className="relative flex justify-center">
          <div className="bg-slate-900 w-72 h-[580px] rounded-[3.5rem] border-[10px] border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 w-full h-8 bg-slate-800 flex justify-center items-end pb-2 z-10"><div className="w-20 h-4 bg-slate-900 rounded-full" /></div>
            <div className="p-6 mt-12 space-y-3">
              {simulatedMessages.map((m, i) => (
                <div key={i} className="bg-indigo-500 text-white p-3 rounded-2xl rounded-bl-none text-[10px] font-bold self-start max-w-[85%] animate-in slide-in-from-bottom-4">{m}</div>
              ))}
              {simulatedMessages.length === 0 && <div className="flex flex-col items-center justify-center h-[400px] text-slate-600 text-center space-y-4 px-6 opacity-40"><Smartphone className="w-10 h-10" /><p className="text-xs font-bold uppercase tracking-widest">Incoming...</p></div>}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;

