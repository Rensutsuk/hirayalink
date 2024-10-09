"use client";
import React from "react";

export default function LearnMore() {
    return (
        <main className="p-5">
            <section className="text-center mb-10">
                <h1 className="text-5xl font-bold mb-5">How Your Support Makes a Difference</h1>
                <p className="text-xl">
                    At HirayaLink, we believe that every contribution counts. By connecting donors directly with those in need, we ensure that your generosity has a meaningful impact.
                </p>
            </section>

            <section className="mb-10">
                <h2 className="text-4xl font-bold mb-5">The Challenges We Face</h2>
                <p>
                    Most existing donation systems are inefficient, lacking transparency and streamlined communication flows. This slows down the delivery process of aid and reduces trust among stakeholders. Donors often find it difficult to interact directly with recipients or assess the impact of their donations, which can discourage continued support for disaster relief efforts.
                </p>
                <p>
                    Potential donors struggle to obtain timely and accurate information about those affected by natural disasters, further complicating the donation process.
                </p>
            </section>

            <section className="mb-10">
                <h2 className="text-4xl font-bold mb-5">Our Solution: HirayaLink</h2>
                <p>
                    HirayaLink offers a centralized, user-friendly platform to tackle these challenges. By increasing coordination and transparency in the in-kind donation process, we equip Local Government Units (LGUs) and Non-Governmental Organizations (NGOs) with the tools they need to facilitate faster donations.
                </p>
                <p>
                    Our platform ensures that every donation reaches those in need swiftly and efficiently, fostering a stronger sense of community and support.
                </p>
            </section>

            <section className="mb-10">
                <h2 className="text-4xl font-bold mb-5">How You Can Help</h2>
                <p>
                    Your support is crucial in enabling us to continue our mission. Here’s how you can help:
                </p>
                <ul className="list-disc pl-10">
                    <li>Make a donation to our platform.</li>
                    <li>Share our initiative with your network.</li>
                    <li>Volunteer your time or resources to assist in our efforts.</li>
                </ul>
            </section>

            <section className="text-center">
                <h2 className="text-4xl font-bold mb-5">Join Us in Making a Difference</h2>
                <p>
                    Together, we can provide essential support to vulnerable communities and ensure that help reaches those who need it most.
                </p>
                <a
                    role="button"
                    className="btn btn-primary mt-10"
                    href="/donation-request-posting"
                >
                    Donate Now
                </a>
            </section>
        </main>
    );
}
