import fb from "../../Firebase";
import UseAuthState from "../../component/hooks/hooks";
import { getAuth, signOut } from "firebase/auth";
import { TailSpin } from "react-loader-spinner";
import { NavLink, Outlet } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Navbar() {
  const [visible, setVisible] = useState(false);
  const { user, initializing } = UseAuthState(fb.auth());

  const auth = getAuth();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("Signed out successfully");
      })
      .catch((error) => {
        toast.error("An error occurred: " + error.message);
      });
  };

  const signinGoogle = async () => {
    const provider = new fb.auth.GoogleAuthProvider();
    fb.auth().useDeviceLanguage();
    try {
      await fb.auth().signInWithPopup(provider);
      toast.success("Signed-In Successfully");
    } catch (error) {
      toast.error("Error during sign-in: " + error.message);
    }
  };

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

  if (initializing) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <TailSpin
          height="80"
          width="80"
          color="#3f66dd"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

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
        <div className="ml-4 mt-4 text-4xl italic flex justify-between items-center">
          <div>
            <span className="font-medium text-5xl text-lightBlue">Dot</span>
            <span className="font-light text-white">Blog</span>
          </div>
          <button className="text-white mr-4" onClick={handleNavbar}>
            <CloseIcon />
          </button>
        </div>
        <div>
          <ul className="text-white text-2xl ml-4">
            <li className="mb-5">
              <NavLink to={"/"} onClick={handleNavbar}>
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
          {user ? (
            <>
              <div className="flex items-center justify-between text-lg">
                <div className="flex items-center mb-4 ml-4">
                  <img
                    src={user.photoURL}
                    alt="user"
                    className="w-10 h-10 rounded-full"
                  />
                  <span
                    className="ml-2 mr-4 cursor-pointer text-white"
                    title="Username"
                  >
                    {user.displayName}
                  </span>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className="mb-4 ml-4 px-4 py-2 rounded-md bg-lightBlue text-white"
              >
                Sign-Out
              </button>
            </>
          ) : (
            <div>
              <button
                className="mb-4 ml-4 px-4 py-2 rounded-md bg-lightBlue text-white"
                onClick={signinGoogle}
              >
                Sign-In
              </button>
            </div>
          )}
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
          className={`md:flex md:justify-between md:items-center md:w-1/2 md:pl-4 md:pt-4 md:pr-9 text-white md:text-xl hidden md:block`}
        >
          <li>
            <NavLink to={"/"}>All Blogs</NavLink>
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
          {user ? (
            <div className="flex items-center justify-between text-lg">
              <img
                src={user.photoURL}
                alt="user"
                className="w-10 h-10 rounded-full"
              />
              <span
                className="ml-2 mr-4 cursor-pointer text-white"
                title="Username"
              >
                {user.displayName}
              </span>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 rounded-md bg-lightBlue text-white"
              >
                Sign-Out
              </button>
            </div>
          ) : (
            <div>
              <button
                className="px-4 py-2 rounded-md bg-lightBlue text-white"
                onClick={signinGoogle}
              >
                Sign-In
              </button>
            </div>
          )}
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
