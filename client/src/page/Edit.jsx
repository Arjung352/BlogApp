import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

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
          `http://localhost:1000/blog/show/${id}`
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
      await axios.put(`http://localhost:1000/blog/update-blog/${id}`, {
        title,
        desc,
      });
      console.log(title, desc);
      navigate("/home"); // Redirect to home after successful update
    } catch (error) {
      console.error("Failed to update blog:", error);
    }
  };

  return (
    <div>
      <p className="font-worksans text-4xl text-center font-medium pt-8">
        Update Your Blog
      </p>
      <div className="flex justify-center mt-8">
        <div className="w-2/4 flex justify-center max-sm:w-11/12 max-sm:mb-4">
          <form
            onSubmit={submit}
            className="bg-white p-8 rounded-lg shadow-md border border-black font-worksans shadow-black w-full h-full"
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
            <button
              type="submit"
              className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
