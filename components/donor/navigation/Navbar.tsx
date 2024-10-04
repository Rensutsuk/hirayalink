"use client";

import React, { useState, useEffect } from "react";
import FullMenu from "@/components/donor/navigation/navbar/Full-Menu";

const Navbar: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <nav><FullMenu /></nav>;
};

export default Navbar;
