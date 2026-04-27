import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function useScrollAnimation(options = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-50px",
    ...options 
  });
  
  return { ref, isInView };
}
