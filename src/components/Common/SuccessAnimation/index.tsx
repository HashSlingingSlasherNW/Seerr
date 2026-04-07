import { useCallback, useEffect, useRef, useState } from 'react';
import { useSpring, animated, config } from 'react-spring';

interface SuccessAnimationProps {
  show: boolean;
  onComplete?: () => void;
}

const SuccessAnimation = ({ show, onComplete }: SuccessAnimationProps) => {
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; color: string; delay: number }>
  >([]);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (show) {
      // Generate confetti particles
      const colors = [
        '#10b981', // emerald-500
        '#3b82f6', // blue-500
        '#8b5cf6', // violet-500
        '#ec4899', // pink-500
        '#f59e0b', // amber-500
        '#14b8a6', // teal-500
      ];

      const newParticles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 200 - 100,
        y: Math.random() * 200 - 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 300,
      }));

      setParticles(newParticles);

      // Auto-complete after animation
      const timer = setTimeout(() => {
        onCompleteRef.current?.();
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [show]);

  const checkmarkAnimation = useSpring({
    from: { scale: 0, opacity: 0, rotate: -180 },
    to: {
      scale: show ? 1 : 0,
      opacity: show ? 1 : 0,
      rotate: show ? 0 : -180,
    },
    config: config.wobbly,
  });

  const ringAnimation = useSpring({
    from: { scale: 0.8, opacity: 0 },
    to: { scale: show ? 1 : 0.8, opacity: show ? 1 : 0 },
    config: config.gentle,
  });

  if (!show) return null;

  return (
    <div className="pointer-events-none fixed inset-0 flex items-center justify-center" style={{ zIndex: 99999 }}>
      {/* Confetti particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <Particle key={particle.id} {...particle} />
        ))}
      </div>

      {/* Success checkmark */}
      <div className="relative">
        <animated.div
          style={ringAnimation}
          className="absolute inset-0 -m-4 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 opacity-20 blur-xl"
        />
        <animated.div
          style={checkmarkAnimation}
          className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 shadow-2xl"
        >
          <svg
            className="h-20 w-20 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </animated.div>
      </div>
    </div>
  );
};

interface ParticleProps {
  x: number;
  y: number;
  color: string;
  delay: number;
  id: number;
}

const Particle = ({ x, y, color, delay, id }: ParticleProps) => {
  const size = 4 + (id % 5) * 2; // varied sizes 4-12px
  const shape = id % 3; // 0 = circle, 1 = square, 2 = rectangle

  const animation = useSpring({
    from: { transform: 'translate(0px, 0px) rotate(0deg) scale(1)', opacity: 1 },
    to: {
      transform: `translate(${x}vw, ${y}vh) rotate(${360 + Math.random() * 720}deg) scale(0.2)`,
      opacity: 0,
    },
    config: { duration: 1800, easing: (t: number) => 1 - Math.pow(1 - t, 3) },
    delay,
  });

  return (
    <animated.div
      style={{
        ...animation,
        backgroundColor: color,
        width: shape === 2 ? size * 1.5 : size,
        height: shape === 2 ? size * 0.6 : size,
      }}
      className={`absolute left-1/2 top-1/2 ${shape === 0 ? 'rounded-full' : 'rounded-sm'}`}
    />
  );
};

export default SuccessAnimation;
