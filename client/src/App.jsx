import Navbar from "./page/Navbar/Navbar";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { lazy, Suspense } from "react";
import { TailSpin } from "react-loader-spinner";

function Maintenance() {
  return (
    <div className="h-screen bg-offWhite w-screen flex justify-center flex-col items-center">
      <p className="text-5xl font-salsa text-center">Site under Maintenance</p>
      <p className="text-3xl font-salsa text-center">
        Sorry for the inconvenience
      </p>
    </div>
  );
}
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
  const redirect = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("username")) {
      redirect("/home");
    } else {
      redirect("/");
    }
  }, []);

  return (
    <>
      {/* setting suspense */}
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
            <Route path="*" element={<Maintenance />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
