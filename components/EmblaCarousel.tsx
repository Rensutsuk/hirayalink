import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface Slide {
  src: string;
  description: string;
}

interface EmblaCarouselProps {
  slides: Slide[];
}

export function EmblaCarousel({ slides }: EmblaCarouselProps) {
  const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()]);

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {slides.map((slide, index) => (
          <div className="embla__slide" key={index}>
            <div className="card bg-base-100 w-96 shadow-xl">
              <figure>
                <img src={slide.src} alt={`Slide ${index}`} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Slide {index + 1}</h2>
                <p>{slide.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
