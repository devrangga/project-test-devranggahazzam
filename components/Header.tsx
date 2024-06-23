"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "@/public/logo.png";
import { header } from "@/constant";

const Header: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(3);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsHeaderVisible(
        currentScrollPos < prevScrollPos || currentScrollPos <= 0
      );
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 flex flex-row justify-between items-center px-24 py-6 bg-orange z-10 ${
        !isHeaderVisible ? "hidden" : ""
      } ${prevScrollPos > 0 ? "bg-orange opacity-90" : ""}`}
    >
      <div className="w-[120px] h-[48px]">
        <Image
          src={logo}
          className="w-full h-auto object-cover"
          alt="suitmedia-logo"
          priority
        />
      </div>
      <div className="flex flex-row gap-8 text-white">
        {header.map((item, index) => (
          <p
            className={`header-label cursor-pointer relative ${
              activeIndex === index ? "active" : ""
            } `}
            key={index}
            onClick={() => setActiveIndex(index)}
          >
            {item.label}
          </p>
        ))}
      </div>
    </nav>
  );
};

export default Header;
