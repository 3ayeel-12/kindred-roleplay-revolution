
import { useEffect } from 'react';

export const useScrollAnimation = () => {
  useEffect(() => {
    // Set initial state for animation elements
    const animElements = document.querySelectorAll('.animate-on-scroll');
    animElements.forEach(el => {
      (el as HTMLElement).style.opacity = '0';
      (el as HTMLElement).style.transform = 'translateY(20px)';
      (el as HTMLElement).style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Create intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = '1';
            (entry.target as HTMLElement).style.transform = 'translateY(0)';
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe all elements with animation class
    animElements.forEach(el => observer.observe(el));

    // Cleanup observer on component unmount
    return () => {
      animElements.forEach(el => observer.unobserve(el));
    };
  }, []);
};

export default useScrollAnimation;
