import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import Footer from "./Footer/Footer";

const EditBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [desc, setdesc] = useState("");

  // Fetch blog data on component mount
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(
          `https://blogapi-sooty.vercel.app/blog/show/${id}`
        );
        const data = response.data;
        console.log(data);
        setTitle(data.title);
        setdesc(data.desc);
      } catch (error) {
        console.error("Failed to fetch blog data:", error);
      }
    };
    fetchBlogData();
  }, [id]);

  // Submit updated blog data
  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://blogapi-sooty.vercel.app/blog/update-blog/${id}`,
        {
          title,
          desc,
        }
      );
      console.log(title, desc);
      navigate("/home"); // Redirect to home after successful update
    } catch (error) {
      console.error("Failed to update blog:", error);
    }
  };

  return (
    <div className="backGround-Gradient-Light">
      <p className="font-worksans text-4xl text-center font-medium pt-8">
        Edit Your Blog
      </p>
      <div className="flex justify-center my-8">
        <div className="w-2/4 flex justify-center max-sm:w-11/12 max-sm:mb-4">
          <form
            onSubmit={submit}
            className="backdrop-filter bg-gray-200 backdrop-blur-md bg-opacity-10 p-8 rounded-xl shadow-md border border-black font-worksans shadow-black w-full h-full"
          >
            <label className="block text-lg font-semibold mb-4">Title</label>
            <input
              type="text"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              required
            />
            <label className="block text-lg font-semibold mb-4">Content</label>
            <ReactQuill
              name="content"
              theme="snow"
              value={desc}
              onChange={setdesc}
              required
            />
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-3/4 mt-7 font-worksans  py-[0.6rem] bg-gradient-to-r from-lightBlack via-blue-800 to-lightBlack text-white  rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditBlog;
