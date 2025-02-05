import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import Footer from "./Footer/Footer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SearchIcon from "@mui/icons-material/Search";

const Bloglist = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [tag, setTag] = useState([]);
  const [selectedTag, setSelectedTag] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getTags = await axios.get(
          "https://blogapi-sooty.vercel.app/blog/get-tags"
        );
        const response = await axios.get(
          "https://blogapi-sooty.vercel.app/blog/display-all"
        );
        setTag(getTags.data.tags);
        setData(response.data.data);
        setFilteredData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredData(
      data.filter((blog) =>
        blog.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, data]);

  const handleLike = async (id) => {
    try {
      const userId = localStorage.getItem("_id");
      const username = localStorage.getItem("username");
      const blog = data.find((blog) => blog._id === id);

      // Check if the user has already liked the blog
      if (blog.likes.includes(userId)) {
        toast.error("You have already liked this blog");
        return;
      }

      const response = await axios.post(
        `https://blogapi-sooty.vercel.app/blog/like-blog/${id}`,
        { username }
      );

      if (response.status === 200) {
        toast.success("Blog liked successfully");
        const updatedData = data.map((blog) => {
          if (blog._id === id) {
            return {
              ...blog,
              likes: [...blog.likes, userId],
            };
          }
          return blog;
        });
        setData(updatedData);
        setFilteredData(updatedData);
      }
    } catch (error) {
      toast.error("Failed to like the blog");
    }
  };

  const handleDelete = async (id) => {
    try {
      const username = localStorage.getItem("username");
      await axios.delete(
        `https://blogapi-sooty.vercel.app/blog/delete-blog/${id}`,
        {
          data: { username },
        }
      );
      toast.success("Blog deleted successfully");
      setData(data.filter((blog) => blog._id !== id));
    } catch (error) {
      toast.error("Failed to delete the blog");
    }
  };
  // handling filtering through tag
  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    if (tag === "All") {
      setFilteredData(data); // Show all blogs
    } else {
      setFilteredData(data.filter((blog) => blog.tag === tag)); // Filter by tag
    }
  };

  const redirectToAbout = () => {
    navigate("/aboutme");
  };

  return (
    <div className="font-worksans">
      <div className="h-2/5 bg-gradient-to-r from-lightBlack via-slate-800 to-lightBlack w-full text-white flex pt-8 flex-col justify-center items-center font-worksans">
        <h2 className="text-7xl bg-gradient-to-b from-slate-100 via-slate-200 to-gray-400 bg-clip-text text-transparent text-center max-sm:text-6xl ">
          Welcome to DotBlog
        </h2>
        <p className="mt-8 text-center bg-gradient-to-b from-slate-100 via-slate-200 to-gray-400 bg-clip-text text-transparent text-2xl w-2/3">
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
      <div className="backGround-Gradient-Light pt-10">
        <div className="flex justify-center  items-center relative  ">
          <form className=" w-full flex justify-center">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search blogs..."
              className="ml-4 border  border-gray-500 bg-transparent w-2/5 max-md:w-1/2 max-sm:w-3/4 rounded-lg p-2 "
            />
            <SearchIcon className=" relative top-2 right-[2rem]  text-gray-500 w-5 h-5" />
          </form>
        </div>
        <div className="ml-10 mt-5 flex gap-4 flex-wrap">
          <button
            onClick={() => handleTagClick("All")}
            className={`mt-3 py-1 cursor-pointer bg-gradient-to-r border-none   w-fit text-white px-3 ml-2 rounded-2xl capitalize font-worksans font-medium ${
              selectedTag === "All"
                ? "from-slate-800 via-slate-600 to-slate-800"
                : "from-lightBlack via-slate-800 to-lightBlack"
            }`}
          >
            All
          </button>
          {tag.map((tags, index) => (
            <button
              key={index}
              onClick={() => handleTagClick(tags)}
              className={`mt-3 py-1 cursor-pointer bg-gradient-to-r border-none  from-lightBlack via-slate-800 to-lightBlack w-fit text-white px-3 ml-2 rounded-2xl capitalize font-worksans font-medium ${
                selectedTag === tags
                  ? "from-slate-800 via-slate-600 to-slate-800"
                  : "from-lightBlack via-slate-800 to-lightBlack"
              }`}
            >
              {tags}
            </button>
          ))}
        </div>
        {filteredData && filteredData.length > 0 && (
          <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4  mt-8">
            {filteredData.map((blog, index) => (
              <div
                key={index}
                className="flex flex-col  mb-8 justify-end rounded-2xl hover:scale-105 transition-all ease-in-out duration-300 p-4 mx-4"
              >
                <img
                  src={blog.img}
                  className="max-h-full max-w-full rounded-md m-auto block"
                />
                <Link
                  className="font-semibold capitalize text-2xl mt-4 hover:underline decoration-black"
                  to={`/show/${blog._id}`}
                >
                  {blog.title}
                </Link>
                <p className="mt-3 bg-gradient-to-r from-lightBlack via-slate-800 to-lightBlack w-fit text-white px-3 ml-2 rounded-xl  capitalize font-worksans font-medium">
                  {blog.tag}
                </p>
                <div className="flex items-center gap-2 my-2 justify-between">
                  <div className="flex items-center gap-2 my-2">
                    <PersonIcon className="text-lightBlue" />
                    <p className=" font-medium capitalize">{blog.userName}</p>
                  </div>
                  <div className={`flex items-center gap-2 my-2`}>
                    <button onClick={() => handleLike(blog._id)}>
                      <ThumbUpIcon
                        className={`${
                          blog.likes.includes(localStorage.getItem("_id"))
                            ? " text-lightBlue"
                            : ""
                        }`}
                      />
                    </button>
                    <p>{blog.likes.length}</p>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between">
                    {blog.userName === localStorage.getItem("username") && (
                      <>
                        <Link
                          to={`/edit-blog/${blog._id}`}
                          className="text-lightBlue"
                          title="Edit Blog"
                        >
                          <EditIcon />
                        </Link>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="text-red-500"
                          title="Delete Blog"
                        >
                          <DeleteIcon />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredData && filteredData.length === 0 && (
          <div className="w-full pb-16 grid grid-cols-3 gap-4 mt-10  max-md:grid-cols-2 max-sm:grid-cols-1 flex-col px-4 h-1/3 ">
            <div>
              <Skeleton className="mb-4 h-10  " />
              <Skeleton count={5} />
            </div>
            <div className="max-sm:hidden">
              <Skeleton className="mb-4 h-10" />
              <Skeleton count={5} />
            </div>
            <div className="max-md:hidden">
              <Skeleton className="mb-4 h-10" />
              <Skeleton count={5} />
            </div>
          </div>
        )}
        <Footer />
      </div>

      <div>
        <Toaster />
      </div>
    </div>
  );
};

export default Bloglist;
