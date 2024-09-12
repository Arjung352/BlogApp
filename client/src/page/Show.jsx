import { useEffect, useState } from "react";
import { useParams } from "react-router";
import PersonIcon from "@mui/icons-material/Person";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import axios from "axios";
const ShowBlog = () => {
  const [blog, setblogs] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetch = (async () => {
      let data = await axios.get(`http://localhost:1000/blog/show/${id}`);
      console.log(data.data);
      setblogs(data.data);
    })();
  }, []);
  return (
    <div className="flex justify-center items-center ">
      <div className="bg-white shadow-md w-1/2 shadow-black rounded-lg overflow-hidden my-9 max-w-3xl max-sm:w-11/12">
        <div className="relative">
          <img
            src={blog.img}
            alt={blog.title}
            className="max-h-full mt-2 max-w-full rounded-md m-auto block"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <PersonIcon className="text-blue-500 mr-2" />
            <p className="text-lg font-semibold text-gray-700">
              {blog.userName || "Unknown Author"}
            </p>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4 capitalize">
            {blog.title}
          </h1>
          <div
            className="text-gray-700 leading-relaxed mb-6"
            dangerouslySetInnerHTML={{ __html: blog.desc }}
          />
          {/* <div className="flex items-center justify-between">
            {user && <LikeBlogButton id={id} likes={blog.likes} />}
            <p className="text-gray-600">
              {blog.likes ? blog.likes.length : 0}{" "}
              {blog.likes?.length === 1 ? "Like" : "Likes"}
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ShowBlog;
