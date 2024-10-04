"use client";
//install npm install react-swipeable//
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

export default function Donate() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "/Philippines.png",
    "/image2.jpg",
    "/image3.jpg",
    "/image4.jpg",
    "/image5.png"
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  // Automatically change images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000); // Change the image every 3000 milliseconds (3 seconds)

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
  
  {/* Welcome Message Section */}
  <div className="w-full max-w-7xl bg-white shadow-lg rounded-lg overflow-hidden text-center py-4 mb-6">
    <h1 className="text-3xl font-bold">
      WELCOME TO <span className="text-primary">HIRAYA</span><span>LINK</span>, DONOR💚!
    </h1>
  </div>
  
  {/* Post Container */}
  <div className="w-full max-w-7xl bg-white shadow-lg rounded-lg overflow-hidden flex flex-col lg:flex-row h-auto lg:h-[800px]">
    
    {/* Slider Section */}
    <div className="lg:w-2/3 w-full flex flex-col p-6 bg-white relative" {...handlers}>
      <div className="relative mb-4 h-[350px] sm:h-[450px] lg:h-[450px]">
        <Image
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          fill
          className="object-cover rounded-lg transition-opacity duration-300"
        />
      </div>

      {/* Description Section */}
      <div className="flex flex-col justify-start text-gray-800 mt-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">
          <span className="text-primary">HIRAYA</span><span>LINK</span>: Empowering Giving, Every Day and in Every Way
        </h2>
        <p className="text-sm sm:text-base">
          At HirayaLink, we connect those in need with generous donors who are ready to make a real impact. By exploring the requests from various communities, you can provide assistance where it's needed most. Whether you're looking to donate in-kind items, every contribution has the power to change lives. You can easily view barangay donation requests or recipient requests using the buttons on the right. Rest assured, your donations are genuinely needed—barangay officials oversee verified donation drives and confirm that the content of each recipient request post reflects actual needs within their communities. Join us in building stronger communities and making a lasting difference in people's lives. Your kindness and generosity can spark hope and transformation for those facing challenges.
        </p>
      </div>
    </div>

    {/* Right Side: Button Section */}
    <div className="lg:w-1/3 w-full p-6 lg:p-8 bg-green-100 text-black flex flex-col justify-center">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4">Choose Your Action</h2><br />
      <p className="text-base sm:text-lg mb-6">
        Stay informed with updated information on individuals and barangays affected by the calamity, as well as other essential resources. Select an option to view the timelines.
      </p><br />
      <div className="space-y-4">
        <p>You can see official donation drives for each barangay here, where you can pledge your donations. We’ll track your contributions until they reach the affected areas and the intended recipients.</p>
        <button
          onClick={() => router.push('/brgy-donation-req-timeline')}
          className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Barangay Donation Request Timeline  
        </button>
        <p>You can view posts from individuals affected by the calamity, allowing you to see their situations, requests, and current conditions.</p>
        <button
          onClick={() => router.push('/recipient-request-timeline')}
          className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Recipient Request Timeline
        </button>
      </div>
    </div>
  </div>
</div>

  );
}
