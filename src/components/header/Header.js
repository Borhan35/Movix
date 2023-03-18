import React, { useState, useEffect, useRef } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation, NavLink, Link } from "react-router-dom";

import "./style.scss";

import HeaderInput from "./HeaderInput";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
  const [showClass, setShowClass] = useState("top");
  const [navShow, setNavShow] = useState(false);
  const [inputShow, setInputShow] = useState(false);
  const [top, setTop] = useState("");
  const [lastScrollY, setLastScrollY] = useState(0);
  const headerRef = useRef(null);
  const location = useLocation();

  function handleScroll() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 200) {
      if (currentScrollY > lastScrollY && !navShow) {
        setShowClass("hide");
      } else {
        setShowClass("show");
      }
    } else {
      setShowClass("top");
    }

    setLastScrollY(currentScrollY);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, navShow]);

  useEffect(() => {
    const height = headerRef.current.getBoundingClientRect().height;
    setTop(height);
  }, []);

  useEffect(() => {
    setNavShow(false);
    window.scrollTo(0, 0);
    setInputShow(false);
  }, [location]);

  const openMenuHandler = () => {
    setNavShow((show) => !show);
    setInputShow(false);
  };

  const openInputHandler = () => {
    setNavShow(false);
    setInputShow((show) => !show);
  };

  return (
    <header
      className={`header ${navShow ? "mobileView" : ""} ${showClass}`}
      ref={headerRef}
    >
      <ContentWrapper>
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="mobileMenuItems">
          <button onClick={openInputHandler}>
            <HiOutlineSearch />
          </button>
          <button onClick={openMenuHandler}>
            {!navShow ? <SlMenu /> : <VscChromeClose />}
          </button>
        </div>
        <ul className="menuItems" style={{ top: navShow ? top : "" }}>
          <li>
            <NavLink to="/explore/movie" className="menuItem">
              Movies
            </NavLink>
          </li>
          <li>
            <NavLink to="/explore/tv" className="menuItem">
              TV Shows
            </NavLink>
          </li>
          {!navShow && (
            <li className="menuItem" onClick={openInputHandler}>
              <HiOutlineSearch />
            </li>
          )}
        </ul>
      </ContentWrapper>
      <HeaderInput
        inputShow={inputShow}
        setInputShow={setInputShow}
        top={top}
      />
    </header>
  );
};

export default Header;
