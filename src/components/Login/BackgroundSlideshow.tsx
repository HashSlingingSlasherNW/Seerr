import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

const slides = [
  '/images/slideshow/slide1.jpg',
  '/images/slideshow/slide2.jpg',
  '/images/slideshow/slide3.jpg',
  '/images/slideshow/slide4.jpg',
  '/images/slideshow/slide5.jpg',
  '/images/slideshow/slide6.jpg',
  '/images/slideshow/slide7.jpg',
];

const INTERVAL = 8000;

const BackgroundSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [transitioning, setTransitioning] = useState(false);

  const advance = useCallback(() => {
    setTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev: number) => (prev + 1) % slides.length);
      setNextIndex((prev: number) => (prev + 1) % slides.length);
      setTransitioning(false);
    }, 1500);
  }, []);

  useEffect(() => {
    const timer = setInterval(advance, INTERVAL);
    return () => clearInterval(timer);
  }, [advance]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Current slide */}
      <div
        className="absolute inset-0 transition-opacity duration-[1500ms] ease-in-out"
        style={{ opacity: transitioning ? 0 : 1 }}
      >
        <Image
          src={slides[currentIndex]}
          alt=""
          fill
          className="object-cover"
          priority={currentIndex === 0}
          sizes="100vw"
        />
      </div>
      {/* Next slide */}
      <div
        className="absolute inset-0 transition-opacity duration-[1500ms] ease-in-out"
        style={{ opacity: transitioning ? 1 : 0 }}
      >
        <Image
          src={slides[nextIndex]}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/60" />
      {/* Subtle gradient overlay at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
    </div>
  );
};

export default BackgroundSlideshow;
