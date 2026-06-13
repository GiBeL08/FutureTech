'use client';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div style={{ minHeight: '100vh', background: '#0F0F0F', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes scanline {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes glitch1 {
          0%, 90%, 100% { clip-path: inset(0 0 100% 0); transform: translate(0); }
          91% { clip-path: inset(10% 0 60% 0); transform: translate(-4px, 0); }
          93% { clip-path: inset(40% 0 30% 0); transform: translate(4px, 0); }
          95% { clip-path: inset(70% 0 10% 0); transform: translate(-2px, 0); }
        }
        @keyframes glitch2 {
          0%, 88%, 100% { clip-path: inset(0 0 100% 0); transform: translate(0); }
          89% { clip-path: inset(30% 0 40% 0); transform: translate(4px, 0); color: #FFD700; }
          93% { clip-path: inset(5% 0 80% 0); transform: translate(2px, 0); }
        }
        .not-found-num { animation: float 4s ease-in-out infinite; }
        .not-found-num::before {
          content: '404'; position: absolute; inset: 0;
          color: #FFD700; animation: glitch1 5s infinite;
        }
        .not-found-num::after {
          content: '404'; position: absolute; inset: 0;
          color: #DC0416; animation: glitch2 5s infinite;
        }
        .scanline-el { animation: scanline 4s linear infinite; }
        .blink-el { animation: blink 1s step-end infinite; }
      `}</style>

      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.15, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      {/* Scanline */}
      <div className="scanline-el" style={{
        position: 'absolute', left: 0, right: 0, height: '2px',
        background: 'linear-gradient(transparent, rgba(255,215,0,0.12), transparent)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '2rem' }}>

        {/* 404 */}
        <div className="not-found-num" style={{
          fontSize: 'clamp(80px, 15vw, 140px)', fontWeight: 500,
          lineHeight: 1, color: 'white', position: 'relative',
          display: 'inline-block', marginBottom: '1.5rem', userSelect: 'none',
        }}>
          404
        </div>

        {/* Badge */}
        <div style={{ marginBottom: '1.25rem' }}>
          <span style={{
            background: '#FFD700', color: '#000', fontSize: '11px',
            fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
            padding: '4px 12px', borderRadius: '4px',
          }}>
            Страница не найдена
          </span>
        </div>

        <h1 style={{ fontSize: '22px', fontWeight: 500, color: 'white', margin: '0 0 0.5rem' }}>
          Вы зашли слишком далеко
        </h1>
        <p style={{ fontSize: '14px', color: '#9CA3AF', maxWidth: '380px', lineHeight: 1.6, margin: '0 auto 2rem' }}>
          Эта страница была удалена, переименована или никогда не существовала. Возможно, это судьба.
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => router.push('/')}
            style={{
              background: '#FFD700', color: '#000', border: 'none',
              padding: '10px 24px', borderRadius: '8px', fontSize: '14px',
              fontWeight: 500, cursor: 'pointer',
            }}
          >
            На главную
          </button>
          <button
            onClick={() => router.back()}
            style={{
              background: 'transparent', color: '#9CA3AF',
              border: '1px solid #393937', padding: '10px 24px',
              borderRadius: '8px', fontSize: '14px', cursor: 'pointer',
            }}
          >
            ← Назад
          </button>
        </div>

        {/* Terminal */}
        <div style={{
          marginTop: '2.5rem', background: '#141414', border: '1px solid #393937',
          borderRadius: '12px', padding: '14px 20px', fontFamily: 'monospace',
          fontSize: '13px', textAlign: 'left', maxWidth: '360px', margin: '2.5rem auto 0',
        }}>
          <div><span style={{ color: '#FFD700' }}>$ </span><span style={{ color: 'white' }}>curl /api/page</span></div>
          <div style={{ color: '#555', marginTop: '4px' }}>→ HTTP 404 Not Found</div>
          <div style={{ color: '#555' }}>
            → resource does not exist
            <span className="blink-el" style={{ display: 'inline-block', width: '2px', height: '13px', background: '#FFD700', marginLeft: '3px', verticalAlign: 'middle' }} />
          </div>
        </div>

      </div>
    </div>
  );
}