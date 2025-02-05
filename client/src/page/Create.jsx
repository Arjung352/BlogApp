import { useState } from "react";
import { useNavigate } from "react-router";
import { toast, Toaster } from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import Footer from "./Footer/Footer";

const Create = () => {
  const redirect = useNavigate();
  const [load, setload] = useState(true);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState("");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Handle file upload and preview
  const handleCoverImg = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Preview the image
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    // Create form data to handle file upload
    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", body);
    formData.append("tag", tag);
    if (image) {
      formData.append("img", image);
    }
    formData.append("username", localStorage.getItem("username"));
    setload(false);
    try {
      const response = await axios.post(
        "https://blogapi-sooty.vercel.app/blog/create-blog",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // Handle successful response
      toast.success("Blog created successfully!");
      redirect("/home"); // Redirect to homepage or another page after successful submission
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error("Failed to create blog. Please try again.");
    }
  };

  return load ? (
    <div className="backGround-Gradient-Light ">
      <p className="font-worksans text-4xl text-center font-medium pt-8">
        Create a Blog
      </p>
      <div className="flex h-full justify-center mb-8 mt-8">
        <div className="w-2/4  flex justify-center max-sm:w-11/12 max-sm:mb-4">
          <form
            onSubmit={submit}
            className="backdrop-filter bg-gray-300 backdrop-blur-md bg-opacity-10 p-8 rounded-xl shadow-md border border-black  font-worksans shadow-black  w-full h-full"
          >
            <label className="block text-lg font-semibold mb-4">Title</label>
            <input
              type="text"
              placeholder="Title"
              className="w-full p-2 mb-4 border bg-transparent border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
            <label className="block text-lg font-semibold mb-4">
              Upload an Image
            </label>
            <div className="border-dashed border-2 border-gray-300 p-4 mb-4 rounded relative">
              <input
                type="file"
                name="coverimg"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleCoverImg}
              />
              <div className="flex flex-col items-center justify-center">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Selected Preview"
                    className="h-32 w-32 object-cover rounded mb-2"
                  />
                ) : (
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 15a4 4 0 100-8 4 4 0 000 8zM3 15v2a4 4 0 004 4h10a4 4 0 004-4v-2M16 7l-4-4m0 0L8 7m4-4v12"
                    />
                  </svg>
                )}
                <p className="text-gray-500 mt-2">Attach your files here</p>
                <p className="text-blue-500">Browse files</p>
              </div>
            </div>
            <label className="block text-lg font-semibold mb-4">Blog Tag</label>
            <input
              type="text"
              placeholder="Blog Tag"
              className="w-full p-2 mb-4 border bg-transparent border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setTag(e.target.value)}
              value={tag}
              required
            />
            <label className="block text-lg font-semibold mb-4">Content</label>
            <ReactQuill
              name="content"
              theme="snow"
              value={body}
              required
              onChange={(content) => setBody(content)}
              style={{ height: "100px" }}
            />
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-3/4 max-[353px]:mt-32  mt-20 font-worksans  py-[0.6rem] bg-gradient-to-r from-lightBlack via-blue-800 to-lightBlack text-white  rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <Toaster />
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

export default Create;
