import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export const ScrollReveal = ({
  children,
  animation = 'fade-up', // 'fade-up', 'fade-in', 'slide-left', 'slide-right', 'clip-reveal'
  delay = 0, // delay in ms
  duration = 600, // duration in ms
  className = '',
  as: Component = 'div',
  ...props
}) => {
  const [ref, isVisible] = useScrollReveal();

  const getAnimationStyles = () => {
    const baseTransition = `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, clip-path ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;

    if (isVisible) {
      return {
        opacity: 1,
        transform: 'translate3d(0, 0, 0)',
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        transition: baseTransition,
      };
    }

    switch (animation) {
      case 'fade-up':
        return {
          opacity: 0,
          transform: 'translate3d(0, 24px, 0)',
          transition: baseTransition,
        };
      case 'slide-left':
        return {
          opacity: 0,
          transform: 'translate3d(-30px, 0, 0)',
          transition: baseTransition,
        };
      case 'slide-right':
        return {
          opacity: 0,
          transform: 'translate3d(30px, 0, 0)',
          transition: baseTransition,
        };
      case 'clip-reveal':
        return {
          opacity: 0,
          transform: 'scale(1.03)',
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
          transition: baseTransition,
        };
      case 'fade-in':
      default:
        return {
          opacity: 0,
          transform: 'none',
          transition: baseTransition,
        };
    }
  };

  return (
    <Component
      ref={ref}
      style={getAnimationStyles()}
      className={`reveal-init ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};
