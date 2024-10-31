import Image from "next/image";

export default function Footer() {
  return (
    <footer className="divider divider-primary p-10">
      <div className="grid grid-flow-row auto-rows-max justify-items-center">
        <Image
          src="/aidlink.svg"
          alt="HirayaLink"
          width={48} // equivalent to max-w-12 (12 * 4px)
          height={48}
          className="max-w-12"
        />
        <p className="text-center">
          <span className="text-primary font-bold">HIRAYA</span>
          <span className="font-bold">LINK</span>
          <br />
          Copyright © {new Date().getFullYear()} - All right reserved
        </p>
      </div>
    </footer>
  );
}
