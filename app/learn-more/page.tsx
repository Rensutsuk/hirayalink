"use client";
import React from "react";

export default function LearnMore() {
    return (
        <main className="p-5">
            {/* Hero Section with Full-Page Background Image */}
            <section 
                className="hero-background bg-cover h-screen mb-20 relative overflow-hidden" 
                style={{ backgroundImage: 'url(https://cashmart.ph/wp-content/uploads/2023/03/Kyah-Pembarya-Should-You-Give-Money-to-Street-Children.jpg)', backgroundPosition: 'center', backgroundSize: 'cover' }}
            >
                {/* Black shadow overlay */}
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="h-full flex flex-col justify-center items-center text-center px-5 relative z-10">
                    <h1 className="text-white text-6xl font-bold mb-5 drop-shadow-lg animate__animated animate__fadeInDown">
                    Empowering Giving, Everyday, and Every Way
                    </h1>
                    <p className="text-white text-2xl max-w-2xl drop-shadow-md animate__animated animate__fadeInUp">
                        Your generosity directly impacts the lives of those affected by calamities. Together, we can rebuild lives, one donation at a time.
                    </p>
                </div>
            </section>

            {/* Intro Section */}
            <section className="bg-green-700 py-16 mb-16 rounded-lg shadow-lg">
                <div className="max-w-4xl mx-auto text-center px-5">
                    <h2 className="text-5xl font-bold mb-5 text-white">In-Kind Donations: A Path to Empower Communities in Need</h2>
                </div>

                <div className="max-w-4xl mx-auto px-5 space-y-5">
                    <p className="text-xl text-white text-justify">
                        In-kind donations are more than just goods; they are a lifeline for many Filipino families facing hardships, especially in disaster-prone areas. These donations include essential items such as food, clothing, medical supplies, educational materials, and construction materials. By contributing these vital resources, you can directly impact the lives of those who need it most.
                    </p>

                    <p className="text-xl text-white text-justify">
                        Imagine a family recovering from a recent calamity, their home damaged and their livelihood disrupted. Your donation of food can alleviate hunger, ensuring that children have the nourishment they need to thrive. Clothing can provide warmth and comfort, helping individuals regain their dignity in times of distress. Educational materials can support children in continuing their studies, fostering hope for a brighter future.
                    </p>

                    <p className="text-xl text-white text-justify">
                        Furthermore, in-kind contributions like hygiene supplies and health items can prevent the spread of diseases, safeguarding the well-being of communities. By providing construction materials, you can help rebuild homes and lives, allowing families to regain stability and a sense of security.
                    </p>

                    <p className="text-xl text-white text-justify">
                        In-kind donations not only address immediate needs but also foster a sense of community and solidarity. They demonstrate that, even in challenging times, there are people who care and are willing to help. Every item donated represents a gesture of compassion, showing those in need that they are not alone.
                    </p>

                    <p className="text-xl text-white text-justify">
                        Join us in our mission to support Filipino communities through in-kind donations. Your contributions can transform lives and inspire hope, making a significant difference in the fight against poverty and adversity. Together, we can create a stronger, more resilient future for all.
                    </p>
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-white py-16 text-center mb-10 rounded-lg shadow-lg">
                <div className="max-w-4xl mx-auto px-5">
                    <h2 className="text-4xl font-bold mb-5 text-green-900 animate__animated animate__fadeIn">Join Us in Making a Difference</h2>
                    <p className="text-xl text-green-800 animate__animated animate__fadeIn">
                        Together, we can provide essential support to vulnerable communities and ensure that help reaches those who need it most.
                    </p>
                    <a
                        role="button"
                        className="btn btn-primary mt-5 bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded transition duration-300"
                        href="/signup"
                    >
                        Donate Now
                    </a>
                </div>
            </section>
        </main>
    );
}
