import { FaHandHoldingHeart } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";

export default function Signup() {
	return (
		<main>
			<div className="flex justify-center">
				<div className="card bg-base-100 w-auto shadow-xl">
					<div className="card-body">
						<h2 className="card-title">Sign Up as:</h2>
						<div className="flex flex-row justify-center gap-5">
							<a role="button" className="btn btn-outline btn-primary btn-lg flex flex-col" href="./donor">
								<FaHandHoldingHeart className="text-5xl"/> Donor
							</a>
							<a role="button" className="btn btn-outline btn-primary btn-lg flex flex-col" href="#">
								<GiReceiveMoney className="text-5xl"/> Recipient
							</a>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
