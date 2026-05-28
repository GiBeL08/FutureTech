'use client';

import { motion } from 'framer-motion';
import { useMemo, useState, useEffect } from 'react';

export default function HeroAnimation() {
  // rays — безопасны (без random)
  const rays = useMemo(
    () =>
      Array.from({ length: 120 }, (_, i) => ({
        id: i,
        rotate: i * 0.92,
        opacityDelay: i * 0.03,
      })),
    []
  );

  // particles — теперь через state
  const [particles, setParticles] = useState<
    {
      id: number;
      x: number;
      y: number;
      size: number;
      duration: number;
    }[]
  >([]);

  useEffect(() => {
    const generated = Array.from({ length: 54 }, (_, i) => {
      const angle = i * (Math.PI / 42);
      const distance = 70 + Math.random() * 280;

      return {
        id: i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        size: 1.6 + Math.random() * 2.2,
        duration: 3 + Math.random() * 3,
      };
    });

    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[#0D0E11]">
      <div className="absolute top-0 left-0">
        {/* Rays */}
        {rays.map((ray) => (
          <motion.div
            key={`ray-${ray.id}`}
            animate={{
              opacity: [0.02, 0.22, 0.02],
            }}
            transition={{
              duration: 5.2,
              repeat: Infinity,
              delay: ray.opacityDelay,
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '1px',
              height: '1400px',
              background:
                'linear-gradient(to bottom, rgba(255,255,255,0.28), rgba(255,255,255,0.04), transparent)',
              transform: `rotate(${ray.rotate}deg)`,
              transformOrigin: 'top left',
            }}
          />
        ))}

        {/* Particles */}
        {particles.map((particle) => (
          <motion.div
            key={`particle-${particle.id}`}
            animate={{
              x: [particle.x * 0.82, particle.x, particle.x * 0.82],
              y: [particle.y * 0.82, particle.y, particle.y * 0.82],
              opacity: [0.12, 0.85, 0.12],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              borderRadius: '50%',
              background: 'white',
              boxShadow: '0 0 8px rgba(255,255,255,0.35)',
            }}
          />
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0D0E11]/70 to-[#0D0E11]" />
    </div>
  );
}