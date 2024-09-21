import Navbar from "./page/Navbar/Navbar";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { lazy, Suspense } from "react";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";
// Setting lazy content
const Login = lazy(() => import("./component/Register/Login"));
const Signin = lazy(() => import("./component/Register/Signin"));
const Bloglist = lazy(() => import("./page/Bloglist"));
const About = lazy(() => import("./component/AboutMe/About"));
const Create = lazy(() => import("./page/Create"));
const ShowBlog = lazy(() => import("./page/Show"));
const EditBlog = lazy(() => import("./page/Edit"));
function App() {
  //Setting redirect logic
  const [load, loadingServer] = useState(false);
  const redirect = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("username")) {
      redirect("/home");
    } else {
      redirect("/");
    }
  }, []);
  // Added a false fetch to start the server
  useEffect(() => {
    const loadServer = (async () => {
      await axios.get(
        "https://blogapi-sooty.vercel.app/blog/show/66e33506312b13bc9c0fcb8b"
      );
      loadingServer(true);
    })();
  });
  return (
    <>
      {load ? (
        <Suspense
          fallback={
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
          }
        >
          <Routes>
            <Route index element={<Signin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navbar />}>
              <Route path="home" element={<Bloglist />} />
              <Route path="show/:id" element={<ShowBlog />} />
              <Route path="edit-blog/:id" element={<EditBlog />} />
              <Route path="create" element={<Create />} />
              <Route path="aboutme" element={<About />} />
              <Route
                path="*"
                element={
                  <div className="w-full bg-white h-screen flex  justify-center items-center">
                    <p className="font-salsa">404 Page not Found</p>
                  </div>
                }
              />
            </Route>
          </Routes>
        </Suspense>
      ) : (
        <div className="w-full bg-white h-screen flex gap-4 flex-col justify-center items-center">
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
          <p className="font-salsa">
            Starting the Server Please have patience!
          </p>
        </div>
      )}
    </>
  );
}

export default App;
