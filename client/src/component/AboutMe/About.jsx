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
    <div className="backGround-Gradient-Light">
      <div className="flex justify-center p-8  ">
        <div className="w-4/5 flex flex-row-reverse font-worksans max-lg:flex-col">
          <Myself />
          <div className=" font-semibold font-2xl mr-16 mt-8 font-Nato max-lg:mb-4 max-sm:mr-0">
            <h1 className="font-bold text-4xl mb-4 text-olive">About Me</h1>
            <h2 className="text-3xl mb-4">Namaste</h2>
            <p>
              Hello and welcome to my blog! I'm Arjun Gupta, a MERN Stack
              Developer with a passion for web development, technology, and all
              things code. This space is where I share my journey as a
              developer, insights on the latest trends, and tips and tricks I've
              picked up along the way.
            </p>
            <ColoredLine color={"black"} />
            <h1 className="font-bold text-4xl mb-4 mt-4 text-olive">
              Who am I
            </h1>
            <h2 className="text-3xl mb-4">Hello!</h2>
            <p>
              MERN Stack Developer with a passion for building dynamic and
              responsive web applications. Skilled in FRONT-END technologies
              such as HTML, CSS, JavaScript, and ReactJS, as well as BACK-END
              technologies including Node.js, Firebase, PHP, Express.js, My-SQL
              and MongoDB. Comfortable working with frameworks and libraries
              like Bootstrap, Material-UI, and Tailwind CSS. Dedicated to
              continuous learning and staying up-to-date with the latest
              industry trends. Let's connect and create innovative solutions
              together!
            </p>
            <ColoredLine color={"black"} />
            <h1 className="font-bold text-4xl mb-4 mt-4 text-olive">
              Connect me!
            </h1>
            <div>
              {/* <a
              href="https://www.instagram.com/_arjungupta29/"
              target="_"
              title="Instagram"
            >
              <InstagramIcon className=" hover:scale-110 transition-all ease-in-out mr-2 cursor-pointer" />
            </a> */}
              <a href="https://github.com/Arjung352/" target="_" title="Github">
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
              <a href="https://x.com/_arjungupta29" target="_" title="Twitter">
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
      </div>
      <Footer />
    </div>
  );
}
export default About;
