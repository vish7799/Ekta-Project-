import React, { useState, useEffect, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

export const TestimonialCarousel = ({ testimonials = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback((index) => {
    if (isAnimating || testimonials.length === 0) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, testimonials.length]);

  const goNext = useCallback(() => {
    goToSlide((currentIndex + 1) % testimonials.length);
  }, [currentIndex, testimonials.length, goToSlide]);

  const goPrev = useCallback(() => {
    goToSlide((currentIndex - 1 + testimonials.length) % testimonials.length);
  }, [currentIndex, testimonials.length, goToSlide]);

  // Auto-rotate every 6s
  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(goNext, 6000);
    return () => clearInterval(timer);
  }, [goNext, testimonials.length]);

  if (!testimonials.length) return null;

  const current = testimonials[currentIndex];

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Quote decorative */}
      <div className="absolute -top-6 left-8 text-8xl text-amber-500/10 font-serif pointer-events-none select-none leading-none">
        "
      </div>

      {/* Testimonial card */}
      <div className="glass-card p-8 sm:p-12 rounded-lg relative overflow-hidden">
        <div
          key={currentIndex}
          className="animate-fade-in-up"
          style={{ animationDuration: '0.4s' }}
        >
          {/* Stars */}
          <div className="flex items-center space-x-1 mb-6">
            {[...Array(current.rating || 5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-500 text-amber-500" />
            ))}
          </div>

          {/* Statement */}
          <blockquote className="text-lg sm:text-xl text-industrial-100 leading-relaxed mb-8 italic">
            "{current.statement}"
          </blockquote>

          {/* Author */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 font-bold text-lg">
              {current.clientName ? current.clientName[0] : '?'}
            </div>
            <div>
              <h4 className="text-base font-bold text-white">{current.clientName}</h4>
              <p className="text-sm text-industrial-400">
                {current.designation}{current.companyName ? `, ${current.companyName}` : ''}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      {testimonials.length > 1 && (
        <>
          <div className="flex items-center justify-center space-x-4 mt-8">
            <button
              onClick={goPrev}
              disabled={isAnimating}
              className="w-10 h-10 rounded-full border border-industrial-700 text-industrial-400 hover:text-amber-500 hover:border-amber-500/40 flex items-center justify-center transition-colors disabled:opacity-50"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center space-x-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? 'bg-amber-500 w-6'
                      : 'bg-industrial-700 hover:bg-industrial-600'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              disabled={isAnimating}
              className="w-10 h-10 rounded-full border border-industrial-700 text-industrial-400 hover:text-amber-500 hover:border-amber-500/40 flex items-center justify-center transition-colors disabled:opacity-50"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
