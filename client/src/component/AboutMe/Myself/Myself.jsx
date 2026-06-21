import LanguageIcon from "@mui/icons-material/Language";
import "./Myself.css";
function Myself() {
  return (
    <div className="outer my-4">
      <section className="myself-container max-md:mt-0 max-md:w-11/12  mt-30 w-4/5 bg-gray-400 backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <img
          src="https://res.cloudinary.com/dzrjja888/image/upload/v1764665853/DPZommed_jhtz9i.jpg"
          alt="Arjun"
          className={`my-pic`}
        />
        <h2 className={`name `}>Arjun Gupta</h2>
        <p className={`about-me `}>
          Software Engineer who enjoys turning ideas into functional,
          user-friendly web applications. I have experience working across the
          full stack using technologies like React.js, Next.js, TypeScript,
          Node.js, Express.js, PostgreSQL and MongoDB, along with modern UI
          tools like Tailwind CSS and Material UI. Currently, I’m learning
          DevOps fundamentals to gain a better understanding of scalable systems
          and deployment workflows.
        </p>
        <br />
        <a
          href="https://arjun-gupta-developer.vercel.app/"
          target="_blank"
          className="text-lightBlue text-xl justify-center gap-1 flex items-center"
        >
          Portfilio -<LanguageIcon />
        </a>
      </section>
    </div>
  );
}
export default Myself;
