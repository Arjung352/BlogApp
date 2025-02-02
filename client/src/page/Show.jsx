import { useEffect, useState } from "react";
import { useParams } from "react-router";
import PersonIcon from "@mui/icons-material/Person";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import Footer from "./Footer/Footer";

const ShowBlog = () => {
  const [blog, setblogs] = useState([]);
  const [success, setSuccess] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    const fetch = (async () => {
      let data = await axios.get(
        `https://blogapi-sooty.vercel.app/blog/show/${id}`
      );
      console.log(data.data);
      setblogs(data.data);
      setSuccess(true);
    })();
  }, []);
  return success ? (
    <div className=" backGround-Gradient-Light">
      <div className="flex flex-col items-center">
        <div className="backdrop-filter bg-gray-200 backdrop-blur-md bg-opacity-10 shadow-md w-1/2 shadow-black rounded-xl overflow-hidden my-9 max-w-3xl max-sm:w-11/12">
          <div className="relative">
            <img
              src={blog.img}
              alt={blog.title}
              className="max-h-full mt-4 max-w-full rounded-md m-auto block"
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
          </div>
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <div className="w-full bg-white h-screen flex justify-center items-center">
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
};

export default ShowBlog;
