import React, { useState, useEffect } from 'react';

const App: React.FC = () => {
  // ==========================================
  // 1. PASTE YOUR FORMSPREE LINK HERE:
  const FORMSPREE_URL = "PASTE_YOUR_FORMSPREE_URL_HERE";

  // 2. PASTE YOUR STRIPE LINK HERE:
  const STRIPE_LINK = "PASTE_YOUR_STRIPE_LINK_HERE";
  // ==========================================

  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulatedMessages, setSimulatedMessages] = useState<string[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [spotsLeft, setSpotsLeft] = useState(84);

  useEffect(() => {
    if (isSimulating) {
      const interval = setInterval(() => {
        setSimulatedMessages(prev => {
          const newMessage = `Happy Birthday! 🎈 #${Math.floor(Math.random() * 100)}`;
          const next = [newMessage, ...prev];
          return next.slice(0, 6);
        });
      }, 700);
      return () => clearInterval(interval);
    }
  }, [isSimulating]);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, type: "Founders Club Lead" })
      });
      if (response.ok) {
        setSubmitted(true);
        setSpotsLeft(prev => prev - 1);
      } else {
        alert("Waitlist error. Check your Formspree URL!");
      }
    } catch (error) {
      alert("Connection error.");
    } finally {
      setIsSending(false);
    }
  };

  const handlePaymentRedirect = () => {
    if (STRIPE_LINK.includes("stripe.com")) {
      window.location.href = STRIPE_LINK;
    } else {
      alert("Stripe link is missing!");
    }
  };

  return (
    <div style={{ fontFamily: '-apple-system, system-ui, sans-serif', minHeight: '100vh', backgroundColor: '#fff', color: '#111', padding: '0', margin: '0' }}>
      
      {/* Header */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', borderBottom: '1px solid #f0f0f0', position: 'sticky', top: 0, backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '32px', height: '32px', background: '#4f46e5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polyline></svg>
          </div>
          <span style={{ fontWeight: 900, fontSize: '18px', letterSpacing: '-0.5px' }}>NOVANOTE</span>
        </div>
        <div style={{ fontSize: '11px', background: '#fee2e2', color: '#dc2626', padding: '4px 10px', borderRadius: '20px', fontWeight: '800' }}>
          {spotsLeft} SPOTS LEFT
        </div>
      </nav>

      <main style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '44px', fontWeight: 900, letterSpacing: '-1.5px', lineHeight: '1', marginBottom: '15px' }}>
          The $1 <span style={{ color: '#4f46e5' }}>Birthday</span> Barrage.
        </h1>
        <p style={{ color: '#666', fontSize: '18px', maxWidth: '350px', margin: '0 auto 30px auto', lineHeight: '1.4' }}>
          Why send a card when you can send a notification explosion? ⚡️
        </p>

        <button 
          onClick={() => setShowModal(true)}
          style={{ width: '100%', maxWidth: '300px', background: '#4f46e5', color: 'white', border: 'none', padding: '20px', borderRadius: '16px', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer', boxShadow: '0 10px 25px rgba(79, 70, 229, 0.3)' }}
        >
          Secure My $1 Spot
        </button>

        {/* Demo Device */}
        <div style={{ background: '#000', width: '260px', height: '450px', margin: '50px auto', borderRadius: '40px', border: '8px solid #1a1a1a', padding: '20px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.12)', position: 'relative' }}>
          <div style={{ fontSize: '10px', color: '#333', marginBottom: '20px', fontWeight: 'bold' }}>LIVE PREVIEW</div>
          <div style={{ height: '330px', overflow: 'hidden' }}>
            {simulatedMessages.map((msg, i) => (
              <div key={i} style={{ background: '#4f46e5', color: 'white', padding: '10px 14px', borderRadius: '14px', marginBottom: '8px', fontSize: '12px', textAlign: 'left', animation: 'pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards' }}>
                {msg}
              </div>
            ))}
            {simulatedMessages.length === 0 && (
              <div 
                onMouseEnter={() => setIsSimulating(true)}
                onTouchStart={() => setIsSimulating(true)}
                style={{ marginTop: '140px', color: '#555', fontSize: '14px', cursor: 'pointer' }}
              >
                [ Tap to Test ]
              </div>
            )}
          </div>
        </div>

        {/* How it Works Section */}
        <div style={{ marginTop: '60px', textAlign: 'left', maxWidth: '400px', margin: '60px auto' }}>
          <h3 style={{ fontWeight: 900, fontSize: '20px', marginBottom: '20px' }}>How NovaNote Works</h3>
          <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
            <div style={{ minWidth: '30px', height: '30px', background: '#eee', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>1</div>
            <p style={{ margin: 0, color: '#444' }}><strong>Join the Founders Club:</strong> Pay $1 today to lock in your lifetime discount and beta access.</p>
          </div>
          <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
            <div style={{ minWidth: '30px', height: '30px', background: '#eee', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>2</div>
            <p style={{ margin: 0, color: '#444' }}><strong>Schedule the Chaos:</strong> Pick a date, time, and target phone number.</p>
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ minWidth: '30px', height: '30px', background: '#eee', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>3</div>
            <p style={{ margin: 0, color: '#444' }}><strong>Watch the Magic:</strong> At the exact minute, we send a barrage of 100+ celebratory texts.</p>
          </div>
        </div>
      </main>

      {/* Modal Overlay */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '24px', maxWidth: '340px', width: '100%', textAlign: 'center' }}>
            {!submitted ? (
              <form onSubmit={handleWaitlistSubmit}>
                <h2 style={{ fontWeight: 900, marginBottom: '8px' }}>Step 1 of 2</h2>
                <p style={{ color: '#666', fontSize: '14px', marginBottom: '20px' }}>Where should we send your invite?</p>
                <input required type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '16px', marginBottom: '12px', borderRadius: '12px', border: '2px solid #eee', outline: 'none', fontSize: '16px' }} />
                <button type="submit" disabled={isSending} style={{ width: '100%', background: '#4f46e5', color: 'white', border: 'none', padding: '16px', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px' }}>{isSending ? "Saving..." : "Continue →"}</button>
                <button onClick={() => setShowModal(false)} type="button" style={{ marginTop: '15px', background: 'none', border: 'none', color: '#999', fontSize: '13px' }}>Close</button>
              </form>
            ) : (
              <div>
                <h2 style={{ fontWeight: 900, marginBottom: '8px' }}>Final Step</h2>
                <p style={{ color: '#666', fontSize: '14px', marginBottom: '25px' }}>Email saved. Now, pay your $1 to officially lock in your spot in the Founders Club.</p>
                <button onClick={handlePaymentRedirect} style={{ width: '100%', background: '#000', color: 'white', border: 'none', padding: '18px', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px' }}>Pay $1 via Stripe</button>
                <button onClick={() => setShowModal(false)} style={{ marginTop: '15px', background: 'none', border: 'none', color: '#4f46e5', fontWeight: 'bold', fontSize: '13px' }}>I'll pay later</button>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes pop {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default App;

