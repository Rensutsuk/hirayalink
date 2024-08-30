"use client";
import "../embla.css";
import { EmblaCarousel } from "@/components/EmblaCarousel";
import { MdArrowForwardIos } from "react-icons/md";

export default function About() {
  return (
    <main>
      <div
        className="bg-cover max-h-[30rem] mb-20"
        style={{
          backgroundImage:
            "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
        }}
      >
        <div className=""></div>
        <div className="text-center py-20 backdrop-blur-sm ">
          <h1 className="mb-5 py-10 text-7xl font-bold text-white">Your Help Matters</h1>
          <p className="text-xl text-white">Together we help those in need</p>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="grid grid-flow-col auto-col-auto justify-center gap-20">
          <div className="card bg-primary max-w-96 shadow-xl text-white bottom-36">
            <div className="card-body">
              <h2 className="card-title">Mission</h2>
              <p>
                To connect donors with those in need through a centralized
                platform that enhances disaster relief efforts with
                transparency, efficiency, and compassion.
              </p>
            </div>
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
              />
            </figure>
          </div>
          <div className="card bg-primary max-w-96 shadow-xl text-white bottom-36">
            <div className="card-body">
              <h2 className="card-title">Vission</h2>
              <p>
                To be a leading platform for in-kind donations, ensuring swift,
                impactful support for vulnerable communities at all times.
              </p>
            </div>
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
              />
            </figure>
          </div>
        </div>
        <div className="text-center text-slate-700">
          <h1 className="my-10 text-7xl font-bold">WELCOME!</h1>
          <p className="text-xl">
            Empowering Giving, Every Day, and in Every Way.
          </p>
          <button className="btn btn-primary max-w-xs mt-10">
            Learn More <MdArrowForwardIos />
          </button>
        </div>
      </div>
      <div className="flex grid grid-flow-row py-20 auto-rows-max justify-center bg-gradient-to-t from-green-300 to-transparent">
        <h1 className="text-5xl mb-10 font-bold">STORIES OF CHANGE</h1>
        <EmblaCarousel />
      </div>
    </main>
  );
}
