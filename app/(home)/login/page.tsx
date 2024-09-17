"use client";

import { FaHandHoldingHeart } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { FaHandHolding } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
	return (
    <main>
			<div className="card bg-neutral text-neutral-content min-w-min">
				<div className="flex flex-row card-body">
					<div className="flex flex-col items-center">
						<h1 className="card-title text-center text-2xl font-bold mb-4">
							LOGIN
						</h1>
						<div className="flex flex-row justify-center gap-4">
							<a
								role="button"
								href="signup/donor"
								className="btn btn-outline text-xl"
							>
								<FaHandHoldingHeart />
								<span>Donor</span>
							</a>
							<a
								role="button"
								href="signup/admin"
								className="btn btn-outline text-xl"
							>
								<RiAdminFill />
								<span>Admin</span>
							</a>
						</div>
						<p className="text-center text-sm text-gray-500 mt-5">
							Don't have an account?{" "}
							<a
								onClick={() => router.push("/signup")}
								className="font-semibold text-primary hover:text-accent"
							>
								Sign up here.
							</a>
						</p>
					</div>
					<div className="divider divider-primary divider-horizontal">or</div>
					<div className="flex flex-col items-center">
						<h1 className="card-title text-center text-2xl font-bold mb-4">
							REQUEST
						</h1>
						<a role="button" href="request" className="btn btn-outline text-xl">
							<FaHandHolding />
							<span>Recipient</span>
						</a>
					</div>
				</div>
			</div>
		</main>
	);
}
