import React, { useState } from "react";
import fb from "../Firebase";
import UseAuthState from "./hooks/hooks";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
const DB = fb.firestore();
const BlogsList = DB.collection("blogs");
const storageRef = fb.storage().ref();

const Create = () => {
  const redirect = useNavigate();
  const { user, initializing } = UseAuthState(fb.auth());
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [coverImg, setCoverImg] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleCoverImg = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImg(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submit = (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be signed in to create a blog.");
      return;
    }

    if (coverImg) {
      const uploadTask = storageRef
        .child("images/" + coverImg.name)
        .put(coverImg);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          toast.error("Upload error: " + error.message);
        },
        () => {
          storageRef
            .child("images/" + coverImg.name)
            .getDownloadURL()
            .then((url) => {
              addBlogPost(url);
            })
            .catch((error) => {
              toast.error(
                "Encountered an error while uploading the image: " +
                  error.message
              );
            });
        }
      );
    } else {
      addBlogPost(null);
    }
  };

  const addBlogPost = (imageUrl) => {
    BlogsList.add({
      Title: title,
      Body: body,
      CoverImg: imageUrl || "", // Store an empty string if no image URL
      author: user.uid,
      authorName: user.displayName,
    })
      .then((docRef) => {
        setTitle("");
        setBody("");
        setCoverImg(null);
        setPreviewUrl(null);
        redirect("/");
      })
      .catch((error) => {
        toast.error("Encountered an Error: ", error);
      });
  };

  if (initializing) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <p className="font-worksans text-4xl text-center font-medium pt-8">
        Create a Blog
      </p>
      <div className=" flex justify-center mt-8">
        <div className=" w-2/4 flex justify-center max-sm:w-11/12 max-sm:mb-4">
          <form
            onSubmit={submit}
            className="bg-white p-8 rounded-lg shadow-md border border-black font-worksans shadow-black w-full h-full"
          >
            <label className="block text-lg font-semibold mb-4">Title</label>
            <input
              type="text"
              placeholder="Title"
              className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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

            <label className="block text-lg font-semibold mb-4">Content</label>
            <textarea
              name="content"
              placeholder="Write your content here"
              rows="3"
              className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            ></textarea>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Create;
