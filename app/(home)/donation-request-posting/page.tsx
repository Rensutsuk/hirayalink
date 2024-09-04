export default function DonationRequestPosting() {
	return (
		<div>
			<div className="hero-background bg-cover max-h-[30rem]">
				<div className="py-10 text-center backdrop-blur-sm">
					<h1 className="text-5xl font-bold text-white">
						Donation Request Posting
					</h1>
				</div>
			</div>
			<div className="flex justify-center m-10">
				<div className="card outline outline-emerald-500 bg-base-100 w-full shadow-xl">
					<div className="card-title rounded-t-xl p-5 bg-primary">
						<h2 className="text-white text-2xl">Fill in the details</h2>
					</div>
					<div className="card-body">
						<h2>Head of the Family</h2>
						<form action="#" method="post">
							<div className="mb-4">
								<label
									className="block text-gray-700 text-sm font-bold mb-2"
									htmlFor="username"
								>
									Full Name
								</label>
								<input
									className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									id="username"
									type="text"
									placeholder="Username"
								></input>
							</div>
							<div className="grid grid-flow-col auto-cols-max mb-4">
								<div>
									<label
										className="block text-gray-700 text-sm font-bold mb-2"
										htmlFor="username"
									>
										Full Name
									</label>
									<input
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										id="username"
										type="text"
										placeholder="Username"
									></input>
								</div>
								<div>
									<label
										className="block text-gray-700 text-sm font-bold mb-2"
										htmlFor="username"
									>
										Full Name
									</label>
									<input
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										id="username"
										type="text"
										placeholder="Username"
									></input>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
