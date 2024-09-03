export default function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl" href="/">
          <img src="./aidlink.svg" alt="HirayaLink Logo" className="max-w-12" />
        </a>
        <h2 className="text-xl font-bold">
          <span className="text-primary">HIRAYA</span>
          <span>LINK</span>
        </h2>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="home">Home</a>
          </li>
          <li>
            <a href="about">About</a>
          </li>
          <li>
            <a href="contact">Contact</a>
          </li>
          <li>
            <a href="#">FAQs</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
