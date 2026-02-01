"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface HeroSlide {
  id: string
  title: string
  subtitle: string
  image: string
  cta: { label: string; path: string }
}

interface HeroCarouselProps {
  slides: HeroSlide[]
}

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay, slides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlay(false)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlay(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlay(false)
  }

  const slide = slides[currentSlide]

  return (
    <div
      className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      {/* Slides */}
      <div className="relative h-[600px] sm:h-[700px]">
        {slides.map((s, index) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent z-10" />
            <Image
              src={s.image}
              alt={s.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}

        {/* Content */}
        <div className="relative h-full flex items-center z-20">
          <div className="mx-auto max-w-7xl w-full px-6 lg:px-8">
            <div className="max-w-2xl">
              <div className="overflow-hidden mb-6">
                <h1 className={`font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white transition-all duration-1000 ${
                  currentSlide === slides.indexOf(slide) ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}>
                  {slide.title}
                </h1>
              </div>
              <div className="overflow-hidden mb-8">
                <p className={`text-lg sm:text-xl text-gray-100 max-w-xl transition-all duration-1000 delay-200 ${
                  currentSlide === slides.indexOf(slide) ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}>
                  {slide.subtitle}
                </p>
              </div>
              <div className="overflow-hidden">
                <Button
                  asChild
                  size="lg"
                  className={`transition-all duration-1000 delay-300 ${
                    currentSlide === slides.indexOf(slide) ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  }`}
                >
                  <Link href={slide.cta.path}>{slide.cta.label}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all duration-300"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all duration-300"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white w-8"
                  : "bg-white/50 w-2 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
