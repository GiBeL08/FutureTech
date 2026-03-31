'use client';
import { motion } from 'framer-motion';

export default function HeroAnimation() {
  const rays = Array.from({ length: 80 });
  const particles = Array.from({ length: 40 });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-black">
      
      {/* Источник света */}
      <div className="absolute top-0 left-0">
        
        {/* Лучи */}
        {rays.map((_, i) => (
          <motion.div
            key={`ray-${i}`}
            animate={{
              opacity: [0.05, 0.25, 0.05],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.02,
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '1px',
              height: '1200px',
              background:
                'linear-gradient(to bottom, rgba(255,255,255,0.35), transparent)',
              transform: `rotate(${i * 1.2}deg)`,
              transformOrigin: 'top left',
            }}
          />
        ))}

        {/* Частицы */}
        {particles.map((_, i) => {
          const angle = i * (Math.PI / 40);
          const distance = 50 + Math.random() * 200;

          return (
            <motion.div
              key={`particle-${i}`}
              animate={{
                x: Math.cos(angle) * (distance + 20),
                y: Math.sin(angle) * (distance + 20),
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '3px',
                height: '3px',
                borderRadius: '50%',
                background: 'white',
              }}
            />
          );
        })}
      </div>

      {/* Лёгкое затемнение справа (как в макете) */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/60 to-black" />
    </div>
  );
}