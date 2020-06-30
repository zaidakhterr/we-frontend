import "./layout.css";

import React from "react";
import { useMediaQuery } from "react-responsive";

const NavbarMobile = React.lazy(() => import("./NavbarMobile"));
const NavbarDesktop = React.lazy(() => import("./NavbarDesktop"));

const Navbar = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });

  return (
    <div className="navbar">
      {isMobile ? <NavbarMobile /> : <NavbarDesktop />}
    </div>
  );
};

export default Navbar;
