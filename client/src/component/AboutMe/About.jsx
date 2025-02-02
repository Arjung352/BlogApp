import Myself from "./Myself/Myself";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import InstagramIcon from "@mui/icons-material/Instagram";
import LanguageIcon from "@mui/icons-material/Language";
import XIcon from "@mui/icons-material/X";
import Footer from "../../page/Footer/Footer";
function About() {
  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: 2,
        marginTop: "1rem",
      }}
    />
  );
  return (
    <div className="relative backGround-Gradient-Light">
      <div className="flex flex-col items-center">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row max-md:pt-0 py-8">
            <div className="lg:hidden w-full mb-8">
              <Myself />
            </div>

            <div className="flex-1 flex flex-col  justify-center space-y-8 max-md:flex-col max-md:items-center max-md:justify-center">
              <div className="backdrop-filter max-md:w-11/12 bg-gray-400 backdrop-blur-md bg-opacity-10 border border-gray-100 rounded-xl shadow-lg p-6 transition duration-500">
                <h1 className="font-bold text-4xl mb-4 bg-gradient-to-r from-blue-600 to-lightBlack bg-clip-text text-transparent">
                  About{" "}
                  <span className="font-worksans italic">
                    <span className="text-blue-700 font-medium">Dot</span>
                    <span className="font-light text-3xl text-black">Blog</span>
                  </span>
                </h1>
                <p className="text-base sm:text-lg leading-relaxed text-left">
                  DotBlog is a dynamic and user-friendly blogging platform built
                  using the MERN (MongoDB, Express, React, Node.js) stack.
                  Designed for writers, readers, and content creators, DotBlog
                  offers a seamless experience for publishing and exploring
                  engaging blogs across various categories.
                  <br />
                  DotBlog empowers users to share their thoughts, ideas, and
                  stories with a global audience. Whether you're a blogger or an
                  enthusiastic reader, DotBlog provides the perfect space to
                  explore and contribute meaningful content. 🚀
                </p>
              </div>

              {/* About ME */}
              <div className="backdrop-filter max-md:w-11/12 bg-gray-400 backdrop-blur-md bg-opacity-10 border border-gray-100 rounded-xl shadow-lg p-6 transition duration-500">
                <h1 className="font-bold text-4xl mb-4 mt-4 bg-gradient-to-r from-blue-600 to-lightBlack bg-clip-text text-transparent">
                  Who am I
                </h1>
                <p className="text-base sm:text-lg leading-relaxed text-left">
                  Full Stack Web Developer with a passion for building dynamic
                  and responsive web applications. Skilled in FRONT-END
                  technologies such as HTML, CSS, JavaScript, and ReactJS, as
                  well as BACK-END technologies including Node.js, Firebase,
                  PHP, Express.js, My-SQL and MongoDB. Comfortable working with
                  frameworks and libraries like Bootstrap, Material-UI, and
                  Tailwind CSS. Dedicated to continuous learning and staying
                  up-to-date with the latest industry trends. Let's connect and
                  create innovative solutions together!
                </p>
              </div>

              {/* Connect with Us */}
              <div className="backdrop-filter bg-gray-400 backdrop-blur-md bg-opacity-10 border border-gray-100 rounded-xl shadow-lg p-6 transition duration-500">
                <h1 className="font-bold text-4xl mb-4 bg-gradient-to-r from-blue-600 to-lightBlack bg-clip-text text-transparent">
                  Connect me!
                </h1>
                <div className="flex justify-start space-x-6 text-2xl sm:text-3xl">
                  {/* <a
              href="https://www.instagram.com/_arjungupta29/"
              target="_"
              title="Instagram"
            >
              <InstagramIcon className=" hover:scale-110 transition-all ease-in-out mr-2 cursor-pointer" />
            </a> */}
                  <a
                    href="https://github.com/Arjung352/"
                    target="_"
                    title="Github"
                  >
                    <GitHubIcon className=" hover:scale-110 transition-all ease-in-out mr-2 cursor-pointer" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/arjun-gupta-948b11291"
                    target="_"
                    title="LinkedIn"
                  >
                    <LinkedInIcon className=" hover:scale-110 transition-all ease-in-out cursor-pointer mr-2" />
                  </a>
                  <a href="mailto:arjung7751@gmail.com" target="_" title="Mail">
                    <MailOutlineIcon className=" hover:scale-110 transition-all ease-in-out cursor-pointer mr-2" />
                  </a>
                  <a
                    href="https://x.com/_arjungupta29"
                    target="_"
                    title="Twitter"
                  >
                    <XIcon className=" hover:scale-110 transition-all ease-in-out cursor-pointer mr-2" />
                  </a>
                  <a
                    href="https://arjun-gupta-developer.vercel.app/"
                    target="_"
                    title="Portfolio"
                  >
                    <LanguageIcon className=" hover:scale-110 transition-all ease-in-out  cursor-pointer" />
                  </a>
                </div>
              </div>
            </div>

            <div className="hidden lg:block lg:w-1/3">
              <Myself />
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}
export default About;
