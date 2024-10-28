import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

interface Slide {
  id?: string;
  src?: string;
  image?: Buffer | null;
  description?: string;
  title?: string;
  area?: string;
  nameOfCalamity?: string;
  storyText?: string;
  controlNumber?: string;
  transactionIds?: string;
  batchNumber?: string;
  numberOfRecipients?: number;
  Barangay?: {
    name: string;
  } | null;
  createdAt: string; // Add this field
}

interface EmblaCarouselProps {
  slides: Slide[];
  type: 'calamity' | 'success';
}

export function EmblaCarousel({ slides, type }: EmblaCarouselProps) {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  const getImageSrc = (slide: Slide) => {
    if (slide.image) {
      // Convert Buffer to base64
      const base64Image = Buffer.from(slide.image).toString('base64');
      return `data:image/jpeg;base64,${base64Image}`;
    }
    return slide.src || '/placeholder-image.jpg';
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCalamityHeader = (slide: Slide) => {
    if (type !== 'calamity') return '';
    
    const location = slide.Barangay?.name 
      ? `${slide.area}, ${slide.Barangay.name}`
      : slide.area;

    return `Impact of ${slide.nameOfCalamity} in ${location}`;
  };

  const formatSuccessHeader = (slide: Slide) => {
    if (type !== 'success') return '';
    
    const location = slide.Barangay?.name 
      ? `${slide.area}, ${slide.Barangay.name}`
      : slide.area;

    return `Success Story from ${location}`;
  };

  return (
    <div className="embla h-full" ref={emblaRef}>
      <div className="embla__container">
        {slides.map((slide, index) => (
          <div className="embla__slide" key={slide.id || index}>
            {/* Fixed card dimensions for both types */}
            <div className="card card-compact bg-base-100 shadow-xl w-[320px] h-[380px] mx-auto">
              {/* Image Section - Fixed height */}
              <figure className="relative h-32 shrink-0">
                <Image
                  src={getImageSrc(slide)}
                  alt={slide.nameOfCalamity || `Slide ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </figure>

              {/* Content wrapper with fixed height */}
              <div className="card-body p-3 h-[calc(380px-8rem)] flex flex-col">
                {/* Title and Date Section */}
                <div className="flex justify-between items-start gap-2 h-14">
                  <h2 className="card-title text-primary text-sm line-clamp-2 flex-1">
                    {type === 'calamity' 
                      ? formatCalamityHeader(slide)
                      : formatSuccessHeader(slide)}
                  </h2>
                  <div className="text-[10px] text-right shrink-0">
                    <div>{formatDate(slide.createdAt)}</div>
                    <div>{formatTime(slide.createdAt)}</div>
                  </div>
                </div>

                {/* Story Text - Fixed height */}
                <div className="h-12">
                  <p className="text-xs line-clamp-2">
                    {slide.storyText || slide.description}
                  </p>
                </div>

                {/* Details Grid - Fixed height */}
                <div className="grid grid-cols-2 gap-1.5 text-[10px] mt-auto">
                  {type === 'success' && slide.nameOfCalamity && (
                    <div className="bg-base-200 p-1.5 rounded h-12">
                      <span className="font-semibold">Calamity:</span>
                      <div className="truncate">{slide.nameOfCalamity}</div>
                    </div>
                  )}

                  {slide.controlNumber && (
                    <div className="bg-base-200 p-1.5 rounded h-12">
                      <span className="font-semibold">Control #:</span>
                      <div className="truncate">{slide.controlNumber}</div>
                    </div>
                  )}

                  {slide.batchNumber && (
                    <div className="bg-base-200 p-1.5 rounded h-12">
                      <span className="font-semibold">Batch #:</span>
                      <div className="truncate">{slide.batchNumber}</div>
                    </div>
                  )}

                  {slide.transactionIds && (
                    <div className="bg-base-200 p-1.5 rounded h-12">
                      <span className="font-semibold">Trans ID:</span>
                      <div className="badge badge-xs badge-neutral truncate">
                        {slide.transactionIds}
                      </div>
                    </div>
                  )}

                  {slide.numberOfRecipients && (
                    <div className="bg-base-200 p-1.5 rounded h-12">
                      <span className="font-semibold">Recipients:</span>
                      <div className="badge badge-xs badge-primary">
                        {slide.numberOfRecipients}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
