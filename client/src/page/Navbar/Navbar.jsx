import { TailSpin } from "react-loader-spinner";
import { NavLink, Outlet } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const redirect = useNavigate();
  const handleSignOut = () => {
    localStorage.clear();
    redirect("/");
  };
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup function to reset overflow style when the component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  const handleNavbar = () => {
    setVisible(!visible);
  };

  return (
    <>
      {/* Overlay Navbar */}
      <div
        className={`w-screen h-svh bg-black inset-0 flex overflow-y-hidden fixed top-0 left-0 flex-col justify-between transform transition-transform ${
          visible ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ position: "fixed", zIndex: 10 }}
      >
        <div className="ml-4 mt-4 text-4xl italic flex justify-between items-center ">
          <div>
            <span className="font-medium text-5xl text-lightBlue font-worksans">
              Dot
            </span>
            <span className="font-light text-white font-worksans">Blog</span>
          </div>
          <button className="text-white mr-4" onClick={handleNavbar}>
            <CloseIcon />
          </button>
        </div>
        <div>
          <ul className="text-white text-2xl ml-4 flex flex-col gap-3 font-worksans">
            <li className="mb-5">
              <NavLink to={"/home"} onClick={handleNavbar}>
                All Blogs
              </NavLink>
            </li>
            <li className="mb-5">
              <NavLink to={"create"} onClick={handleNavbar}>
                CreateBlog
              </NavLink>
            </li>
            <li className="mb-5">
              <NavLink to={"aboutme"} onClick={handleNavbar}>
                About
              </NavLink>
            </li>
          </ul>
        </div>
        <div>
          <button
            onClick={handleSignOut}
            className="mb-4 ml-4 px-4 py-2 font-worksans rounded-md bg-lightBlue text-white"
          >
            Sign-Out
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="w-full bg-black pb-2 flex justify-between items-center font-worksans">
        <div className="text-5xl italic max-lg:text-3xl">
          <span className="font-medium text-6xl max-lg:text-4xl text-lightBlue">
            Dot
          </span>
          <span className="font-light text-white">Blog</span>
        </div>
        <ul
          className={`md:flex md:justify-between md:items-center md:w-1/2 md:pl-4 md:pt-2 md:pr-9 text-white md:text-xl hidden md:block`}
        >
          <li>
            <NavLink to={"/home"}>All Blogs</NavLink>
          </li>
          <li>
            <NavLink to={"create"}>CreateBlog</NavLink>
          </li>
          <li>
            <NavLink to={"aboutme"}>About</NavLink>
          </li>
        </ul>
        <div
          className={`md:mr-4 md:flex md:justify-end md:items-center md:mt-2 hidden md:block`}
        >
          <button
            onClick={handleSignOut}
            className="px-4 py-2 rounded-md bg-lightBlue text-white"
          >
            Sign-Out
          </button>
        </div>
        <button
          className={`max-md:block max-md:mr-2 ${
            visible ? "hidden" : "block"
          } text-white md:hidden`}
          onClick={handleNavbar}
        >
          <MenuIcon />
        </button>
      </div>
      <div>
        <ToastContainer />
      </div>
      <Outlet />
    </>
  );
}

export default Navbar;
