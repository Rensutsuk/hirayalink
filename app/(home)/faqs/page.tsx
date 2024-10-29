'use client';

import { useState } from 'react';

export default function FAQs() {
  
  const [openFAQ1, setOpenFAQ1] = useState<string | null>(null);
  const [openFAQ2, setOpenFAQ2] = useState<string | null>(null);
  const [openFAQ3, setOpenFAQ3] = useState<string | null>(null);
  
  const toggleFAQ1 = (id: string) => {
    setOpenFAQ1(openFAQ1 === id ? null : id);
  };

  const toggleFAQ2 = (id: string) => {
    setOpenFAQ2(openFAQ2 === id ? null : id);
  };

  const toggleFAQ3 = (id: string) => {
    setOpenFAQ3(openFAQ3 === id ? null : id);
  };

  return (
    <div>
      <div className="bg-primary py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="text-white mb-8 md:mb-0 text-center md:text-left">
              <h1 className="text-5xl font-bold mb-4">FAQ</h1>
              <p className="text-lg text-justify">
                Welcome to the HirayaLink FAQ page! Here, we’ve compiled answers to some of the most common questions to help you navigate our platform and understand how we facilitate in-kind donations for those in need. Whether you’re a donor or a recipient, this section will guide you through our processes, from making donations to tracking contributions. If you don’t find the answers you’re looking for, feel free to reach out to us for further assistance.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="border-b">
                <button
                  className="w-full flex justify-between items-center py-4 text-lg font-semibold focus:outline-none hover:bg-gray-100 cursor-pointer text-left"
                  onClick={() => toggleFAQ1('faq1')}>
                  What is HirayaLink?
                  <span className="ml-2 text-xl">{openFAQ1 === 'faq1' ? '−' : '+'}</span>
                </button>
                <div
                  id="faq1"
                  className={`overflow-hidden transition-max-height duration-300 ease-in-out ${openFAQ1 === 'faq1' ? 'max-h-96' : 'max-h-0'}`}
                  style={{ maxHeight: openFAQ1 === 'faq1' ? '1000px' : '0' }}>
                  <p className="pl-4 pb-4">HirayaLink is a centralized web-based platform designed to facilitate in-kind donations to individuals and victims of natural disasters and calamities in the Philippines. It aims to enhance the efficiency, transparency, and coordination of disaster relief efforts.</p>
                </div>
              </div>

              <div className="border-b">
                <button
                  className="w-full flex justify-between items-center py-4 text-lg font-semibold focus:outline-none hover:bg-gray-100 cursor-pointer text-left"
                  onClick={() => toggleFAQ1('faq2')}>
                  Who can use HirayaLink?
                  <span className="ml-2 text-xl">{openFAQ1 === 'faq2' ? '−' : '+'}</span>
                </button>
                <div
                  id="faq2"
                  className={`overflow-hidden transition-max-height duration-300 ease-in-out ${openFAQ1 === 'faq2' ? 'max-h-96' : 'max-h-0'}`}
                  style={{ maxHeight: openFAQ1 === 'faq2' ? '1000px' : '0' }}>
                  <p className="pl-4 pb-4">HirayaLink is designed for donors, recipients (individuals in need), local government units (LGUs), and non-governmental organizations (NGOs) involved in disaster relief efforts.</p>
                </div>
              </div>

              <div className="border-b">
                <button
                  className="w-full flex justify-between items-center py-4 text-lg font-semibold focus:outline-none hover:bg-gray-100 cursor-pointer text-left"
                  onClick={() => toggleFAQ1('faq3')}>
                  What types of donations can be made through HirayaLink?
                  <span className="ml-2 text-xl">{openFAQ1 === 'faq3' ? '−' : '+'}</span>
                </button>
                <div
                  id="faq3"
                  className={`overflow-hidden transition-max-height duration-300 ease-in-out ${openFAQ1 === 'faq3' ? 'max-h-96' : 'max-h-0'}`}
                  style={{ maxHeight: openFAQ1 === 'faq3' ? '1000px' : '0' }}>
                  <p className="pl-4 pb-4">Users can make in-kind donations, which include non-monetary contributions such as food, clothing, educational materials, medical supplies, and shelter materials. Cash donations are not included in this platform.</p>
                </div>
              </div>

              <div className="border-b">
                <button
                  className="w-full flex justify-between items-center py-4 text-lg font-semibold focus:outline-none hover:bg-gray-100 cursor-pointer text-left"
                  onClick={() => toggleFAQ1('faq4')}>
                  How does HirayaLink ensure transparency in donations?
                  <span className="ml-2 text-xl">{openFAQ1 === 'faq4' ? '−' : '+'}</span>
                </button>
                <div
                  id="faq4"
                  className={`overflow-hidden transition-max-height duration-300 ease-in-out ${openFAQ1 === 'faq4' ? 'max-h-96' : 'max-h-0'}`}
                  style={{ maxHeight: openFAQ1 === 'faq4' ? '1000px' : '0' }}>
                  <p className="pl-4 pb-4">The platform includes tracking features that allow donors to see where their contributions go, ensuring accountability and transparency in the donation process.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-screen-lg">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">For Donors</h2>
          </div>

          <div className="space-y-4">
            <div className="border-b">
              <button className="w-full flex justify-between items-center py-4 text-lg font-semibold focus:outline-none hover:bg-gray-100 cursor-pointer text-left"
                onClick={() => toggleFAQ2('donor1')}>
                How can I donate through HirayaLink?
                <span className="ml-2 text-xl">{openFAQ2 === 'donor1' ? '−' : '+'}</span>
              </button>
              <div id="donor1" className={`overflow-hidden transition-max-height duration-300 ease-in-out ${openFAQ2 === 'donor1' ? 'max-h-96' : 'max-h-0'}`}
                style={{ maxHeight: openFAQ2 === 'donor1' ? '1000px' : '0' }}>
                <p className="pl-4 pb-4 text-left">Donors can browse official donation requests posted by barangay admins on the platform. After selecting a request, they can pledge their donations through the system.</p>
              </div>
            </div>

            <div className="border-b">
              <button className="w-full flex justify-between items-center py-4 text-lg font-semibold focus:outline-none hover:bg-gray-100 cursor-pointer text-left"
                onClick={() => toggleFAQ2('donor2')}>
                Can I track my donation?
                <span className="ml-2 text-xl">{openFAQ2 === 'donor2' ? '−' : '+'}</span>
              </button>
              <div id="donor2" className={`overflow-hidden transition-max-height duration-300 ease-in-out ${openFAQ2 === 'donor2' ? 'max-h-96' : 'max-h-0'}`}
                style={{ maxHeight: openFAQ2 === 'donor2' ? '1000px' : '0' }}>
                <p className="pl-4 pb-4 text-left">Yes, HirayaLink provides real-time tracking of donations. Barangay admins will input the tracking information, allowing donors to monitor the status of their contributions until they reach the intended recipients.</p>
              </div>
            </div>

            <div className="border-b">
              <button className="w-full flex justify-between items-center py-4 text-lg font-semibold focus:outline-none hover:bg-gray-100 cursor-pointer text-left"
                onClick={() => toggleFAQ2('donor3')}>
                What information will I receive after making a donation?
                <span className="ml-2 text-xl">{openFAQ2 === 'donor3' ? '−' : '+'}</span>
              </button>
              <div id="donor3" className={`overflow-hidden transition-max-height duration-300 ease-in-out ${openFAQ2 === 'donor3' ? 'max-h-96' : 'max-h-0'}`}
                style={{ maxHeight: openFAQ2 === 'donor3' ? '1000px' : '0' }}>
                <p className="pl-4 pb-4 text-left">Donors will receive notifications regarding the status of their donation, including updates on whether it has been received, is in transit, or has been delivered.</p>
              </div>
            </div>

            <div className="border-b">
              <button className="w-full flex justify-between items-center py-4 text-lg font-semibold focus:outline-none hover:bg-gray-100 cursor-pointer text-left"
                onClick={() => toggleFAQ2('donor4')}>
                How does the barangay admin handle donation requests?
                <span className="ml-2 text-xl">{openFAQ2 === 'donor4' ? '−' : '+'}</span>
              </button>
              <div id="donor4" className={`overflow-hidden transition-max-height duration-300 ease-in-out ${openFAQ2 === 'donor4' ? 'max-h-96' : 'max-h-0'}`}
                style={{ maxHeight: openFAQ2 === 'donor4' ? '1000px' : '0' }}>
                <p className="pl-4 pb-4 text-left">The barangay admin confirms the actual need for a donation drive based on requests from constituents. They post official donation requests on the platform and are responsible for receiving and tracking donations until they are distributed to the recipients.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-screen-lg">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">For Recipients</h2>
          </div>

          <div className="space-y-4">
            <div className="border-b">
              <button className="w-full flex justify-between items-center py-4 text-lg font-semibold focus:outline-none hover:bg-gray-100 cursor-pointer text-left"
                onClick={() => toggleFAQ3('recipient1')}>
                How can I request a donation through HirayaLink?
                <span className="ml-2 text-xl">{openFAQ3 === 'recipient1' ? '−' : '+'}</span>
              </button>
              <div id="recipient1" className={`overflow-hidden transition-max-height duration-300 ease-in-out ${openFAQ3 === 'recipient1' ? 'max-h-96' : 'max-h-0'}`}
                style={{ maxHeight: openFAQ3 === 'recipient1' ? '1000px' : '0' }}>
                <p className="pl-4 pb-4 text-left">Recipients can submit their needs to their barangay admin. After assessing the situation, the barangay admin will confirm the need and post an official donation request on behalf of the constituents. Note: Recipients can also request assistance even without an account on the platform.</p>
              </div>
            </div>

            <div className="border-b">
              <button className="w-full flex justify-between items-center py-4 text-lg font-semibold focus:outline-none hover:bg-gray-100 cursor-pointer text-left"
                onClick={() => toggleFAQ3('recipient2')}>
                What information do I need to provide when making a request?
                <span className="ml-2 text-xl">{openFAQ3 === 'recipient2' ? '−' : '+'}</span>
              </button>
              <div id="recipient2" className={`overflow-hidden transition-max-height duration-300 ease-in-out ${openFAQ3 === 'recipient2' ? 'max-h-96' : 'max-h-0'}`}
                style={{ maxHeight: openFAQ3 === 'recipient2' ? '1000px' : '0' }}>
                <p className="pl-4 pb-4 text-left">Recipients should provide details about their needs to the barangay admin, who will then compile the information to create an official donation request.</p>
              </div>
            </div>

            <div className="border-b">
              <button className="w-full flex justify-between items-center py-4 text-lg font-semibold focus:outline-none hover:bg-gray-100 cursor-pointer text-left"
                onClick={() => toggleFAQ3('recipient3')}>
                How are donation requests verified?
                <span className="ml-2 text-xl">{openFAQ3 === 'recipient3' ? '−' : '+'}</span>
              </button>
              <div id="recipient3" className={`overflow-hidden transition-max-height duration-300 ease-in-out ${openFAQ3 === 'recipient3' ? 'max-h-96' : 'max-h-0'}`}
                style={{ maxHeight: openFAQ3 === 'recipient3' ? '1000px' : '0' }}>
                <p className="pl-4 pb-4 text-left">Donation requests are verified by barangay admins who assess the actual needs within their community. This process reduces the validation burden on the platform and helps prevent abuse.</p>
              </div>
            </div>

            <div className="border-b">
              <button className="w-full flex justify-between items-center py-4 text-lg font-semibold focus:outline-none hover:bg-gray-100 cursor-pointer text-left"
                onClick={() => toggleFAQ3('recipient4')}>
                Can I receive assistance if I am not tech-savvy?
                <span className="ml-2 text-xl">{openFAQ3 === 'recipient4' ? '−' : '+'}</span>
              </button>
              <div id="recipient4" className={`overflow-hidden transition-max-height duration-300 ease-in-out ${openFAQ3 === 'recipient4' ? 'max-h-96' : 'max-h-0'}`}
                style={{ maxHeight: openFAQ3 === 'recipient4' ? '1000px' : '0' }}>
                <p className="pl-4 pb-4 text-left">HirayaLink aims to be user-friendly, and barangay admins are available to assist recipients in the process, helping them communicate their needs effectively.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
