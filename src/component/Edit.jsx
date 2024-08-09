import fb from "../Firebase";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
const DB = fb.firestore();
const BlogsList = DB.collection("blogs");
const EditBlog = () => {
  const redirect = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  useEffect(() => {
    BlogsList.doc(id)
      .get()
      .then((snapshot) => {
        const data = snapshot.data();
        setTitle(data.Title);
        setBody(data.Body);
      });
  }, []);
  const submit = (e) => {
    e.preventDefault();
    BlogsList.doc(id)
      .update({
        Title: title,
        Body: body,
      })
      .then((docRef) => {
        setTitle("");
        setBody("");
        redirect("/");
      })
      .catch((error) => {
        console.log("Encountered an Error", error);
      });
  };
  return (
    <div>
      <p className="font-worksans text-4xl text-center font-medium pt-8">
        Update Your Blog
      </p>
      <div className=" flex justify-center mt-8">
        <div className=" w-2/4 flex justify-center max-sm:w-11/12 max-sm:mb-4">
          <form
            onSubmit={(event) => {
              submit(event);
            }}
            className="bg-white p-8 rounded-lg shadow-md border border-black font-worksans shadow-black w-full h-full"
          >
            <label className="block text-lg font-semibold mb-4">Title</label>
            <input
              type="text"
              placeholder="Title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              required
            />
            <label className="block text-lg font-semibold mb-4">Content</label>

            <textarea
              name="content"
              type="text"
              placeholder="Write your content here"
              rows="3"
              className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={body}
              onChange={(e) => {
                setBody(e.target.value);
              }}
              required
            ></textarea>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
