import React, { useState } from 'react';

export default function App() {
  // CONFIG
  const FORMSPREE_ID = "YOUR_ID_HERE"; // Replace with your ID (Ensure straight quotes "")
  
  const [step, setStep] = useState(1);
  const [tier, setTier] = useState('spark');
  const [timing, setTiming] = useState('anytime');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const total = (tier === 'blast' ? 5 : 1) + (timing === 'window' ? 1 : timing === 'exact' ? 5 : 0);

  const send = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone, tier, timing, time, total: `$${total}` })
      });
      if (res.ok) setDone(true);
      else alert("Error. Check Formspree ID.");
    } catch (err) {
      alert("Network error.");
    } finally {
      setLoading(false);
    }
  };

  if (done) return (
    <div style={{ backgroundColor: '#020617', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '40px', fontWeight: 'bold' }}>SUCCESS!</h1>
      <p style={{ color: '#94a3b8' }}>Order received for {email}. Check your inbox.</p>
      <button onClick={() => window.location.reload()} style={{ marginTop: '20px', padding: '15px 30px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '10px' }}>BACK</button>
    </div>
  );

  return (
    <div style={{ backgroundColor: '#020617', color: 'white', minHeight: '100vh', fontFamily: 'sans-serif', padding: '20px' }}>
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0' }}>
          <div style={{ fontWeight: 'bold' }}>⚡ NOVANOTE</div>
          <div style={{ fontSize: '10px', color: '#818cf8', border: '1px solid #312e81', padding: '4px 10px', borderRadius: '20px' }}>12 SPOTS LEFT</div>
        </div>

        {step === 1 && (
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>THE PAYLOAD</h1>
            <button onClick={() => setTier('spark')} style={{ width: '100%', padding: '20px', marginBottom: '10px', borderRadius: '15px', border: tier === 'spark' ? '2px solid #6366f1' : '1px solid #1e293b', backgroundColor: '#0f172a', color: 'white', textAlign: 'left' }}>
               <b>Spark ($1)</b> - 25 texts
            </button>
            <button onClick={() => setTier('blast')} style={{ width: '100%', padding: '20px', marginBottom: '20px', borderRadius: '15px', border: tier === 'blast' ? '2px solid #6366f1' : '1px solid #1e293b', backgroundColor: '#0f172a', color: 'white', textAlign: 'left' }}>
               <b>Blast ($5)</b> - 100+ texts
            </button>
            <button onClick={() => setStep(2)} style={{ width: '100%', padding: '15px', backgroundColor: '#4f46e5', border: 'none', borderRadius: '10px', color: 'white', fontWeight: 'bold' }}>NEXT</button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>TIMING</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              {['anytime', 'window', 'exact'].map(t => (
                <button key={t} onClick={() => setTiming(t)} style={{ padding: '15px', borderRadius: '10px', border: timing === t ? '2px solid #6366f1' : '1px solid #1e293b', backgroundColor: '#0f172a', color: 'white' }}>
                  {t === 'anytime' ? 'Standard (Free)' : t === 'window' ? 'Window (+$1)' : 'Exact (+$5)'}
                </button>
              ))}
            </div>
            {timing !== 'anytime' && (
              <input type="time" value={time} onChange={e => setTime(e.target.value)} style={{ width: '100%', padding: '15px', backgroundColor: '#0f172a', border: '1px solid #1e293b', color: 'white', borderRadius: '10px', marginBottom: '20px' }} />
            )}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setStep(1)} style={{ flex: 1, padding: '15px', backgroundColor: '#1e293b', color: 'white', border: 'none', borderRadius: '10px' }}>BACK</button>
              <button onClick={() => setStep(3)} style={{ flex: 2, padding: '15px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold' }}>CONTINUE</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={send}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>LOGISTICS</h1>
            <input type="email" required placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '15px', marginBottom: '10px', backgroundColor: '#0f172a', border: '1px solid #1e293b', color: 'white', borderRadius: '10px' }} />
            <input type="tel" required placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} style={{ width: '100%', padding: '15px', marginBottom: '20px', backgroundColor: '#0f172a', border: '1px solid #1e293b', color: 'white', borderRadius: '10px' }} />
            <div style={{ backgroundColor: '#4f46e5', padding: '30px', borderRadius: '20px', textAlign: 'center' }}>
               <div style={{ fontSize: '50px', fontWeight: '900', marginBottom: '15px' }}>${total}</div>
               <button disabled={loading} type="submit" style={{ width: '100%', padding: '15px', backgroundColor: 'white', color: '#4f46e5', border: 'none', borderRadius: '10px', fontWeight: 'bold' }}>
                 {loading ? "SENDING..." : "DEPLOY NOW"}
               </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
