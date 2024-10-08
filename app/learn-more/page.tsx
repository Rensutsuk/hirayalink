"use client";
import "@/styles/embla.css";
import { EmblaCarousel } from "@/components/EmblaCarousel";

export default function LearnMore() {
  return (
    <main className="bg-gray-50">
      {/* Hero Section */}
      <div className="hero-background bg-cover max-h-[30rem] mb-20">
        <div className="text-center pt-10 pb-20 backdrop-blur-sm">
          <h1 className="mb-5 py-10 text-5xl font-bold text-white drop-shadow-lg">
            Discover the Impact of Your Support
          </h1>
          <p className="text-xl text-white py-5">
            Learn how your generosity transforms lives.
          </p>
        </div>
      </div>

      {/* Calamity Impact Section */}
      <div className="bg-white py-20 px-5">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-5 text-green-600 border-b-4 border-green-500 inline-block pb-2">
            CALAMITY IMPACT
          </h2>
          <p className="mb-10 text-lg text-gray-600 px-5">
            See how communities are affected by natural disasters and how relief efforts are helping.
          </p>

          <div className="bg-green-200 shadow-lg rounded-lg overflow-hidden border border-green-400 transition-transform duration-300 hover:shadow-2xl">
            <EmblaCarousel>
              <div className="relative">
                <img
                  src="/calamity-impact/flood.jpg" // Update with new image path
                  alt="Calamity Impact 1"
                  className="w-full h-auto transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white p-4">
                  <p className="text-center">
                    Story of a community impacted by flooding in Barangay XYZ.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/calamity-impact/food.jpg" // Update with new image path
                  alt="Calamity Impact 2"
                  className="w-full h-auto transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white p-4">
                  <p className="text-center">
                    Residents struggling with drought in Region ABC.
                  </p>
                </div>
              </div>
            </EmblaCarousel>
          </div>
        </div>
      </div>

      {/* Stories of Change Section */}
      <div className="bg-green-50 py-20 px-5">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-5 text-green-600 border-b-4 border-green-500 inline-block pb-2">
            STORIES OF CHANGE
          </h2>
          <p className="mb-10 text-lg text-gray-600 px-5">
            Discover how your support has transformed lives and communities.
          </p>

          <div className="bg-green-200 shadow-lg rounded-lg overflow-hidden border border-green-400 transition-transform duration-300 hover:shadow-2xl">
            <EmblaCarousel>
              <div className="relative">
                <img
                  src="/stories-of-change/new-photo1.jpg" // Update with new image path
                  alt="Stories of Change 1"
                  className="w-full h-auto transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white p-4">
                  <p className="text-center">
                    A family rebuilt their lives after a typhoon with the help of donors.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/stories-of-change/new-photo2.jpg" // Update with new image path
                  alt="Stories of Change 2"
                  className="w-full h-auto transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white p-4">
                  <p className="text-center">
                    New homes provided for victims of a natural disaster.
                  </p>
                </div>
              </div>
            </EmblaCarousel>
          </div>
        </div>
      </div>
    </main>
  );
}
