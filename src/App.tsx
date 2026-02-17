import React, { useState } from 'react';

export default function App() {
  // --- CONFIG ---
  // Replace YOUR_ID_HERE with your Formspree ID
  const FORMSPREE_ID = "https://formspree.io/f/maqdywan";
  const spotsLeft = 12;

  // --- STATE ---
  const [step, setStep] = useState(1);
  const [tier, setTier] = useState('spark');
  const [timing, setTiming] = useState('anytime');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // --- PRICING ---
  const getPrice = () => {
    let total = tier === 'blast' ? 5 : 1;
    if (timing === 'window') total += 1;
    if (timing === 'exact') total += 5;
    return total;
  };
  const total = getPrice();

  // --- SUBMISSION ---
  const sendData = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    
    const data = {
      email,
      phone,
      tier,
      timing,
      time,
      total: `$${total}`,
      type: "FOUNDER_ORDER"
    };

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) { setSuccess(true); } 
      else { alert("Formspree Error. Check your ID."); }
    } catch (err) {
      alert("Connection failed.");
    } finally {
      setLoading(false);
    }
  };

  if (success) return (
    <div style={{ backgroundColor: '#020617', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '40px', fontWeight: 'bold', marginBottom: '10px' }}>SUCCESS!</h1>
      <p style={{ color: '#94a3b8', marginBottom: '20px' }}>Mission accepted for {email}.</p>
      <button onClick={() => window.location.reload()} style={{ padding: '15px 30px', backgroundColor: '#4f46e5', border: 'none', borderRadius: '10px', color: 'white', fontWeight: 'bold' }}>BACK</button>
    </div>
  );

  return (
    <div style={{ backgroundColor: '#020617', color: 'white', minHeight: '100vh', fontFamily: 'sans-serif', padding: '20px' }}>
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', paddingTop: '20px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '20px' }}>⚡ NOVANOTE</div>
          <div style={{ fontSize: '10px', backgroundColor: '#1e1b4b', color: '#818cf8', padding: '5px 10px', borderRadius: '20px', border: '1px solid #312e81' }}>{spotsLeft} SPOTS LEFT</div>
        </div>

        {step === 1 && (
          <div style={{ animation: 'fadeIn 0.3s' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>1. SELECT PAYLOAD</h2>
            <button onClick={() => setTier('spark')} style={{ width: '100%', padding: '20px', marginBottom: '10px', borderRadius: '15px', border: tier === 'spark' ? '2px solid #6366f1' : '1px solid #1e293b', backgroundColor: '#0f172a', color: 'white', textAlign: 'left' }}>
               <b>Spark ($1)</b> - 25 texts
            </button>
            <button onClick={() => setTier('blast')} style={{ width: '100%', padding: '20px', marginBottom: '20px', borderRadius: '15px', border: tier === 'blast' ? '2px solid #6366f1' : '1px solid #1e293b', backgroundColor: '#0f172a', color: 'white', textAlign: 'left' }}>
               <b>Blast ($5)</b> - 100+ texts
            </button>
            <button onClick={() => setStep(2)} style={{ width: '100%', padding: '15px', backgroundColor: '#4f46e5', border: 'none', borderRadius: '10px', color: 'white', fontWeight: 'bold' }}>NEXT: TIMING</button>
          </div>
        )}

        {step === 2 && (
          <div style={{ animation: 'fadeIn 0.3s' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>2. SET TIMING</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              <button onClick={() => setTiming('anytime')} style={{ padding: '15px', borderRadius: '10px', border: timing === 'anytime' ? '2px solid #6366f1' : '1px solid #1e293b', backgroundColor: '#0f172a', color: 'white' }}>Standard (Free)</button>
              <button onClick={() => setTiming('window')} style={{ padding: '15px', borderRadius: '10px', border: timing === 'window' ? '2px solid #6366f1' : '1px solid #1e293b', backgroundColor: '#0f172a', color: 'white' }}>Priority Window (+$1)</button>
              <button onClick={() => setTiming('exact')} style={{ padding: '15px', borderRadius: '10px', border: timing === 'exact' ? '2px solid #6366f1' : '1px solid #1e293b', backgroundColor: '#0f172a', color: 'white' }}>Exact Moment (+$5)</button>
            </div>
            {timing !== 'anytime' && (
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} style={{ width: '100%', padding: '15px', backgroundColor: '#0f172a', border: '1px solid #1e293b', color: 'white', borderRadius: '10px', marginBottom: '20px', boxSizing: 'border-box' }} />
            )}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setStep(1)} style={{ flex: 1, padding: '15px', backgroundColor: '#1e293b', border: 'none', borderRadius: '10px', color: 'white' }}>BACK</button>
              <button onClick={() => setStep(3)} style={{ flex: 2, padding: '15px', backgroundColor: '#4f46e5', border: 'none', borderRadius: '10px', color: 'white', fontWeight: 'bold' }}>CONTINUE</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={sendData} style={{ animation: 'fadeIn 0.3s' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>3. LOGISTICS</h2>
            <input type="email" required placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '15px', marginBottom: '10px', backgroundColor: '#0f172a', border: '1px solid #1e293b', color: 'white', borderRadius: '10px', boxSizing: 'border-box' }} />
            <input type="tel" required placeholder="Target Phone" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: '100%', padding: '15px', marginBottom: '20px', backgroundColor: '#0f172a', border: '1px solid #1e293b', color: 'white', borderRadius: '10px', boxSizing: 'border-box' }} />
            
            <div style={{ backgroundColor: '#4f46e5', padding: '30px', borderRadius: '20px', textAlign: 'center' }}>
               <div style={{ fontSize: '10px', fontWeight: 'bold', opacity: 0.7, marginBottom: '5px' }}>TOTAL COST</div>
               <div style={{ fontSize: '50px', fontWeight: '900', marginBottom: '15px' }}>${total}</div>
               <button disabled={loading} type="submit" style={{ width: '100%', padding: '15px', backgroundColor: 'white', color: '#4f46e5', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '16px' }}>
                 {loading ? "TRANSMITTING..." : "DEPLOY NOW"}
               </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}      timing,
      time,
      totalPrice: `$${total}`,
      status: "FOUNDER_DEPOSIT_PENDING"
    };

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsDone(true);
      } else {
        alert("Submission error. Please try again.");
      }
    } catch (err) {
      alert("Network error. Check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- SUCCESS SCREEN ---
  if (isDone) return (
    <div style={{ backgroundColor: '#020617', color: 'white', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '400px' }}>
        <div style={{ fontSize: '60px', marginBottom: '20px' }}>🚀</div>
        <h1 style={{ fontSize: '40px', fontWeight: '900', fontStyle: 'italic', marginBottom: '16px' }}>MISSION ACCEPTED</h1>
        <p style={{ color: '#94a3b8', lineHeight: '1.6', marginBottom: '32px' }}>
          Your celebration storm is in the queue. We've sent a confirmation to <b>{email}</b>. Watch your inbox for the deployment link!
        </p>
        <button onClick={() => window.location.reload()} style={{ width: '100%', padding: '20px', backgroundColor: '#4f46e5', border: 'none', borderRadius: '12px', color: 'white', fontWeight: 'bold' }}>BACK TO HQ</button>
      </div>
    </div>
  );

  return (
    <div style={{ backgroundColor: '#020617', color: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif', padding: '20px' }}>
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', alignItems: 'center' }}>
          <div style={{ fontWeight: 'bold', fontSize: '22px', fontStyle: 'italic' }}>⚡ NOVANOTE</div>
          <div style={{ fontSize: '10px', color: '#818cf8', border: '1px solid #312e81', padding: '4px 10px', borderRadius: '20px' }}>{spotsLeft} SPOTS LEFT</div>
        </div>

        {step === 1 && (
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '10px' }}>THE PAYLOAD</h1>
            <p style={{ color: '#94a3b8', marginBottom: '24px' }}>Choose your celebration volume.</p>
            <button onClick={() => setTier('spark')} style={{ width: '100%', padding: '20px', marginBottom: '10px', borderRadius: '15px', border: tier === 'spark' ? '2px solid #6366f1' : '1px solid #1e293b', backgroundColor: tier === 'spark' ? '#6366f11a' : '#0f172a', color: 'white', textAlign: 'left' }}>
               <div style={{fontWeight: 'bold'}}>The Spark ($1)</div>
               <div style={{fontSize: '12px', color: '#94a3b8'}}>25 celebration texts.</div>
            </button>
            <button onClick={() => setTier('blast')} style={{ width: '100%', padding: '20px', marginBottom: '24px', borderRadius: '15px', border: tier === 'blast' ? '2px solid #6366f1' : '1px solid #1e293b', backgroundColor: tier === 'blast' ? '#6366f11a' : '#0f172a', color: 'white', textAlign: 'left' }}>
               <div style={{fontWeight: 'bold'}}>The Blast ($5)</div>
               <div style={{fontSize: '12px', color: '#94a3b8'}}>100+ texts + emoji storm.</div>
            </button>
            <button onClick={() => setStep(2)} style={{ width: '100%', padding: '18px', backgroundColor: '#4f46e5', border: 'none', borderRadius: '12px', color: 'white', fontWeight: 'bold' }}>SET TIMING</button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px' }}>TIMING</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              {['anytime', 'window', 'exact'].map((t) => (
                <button key={t} onClick={() => setTiming(t)} style={{ width: '100%', padding: '18px', border: timing === t ? '2px solid #6366f1' : '1px solid #1e293b', backgroundColor: '#0f172a', color: 'white', borderRadius: '12px', textAlign: 'left', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{textTransform: 'capitalize'}}>{t}</span>
                  <span style={{color: '#818cf8'}}>{t === 'anytime' ? 'FREE' : t === 'window' ? '+$1' : '+$5'}</span>
                </button>
              ))}
            </div>
            {timing !== 'anytime' && (
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} style={{ width: '100%', padding: '15px', backgroundColor: '#0f172a', border: '1px solid #1e293b', color: 'white', borderRadius: '10px', marginBottom: '20px' }} />
            )}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setStep(1)} style={{ flex: 1, padding: '15px', backgroundColor: '#1e293b', border: 'none', borderRadius: '10px', color: 'white' }}>BACK</button>
              <button onClick={() => setStep(3)} style={{ flex: 2, padding: '15px', backgroundColor: '#4f46e5', border: 'none', borderRadius: '10px', color: 'white', fontWeight: 'bold' }}>LOGISTICS</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmit}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px' }}>LOGISTICS</h1>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ fontSize: '10px', fontWeight: 'bold', color: '#64748b', display: 'block', marginBottom: '5px' }}>YOUR EMAIL</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '15px', backgroundColor: '#0f172a', border: '1px solid #1e293b', color: 'white', borderRadius: '10px' }} />
            </div>
            <div style={{ marginBottom: '30px' }}>
              <label style={{ fontSize: '10px', fontWeight: 'bold', color: '#64748b', display: 'block', marginBottom: '5px' }}>TARGET PHONE</label>
              <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: '100%', padding: '15px', backgroundColor: '#0f172a', border: '1px solid #1e293b', color: 'white', borderRadius: '10px' }} />
            </div>

            <div style={{ backgroundColor: '#4f46e5', padding: '30px', borderRadius: '25px', textAlign: 'center' }}>
               <div style={{ fontSize: '12px', fontWeight: 'bold', opacity: 0.8, marginBottom: '5px' }}>TOTAL DUE</div>
               <div style={{ fontSize: '50px', fontWeight: '900', marginBottom: '15px' }}>${total}</div>
               <button disabled={isSubmitting} type="submit" style={{ width: '100%', padding: '15px', backgroundColor: 'white', color: '#4f46e5', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px' }}>
                 {isSubmitting ? "TRANSMITTING..." : "DEPLOY NOW"}
               </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
    <div style={{ backgroundColor: '#020617', color: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif', padding: '20px' }}>
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        {header}

        {step === 1 && (
          <div style={{ animation: 'fadeIn 0.5s' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '10px' }}>THE PAYLOAD</h1>
            <p style={{ color: '#94a3b8', marginBottom: '24px' }}>Choose your celebration volume.</p>
            <button onClick={() => setTier('spark')} style={{ width: '100%', padding: '20px', marginBottom: '10px', borderRadius: '15px', border: tier === 'spark' ? '2px solid #6366f1' : '1px solid #1e293b', backgroundColor: tier === 'spark' ? '#6366f11a' : '#0f172a', color: 'white', textAlign: 'left' }}>
               <div style={{fontWeight: 'bold'}}>The Spark ($1)</div>
               <div style={{fontSize: '12px', color: '#94a3b8'}}>25 rapid-fire celebration texts.</div>
            </button>
            <button onClick={() => setTier('blast')} style={{ width: '100%', padding: '20px', marginBottom: '24px', borderRadius: '15px', border: tier === 'blast' ? '2px solid #6366f1' : '1px solid #1e293b', backgroundColor: tier === 'blast' ? '#6366f11a' : '#0f172a', color: 'white', textAlign: 'left' }}>
               <div style={{fontWeight: 'bold'}}>The Blast ($5)</div>
               <div style={{fontSize: '12px', color: '#94a3b8'}}>100+ texts + emoji storm.</div>
            </button>
            <button onClick={() => setStep(2)} style={{ width: '100%', padding: '18px', backgroundColor: '#4f46e5', border: 'none', borderRadius: '12px', color: 'white', fontWeight: 'bold', fontSize: '16px' }}>SET TIMING</button>
          </div>
        )}

        {step === 2 && (
          <div style={{ animation: 'fadeIn 0.5s' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px' }}>TIMING</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              {['anytime', 'window', 'exact'].map((t) => (
                <button key={t} onClick={() => setTiming(t)} style={{ width: '100%', padding: '18px', border: timing === t ? '2px solid #6366f1' : '1px solid #1e293b', backgroundColor: '#0f172a', color: 'white', borderRadius: '12px', textAlign: 'left', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{textTransform: 'capitalize'}}>{t}</span>
                  <span style={{color: '#818cf8'}}>{t === 'anytime' ? 'FREE' : t === 'window' ? '+$1' : '+$5'}</span>
                </button>
              ))}
            </div>
            {timing !== 'anytime' && (
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} style={{ width: '100%', padding: '15px', backgroundColor: '#0f172a', border: '1px solid #1e293b', color: 'white', borderRadius: '10px', marginBottom: '20px', boxSizing: 'border-box' }} />
            )}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setStep(1)} style={{ flex: 1, padding: '15px', backgroundColor: '#1e293b', border: 'none', borderRadius: '10px', color: 'white' }}>BACK</button>
              <button onClick={() => setStep(3)} style={{ flex: 2, padding: '15px', backgroundColor: '#4f46e5', border: 'none', borderRadius: '10px', color: 'white', fontWeight: 'bold' }}>LOGISTICS</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <form action={`https://formspree.io/f/${FORMSPREE_ID}`} method="POST" style={{ animation: 'fadeIn 0.5s' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px' }}>LOGISTICS</h1>
            <input type="hidden" name="Tier" value={tier} />
            <input type="hidden" name="Timing" value={timing} />
            <input type="hidden" name="Total" value={total} />
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ fontSize: '10px', fontWeight: 'bold', color: '#64748b', display: 'block', marginBottom: '5px' }}>YOUR EMAIL</label>
              <input type="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '15px', backgroundColor: '#0f172a', border: '1px solid #1e293b', color: 'white', borderRadius: '10px', boxSizing: 'border-box' }} />
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label style={{ fontSize: '10px', fontWeight: 'bold', color: '#64748b', display: 'block', marginBottom: '5px' }}>TARGET PHONE</label>
              <input type="tel" name="phone" required value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: '100%', padding: '15px', backgroundColor: '#0f172a', border: '1px solid #1e293b', color: 'white', borderRadius: '10px', boxSizing: 'border-box' }} />
            </div>

            <div style={{ backgroundColor: '#4f46e5', padding: '30px', borderRadius: '25px', textAlign: 'center' }}>
               <div style={{ fontSize: '12px', fontWeight: 'bold', opacity: 0.8, marginBottom: '5px' }}>TOTAL DUE</div>
               <div style={{ fontSize: '50px', fontWeight: '900', marginBottom: '15px' }}>${total}</div>
               <button type="submit" style={{ width: '100%', padding: '15px', backgroundColor: 'white', color: '#4f46e5', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '18px' }}>DEPLOY NOW</button>
            </div>
            <button type="button" onClick={() => setStep(2)} style={{ width: '100%', textAlign: 'center', marginTop: '15px', background: 'none', border: 'none', color: '#475569', fontSize: '10px', fontWeight: 'bold' }}>EDIT ORDER</button>
          </form>
        )}
      </div>
    </div>
  );
}
