import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Bloglist = () => {
  const navigate = useNavigate();
  const redirectToAbout = () => {
    navigate("/aboutme");
  };
  const [data, setData] = useState([]);
  // return (
  //   <div>
  //     {likes?.includes(user.uid) ? (
  //       <button onClick={handleLikes}>
  //         <ThumbUpIcon className=" text-lightBlue" />
  //       </button>
  //     ) : (
  //       <button onClick={handleLikes}>
  //         <ThumbUpIcon />
  //       </button>
  //     )}
  //   </div>
  // );

  useEffect(() => {
    const fetchData = (async () => {
      try {
        const data = await axios.get("http://localhost:1000/blog/display-all");
        console.log(data.data.data);
        setData(data.data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div className="font-worksans">
      <div className=" h-2/5 bg-black w-full text-white flex pt-8 flex-col justify-center items-center font-worksans">
        <h2 className="text-7xl text-center max-sm:text-6xl ">
          Welcome to DotBlog
        </h2>
        <p className="mt-8 text-center text-2xl w-2/3">
          Start your journey of writing a blog and join a community of readers
          and writers who are passionate about sharing their stories and ideas.
          So let's get started
        </p>
        <button
          onClick={redirectToAbout}
          className="mt-8 text-center text-2xl mb-16"
        >
          About Me <ArrowForwardIcon />
        </button>
      </div>
      <div className="flex justify-center items-center relative mt-4 ">
        <form className="absolute left-0 max-sm:top-14">
          <input
            type="text"
            // value={}
            // onChange={(e) => setSearch(e.target.value)}
            placeholder="Search blogs..."
            className="ml-4 border border-black rounded-lg p-2 "
          />
          <button type="submit" className="ml-2 text-lightBlue ">
            Search
          </button>
        </form>
        <h2 className="text-center font-medium text-4xl max-sm:pb-10">
          All Blogs
        </h2>
      </div>
      {/* Bloglist */}
      <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4 mb-4 mt-8">
        {data.map((blog, index) => (
          <div
            key={index}
            className="flex flex-col bg-gradient-to-b from-gray-300 to-white mb-8  justify-end rounded-2xl hover:scale-105 transition-all ease-in-out duration-300 p-4 mx-4"
          >
            <img
              src={blog.img}
              className="max-h-full max-w-full rounded-md m-auto block"
            />

            <p className=" font-semibold capitalize text-2xl mt-4">
              {blog.title}
            </p>
            <div className="flex items-center gap-2 my-2 justify-between">
              <div className="flex items-center gap-2 my-2">
                <PersonIcon className="text-lightBlue" />
                <p>{blog.userName}</p>
              </div>
              {/* <div className="flex items-center gap-2 my-2">
                {user ? (
                  <LikeBlogButton
                    id={blog.id}
                    likes={blog.likes}
                    blogslist={blogslist}
                    setBlogs={setBlogs}
                  />
                ) : (
                  <button
                    onClick={() => {
                      toast.warn("Sign-In to like this post");
                    }}
                  >
                    <LikeBlogButton />
                  </button>
                )}
                <p>
                  {blog.likes ? (
                    <span>{blog.likes.length}</span>
                  ) : (
                    <span>0</span>
                  )}
                </p>
              </div> */}
            </div>
            <div>
              <div className="flex justify-between">
                <Link
                  to={`/show/${blog._id}`}
                  className="mr-2 font-normal text-lightBlue"
                >
                  Read Now
                  <ArrowForwardIcon />
                </Link>
                {/* {blog.author === user?.uid && (
                  <>
                    <Link
                      to={`/edit-blog/${blog.id}`}
                      className="text-lightBlue -translate-x-4"
                    >
                      <EditIcon />
                    </Link>
                    <button
                      onClick={() => deleteBlog(blog.id)}
                      className="text-red-500"
                    >
                      <DeleteIcon />
                    </button>
                  </>
                )} */}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Bloglist;
