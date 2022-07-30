import React from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  React.useEffect(() => {
    var element = document.getElementById("footer");
    if (location.pathname === "/add") {
      element.classList.add("footer-add");
    } else {
      element.classList.remove("footer-add");
    }
  }, [location]);

  return (
    <>
      <footer id="footer" className="footer footer-add">
        <div className="">Copyright &copy;2022, all rights reserved.</div>
      </footer>
    </>
  );
};

export default Footer;
