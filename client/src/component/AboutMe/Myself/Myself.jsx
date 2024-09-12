import React from "react";
import LanguageIcon from "@mui/icons-material/Language";
import "./Myself.css";
function Myself() {
  return (
    <div className="outter">
      <div className="Myself h-fit font-worksans shadow-md shadow-black w-4/6 max-xl:w-5/6 max-lg:w-2/3 max-lg:mb-4 max-sm:w-11/12">
        <div className="Pic bg-[url('https://www.vegrecipesofindia.com/wp-content/themes/veg-recipes-2020/assets/icons/logo/logomark.svg')] pic-container">
          <img
            src="https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere-thumbnail.png"
            alt="Arjun"
            className="MyPic border-2 border-black"
          />
          <p className="Name text-center ">Arjun Gupta</p>
        </div>
        <div className="AboutMe">
          <p className=" font-semibold font-sans pb-2 text-lg">
            Hi, I'm Arjun Gupta, a passionate and dedicated MERN Stack Developer
            with a strong foundation in building dynamic and responsive web
            applications. With a background in software engineering, I've honed
            my skills in MongoDB, Express.js, React.js, and Node.js to deliver
            seamless, full-stack solutions that meet modern web development
            standards.
            <br />
            <a
              href="https://arjun-gupta-developer.vercel.app/"
              target="_blank"
              className="text-lightBlue gap-1 mt-1 flex items-center"
            >
              Portfilio -<LanguageIcon />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Myself;
