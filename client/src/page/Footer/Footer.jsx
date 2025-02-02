import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className="flex justify-center">
      <div className="w-4/5">
        <hr className=" border border-gray-400" />
        <div className="flex justify-between my-10 font-WorkSans max-md:mx-4 mx-8 max-md:flex-col max-md:items-center max-md:gap-5">
          <div className="flex flex-col w-2/5 items-center justify-center text-center max-md:w-full">
            <div className="drop-shadow-2xl text-4xl italic">
              <span className="font-medium text-5xl text-lightBlue font-worksans">
                Dot
              </span>
              <span className="font-light text-black font-worksans">Blog</span>
            </div>
            <p className="mt-8 text-lg text-gray-600">
              Don't focus on having a great blog. Focus on producing a blog that
              is great for your readers.
            </p>
          </div>

          <div className="text-center max-md:w-full">
            <p className="font-bold text-xl">Useful Links</p>
            <div className="text-lg text-gray-600 flex flex-col gap-3">
              <Link className="mt-3" to="/aboutme">
                About
              </Link>
              <Link to="/home">All Blogs</Link>
              <Link to="/create">Create a Blog</Link>
            </div>
          </div>

          <div className="text-center max-md:w-full">
            <p className="font-bold text-xl">Contact</p>
            <div className="text-lg text-gray-600 flex flex-col gap-3">
              <Link to="mailto:arjung.dev29@gmail.com" className="mt-3">
                arjung.dev29@gmail.com
              </Link>
              <Link to="https://www.instagram.com/_arjungupta29/">
                Instagram
              </Link>
              <Link to="https://github.com/Arjung352/">GitHub</Link>
            </div>
          </div>
        </div>

        <div className=" relative flex justify-between items-center max-md:flex-col">
          <div className="flex gap-6 mx-8 mb-5">
            <div className="p-2 bg-lightBlue rounded-full hover:scale-105 transition-all ease-in-out shadow-xl">
              <a href="mailto:arjung.dev29@gmail.com" className="text-white">
                <MailOutlineIcon />
              </a>
            </div>
            <div className="p-2 bg-lightBlue rounded-full hover:scale-105 transition-all ease-in-out shadow-xl">
              <a href="https://github.com/Arjung352/" className="text-white">
                <GitHubIcon />
              </a>
            </div>
            <div className="p-2 bg-lightBlue rounded-full hover:scale-105 transition-all ease-in-out shadow-xl">
              <a
                href="https://www.instagram.com/_arjungupta29"
                className="text-white"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>
          <p className=" max-md:text-center md:absolute md:left-[33rem] md:top-2 text-gray-600">
            &copy; 2025 All Rights Reserved | DotBlog
          </p>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
