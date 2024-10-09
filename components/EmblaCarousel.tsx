import React from "react"; 
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const cardData = [ 
	{
		src: "./image2.jpg",
		alt: "Shoes",
		title: "Shoes!",
		description: "If a dog chews shoes whose shoes does he choose?",
	},
	{
		src: "./image3.jpg",
		alt: "Shoes",
		title: "Shoes!",
		description: "If a dog chews shoes whose shoes does he choose?",
	},
	{
		src: "./image4.jpg",
		alt: "Shoes",
		title: "Shoes!",
		description: "If a dog chews shoes whose shoes does he choose?",
	},
	{
		src: "./image5.png",
		alt: "Shoes",
		title: "Shoes!",
		description: "If a dog chews shoes whose shoes does he choose?",
	},
];

export function EmblaCarousel() {
	const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000 })]); 

	return (
		<div className="embla" ref={emblaRef}>
			<div className="embla__container">
				{cardData.map((card, index) => ( // Mapping over cardData to create slides
					<div className="embla__slide" key={index}>
						<div className="card bg-base-100 w-96 shadow-xl">
							<figure>
								<img src={card.src} alt={card.alt} />
							</figure>
							<div className="card-body">
								<h2 className="card-title">{card.title}</h2>
								<p>{card.description}</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
