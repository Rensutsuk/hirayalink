import { FaHome } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { MdContacts } from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";

export default function Hamburger() {
	return (
		<div className="navbar bg-base-100">
			<div className="flex-1">
				<a className="btn btn-ghost text-xl" href="/home">
					<img src="/aidlink.svg" alt="HirayaLink Logo" className="max-w-12" />
				</a>
			</div>
			<div className="flex-none">
				<ul className="menu menu-horizontal px-1 text-xl text-black">
					<li>
						<a className="tooltip tooltip-bottom" data-tip="Home" href="/home">
							<FaHome />
						</a>
					</li>
					<li>
						<a
							className="tooltip tooltip-bottom"
							data-tip="About"
							href="/about"
						>
							<FaInfoCircle />
						</a>
					</li>
					<li>
						<a
							className="tooltip tooltip-bottom"
							data-tip="Contact"
							href="/contact"
						>
							<MdContacts />
						</a>
					</li>
					<li>
						<a className="tooltip tooltip-bottom" data-tip="FAQs" href="/faqs">
							<FaQuestionCircle />
						</a>
					</li>
				</ul>
				<div className="dropdown dropdown-end">
					<div
						tabIndex={0}
						role="button"
						className="btn btn-ghost btn-circle avatar"
					>
						<div className="w-5 rounded-full">
							<img
								alt="Tailwind CSS Navbar component"
								src="/circle-user-solid.svg"
							/>
						</div>
					</div>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
					>
						<li>
							<a href="/login">Login</a>
						</li>
						<li>
							<a href="/signup">Sign Up</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
