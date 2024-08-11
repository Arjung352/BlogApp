import { useState } from "react";
import { useParams } from "react-router";
import fb from "../Firebase";
import UseAuthState from "./hooks/hooks";
import PersonIcon from "@mui/icons-material/Person";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
const DB = fb.firestore();
const BlogsList = DB.collection("blogs");

function LikeBlogButton({ id, likes }) {
  const { user } = UseAuthState(fb.auth());

  const handleLikes = () => {
    if (likes?.includes(user.uid)) {
      BlogsList.doc(id).update({
        likes: fb.firestore.FieldValue.arrayRemove(user.uid),
      });
    } else {
      BlogsList.doc(id).update({
        likes: fb.firestore.FieldValue.arrayUnion(user.uid),
      });
    }
  };

  return (
    <div>
      {likes?.includes(user.uid) ? (
        <button onClick={handleLikes}>
          <ThumbUpIcon className="text-lightBlue" />
        </button>
      ) : (
        <button onClick={handleLikes}>
          <ThumbUpIcon />
        </button>
      )}
    </div>
  );
}

const ShowBlog = () => {
  const { user, initializing } = UseAuthState(fb.auth());
  const [blog, setblogs] = useState([]);
  const { id } = useParams();
  BlogsList.doc(id)
    .get()
    .then((snapshot) => {
      const data = snapshot.data();
      setblogs(data);
    });
  if (initializing) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="flex justify-center items-center ">
      <div className="bg-white shadow-md w-1/2 shadow-black rounded-lg overflow-hidden my-9 max-w-3xl max-sm:w-11/12">
        <div className="relative">
          {blog.CoverImg ? (
            <img
              src={blog.CoverImg}
              alt={blog.Title}
              className="max-h-full mt-2 max-w-full rounded-md m-auto block"
            />
          ) : null}
        </div>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <PersonIcon className="text-blue-500 mr-2" />
            <p className="text-lg font-semibold text-gray-700">
              {blog.authorName || "Unknown Author"}
            </p>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4 capitalize">
            {blog.Title}
          </h1>
          <div
            className="text-gray-700 leading-relaxed mb-6"
            dangerouslySetInnerHTML={{ __html: blog.Body }}
          />
          {console.log(blog.Body)}
          <div className="flex items-center justify-between">
            {user && <LikeBlogButton id={id} likes={blog.likes} />}
            <p className="text-gray-600">
              {blog.likes ? blog.likes.length : 0}{" "}
              {blog.likes?.length === 1 ? "Like" : "Likes"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowBlog;
