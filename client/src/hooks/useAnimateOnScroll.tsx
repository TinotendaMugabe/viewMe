import { useEffect, useRef, useState } from "react";

const useAnimateOnScroll = (threshold = 0.2) => {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin: "0px 0px -100px 0px", // Start animation a little before the element is in view
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return { ref, inView };
};

export default useAnimateOnScroll;
