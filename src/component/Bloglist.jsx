import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import fb from "../Firebase";
import UseAuthState from "./hooks/hooks";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ToastContainer, toast } from "react-toastify";
const DB = fb.firestore();
const Blogs = DB.collection("blogs");

const Bloglist = () => {
  const { user } = UseAuthState(fb.auth());
  const [blogslist, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const redirectToAbout = () => {
    navigate("/aboutme");
  };

  const LikeBlogButton = ({ id, likes, blogslist, setBlogs }) => {
    const handleLikes = () => {
      const newLikes = likes?.includes(user.uid)
        ? fb.firestore.FieldValue.arrayRemove(user.uid)
        : fb.firestore.FieldValue.arrayUnion(user.uid);

      Blogs.doc(id).update({
        likes: newLikes,
      });

      const updatedBlogs = blogslist.map((blog) => {
        if (blog.id === id) {
          const updatedLikes = likes?.includes(user.uid)
            ? likes.filter((uid) => uid !== user.uid)
            : [...(likes || []), user.uid];
          return { ...blog, likes: updatedLikes };
        }
        return blog;
      });

      setBlogs(updatedBlogs);
    };

    return (
      <div>
        {likes?.includes(user.uid) ? (
          <button onClick={handleLikes}>
            <ThumbUpIcon className=" text-lightBlue" />
          </button>
        ) : (
          <button onClick={handleLikes}>
            <ThumbUpIcon />
          </button>
        )}
      </div>
    );
  };

  const fetchBlogs = async (searchTerm = "") => {
    setError(null);

    let query = Blogs.limit(100);

    if (searchTerm) {
      query = query
        .where("Title", ">=", searchTerm)
        .where("Title", "<=", searchTerm + "\uf8ff");
    }

    try {
      const querySnapshot = await query.get();
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setBlogs(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const searchBlog = (e) => {
    e.preventDefault();
    fetchBlogs(search);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  const deleteBlog = (id) => {
    Blogs.doc(id)
      .delete()
      .then(() => {
        toast.success("Document successfully deleted!");
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
      })
      .catch((error) => {
        toast.error("Error removing document: ", error);
      });
  };

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
        <form onSubmit={searchBlog} className="absolute left-0 max-sm:top-14">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search blogs..."
            className="ml-4 border border-black"
          />
          <button type="submit" className="ml-2 text-lightblue">
            Search
          </button>
        </form>
        <h2 className="text-center font-medium text-4xl max-sm:pb-10">
          All Blogs
        </h2>
      </div>
      <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4 mb-4 mt-8">
        {blogslist.map((blog) => (
          <div
            key={blog.id}
            className="flex flex-col bg-gradient-to-b from-gray-300 to-white mb-8  justify-end shadow-md rounded-md hover:scale-105 transition-all ease-in-out duration-300 shadow-black p-4 mx-4"
          >
            {blog.CoverImg ? (
              <img
                src={blog.CoverImg}
                className="max-h-full max-w-full rounded-md m-auto block"
              />
            ) : (
              <img
                src="https://cdn1.iconfinder.com/data/icons/ui-icon-part-3/128/image-512.png"
                className="max-h-full max-w-full rounded-md m-auto block mix-blend-overlay"
              />
            )}
            <p className=" font-semibold capitalize text-2xl mt-4">
              {blog.Title}
            </p>
            <div className="flex items-center gap-2 my-2 justify-between">
              <div className="flex items-center gap-2 my-2">
                <PersonIcon className="text-lightBlue" />
                <p>{blog.authorName}</p>
              </div>
              <div className="flex items-center gap-2 my-2">
                {user ? (
                  <LikeBlogButton
                    id={blog.id}
                    likes={blog.likes}
                    blogslist={blogslist}
                    setBlogs={setBlogs}
                  />
                ) : (
                  <LikeBlogButton />
                )}
                <p>
                  {blog.likes ? (
                    <span>{blog.likes.length}</span>
                  ) : (
                    <span>0</span>
                  )}
                </p>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <Link
                  to={`/show/${blog.id}`}
                  className="mr-2 font-normal text-lightBlue"
                >
                  Read Now
                  <ArrowForwardIcon />
                </Link>
                {blog.author === user?.uid && (
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
                )}
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
