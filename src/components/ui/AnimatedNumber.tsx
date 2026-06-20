'use client';

import { useState, useEffect, useRef } from 'react';

interface AnimatedNumberProps {
  target: number;
  suffix?: string;
}

export default function AnimatedNumber({ target, suffix = '' }: AnimatedNumberProps) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const duration = 1500;
    const stepTime = Math.max(Math.floor(duration / target), 15);
    const timer = setInterval(() => {
      current += Math.ceil(target / (duration / stepTime));
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={nodeRef}>{count}{suffix}</span>;
}
