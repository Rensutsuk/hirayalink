import React, { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export function EmblaCarousel() {
	const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()]);

	return (
		<div className="embla" ref={emblaRef}>
			<div className="embla__container">
				<div className="embla__slide">
					<div className="card bg-base-100 w-96 shadow-xl">
						<figure>
							<img
								src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
								alt="Shoes"
							/>
						</figure>
						<div className="card-body">
							<h2 className="card-title">Shoes!</h2>
							<p>If a dog chews shoes whose shoes does he choose?</p>
							<div className="card-actions justify-end">
								<button className="btn btn-primary">Buy Now</button>
							</div>
						</div>
					</div>
				</div>
				<div className="embla__slide">
					<div className="card bg-base-100 w-96 shadow-xl">
						<figure>
							<img
								src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
								alt="Shoes"
							/>
						</figure>
						<div className="card-body">
							<h2 className="card-title">Shoes!</h2>
							<p>If a dog chews shoes whose shoes does he choose?</p>
							<div className="card-actions justify-end">
								<button className="btn btn-primary">Buy Now</button>
							</div>
						</div>
					</div>
				</div>
				<div className="embla__slide">
					<div className="card bg-base-100 w-96 shadow-xl">
						<figure>
							<img
								src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
								alt="Shoes"
							/>
						</figure>
						<div className="card-body">
							<h2 className="card-title">Shoes!</h2>
							<p>If a dog chews shoes whose shoes does he choose?</p>
							<div className="card-actions justify-end">
								<button className="btn btn-primary">Buy Now</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
