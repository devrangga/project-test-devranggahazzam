"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import sketch from "@/public/sketch.png";

const Banner: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className="h-[75vh] relative overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          transform: `translateY(${scrollY * 0.75}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <Image
          src={sketch}
          alt="sketch"
          className="w-full h-full object-cover brightness-50"
        />
      </div>
      <div
        className="absolute inset-0 text-white flex flex-col items-center justify-center"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <h1 className="text-5xl">Ideas</h1>
        <h3 className="text-2xl">Where all our great things begin</h3>
      </div>
      <div className="banner"></div>
    </main>
  );
};

export default Banner;
