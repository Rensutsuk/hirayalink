export default function About() {
	return (
		<div>
			<div className="hero-background bg-cover max-h-[30rem]">
				<div className="py-10 text-center backdrop-blur-sm bg-black/25">
					<h1 className="text-5xl font-bold text-white">HirayaLink</h1>
				</div>
			</div>

			<div className="py-8">
				<div className="relative px-4 sm:px-8 lg:px-12">
					<img
						src="helping-hand.jpg"
						alt="helping hand"
						className="w-full h-auto max-w-full rounded-md"
					/>

					<div className="absolute bottom-0 left-0 right-0 bg-green-600 p-4 rounded-md max-w-lg mx-auto transform translate-y-1/2">
						<p className="text-center text-white text-lg md:text-xl">
							About Us
						</p>
					</div>
				</div>
			</div>

			<div className="px-4 sm:px-8 lg:px-12 mt-8">
				<div className="max-w-3xl mx-auto">
					<p className="text-center text-gray-700 text-base md:text-lg">
						At HirayaLink, we are deeply committed to enhancing the lives of
						individuals and communities in need. Our platform serves as a vital
						connection between generous donors and those who require support,
						ensuring that aid is directed precisely where it is needed most. Our
						mission is to streamline the process of giving and receiving aid,
						making it both efficient and impactful. <br />
						<br />
						We are dedicated to fostering a culture of compassion and
						collaboration through innovative solutions that address the
						challenges faced by underserved communities. Our team of dedicated
						professionals works tirelessly to ensure that every contribution has
						a meaningful and lasting impact. By leveraging technology and
						fostering a network of committed partners, we strive to create a
						more equitable world where everyone has the opportunity to thrive.{" "}
						<br />
						<br />
						At HirayaLink, we believe that through collective effort and a
						shared vision, we can build a brighter future for all. Our
						commitment to transparency, efficiency, and compassion guides
						everything we do, and we are honored to play a role in transforming
						lives and communities for the better. <br />
						<br />
					</p>
				</div>
			</div>

			<div className="py-4">
				<hr className="border-t-2 border-green-600 mx-auto max-w-6xl" />
			</div>

			<div className="py-8 px-4 sm:px-8 lg:px-12">
				<div className="relative">
					<div className="text-center mb-8">
						<p className="text-3xl font-bold text-green-600">Our Goals</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="text-center">
							<div className="bg-green-600 p-4 rounded-md mx-auto w-full max-w-[800px]">
								<p className="text-white text-lg font-bold">
									Enhance Disaster Relief Coordination
								</p>
							</div>
							<p className="mt-2 mx-auto w-full max-w-[780px] text-center text-gray-800">
								We aim to improve the coordination, transparency, and efficiency
								of disaster relief efforts. Our goal is to expedite the donation
								process, benefiting donors, logistics providers, and recipients
								alike.
							</p>
						</div>

						<div className="text-center">
							<div className="bg-green-600 p-4 rounded-md mx-auto w-full max-w-[800px]">
								<p className="text-white text-lg font-bold">
									Promote Compassion and Bayanihan
								</p>
							</div>
							<p className="mt-2 mx-auto w-full max-w-[780px] text-center text-gray-700">
								HirayaLink is dedicated to fostering a compassionate community
								by enabling direct engagement between donors and recipients. We
								highlight real success stories to inspire potential donors and
								reinforce their commitment to supporting marginalized and
								disadvantaged individuals.
							</p>
						</div>

						<div className="text-center">
							<div className="bg-green-600 p-4 rounded-md mx-auto w-full max-w-[800px]">
								<p className="text-white text-lg font-bold">
									Provide Timely and Reliable Information
								</p>
							</div>
							<p className="mt-2 mx-auto w-full max-w-[780px] text-center text-gray-700">
								Our platform is designed to offer potential donors timely and
								reliable information about individuals affected by natural
								disasters. We aim to enable quick and effective responses to
								urgent needs.
							</p>
						</div>

						<div className="text-center">
							<div className="bg-green-600 p-4 rounded-md mx-auto w-full max-w-[800px]">
								<p className="text-white text-lg font-bold">
									Simplify Donation Processes
								</p>
							</div>
							<p className="mt-2 mx-auto w-full max-w-[780px] text-center text-gray-700">
								We seek to offer an alternative to traditional donation systems
								through a centralized platform that streamlines donation
								processes. With a user-centered approach, HirayaLink focuses on
								accessibility and ease of navigation for all users.
							</p>
						</div>

						<div className="text-center col-span-1 md:col-span-2">
							<div className="bg-green-600 p-4 rounded-md mx-auto w-full max-w-[800px]">
								<p className="text-white text-lg font-bold">
									Facilitate Efficient Communication
								</p>
							</div>
							<p className="mt-2 mx-auto w-full max-w-[780px] text-center text-gray-700">
								Our goal is to establish direct communication channels between
								donor organizations, contributors, logistics partners, recipient
								organizations, and individuals in remote areas. This will ensure
								efficient information exchange and minimize risks associated
								with the collection, transportation, and distribution of in-kind
								donations.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
