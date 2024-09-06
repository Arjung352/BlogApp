import Create from "./component/Create";
import ShowBlog from "./component/Show";
import EditBlog from "./component/Edit";
import Signin from "./component/Signin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./component/AboutMe/About";
import Navbar from "./page/Navbar/Navbar";
import Bloglist from "./component/Bloglist";
function Maintaince() {
  return (
    <div className="h-screen bg-offWhite w-screen flex justify-center flex-col items-center">
      <p className=" text-5xl font-salsa">Site under Maintaince</p>

      <p className=" text-3xl font-salsa">Sorry for the inconvinince</p>
    </div>
  );
}
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Navbar />}>
          <Route index element={<Bloglist />} />
          <Route path="create" element={<Create />} />
          <Route path="aboutme" element={<About />} />
          <Route path="signin" element={<Signin />} />
          <Route path="show/:id" element={<ShowBlog />} />
          <Route path="edit-blog/:id" element={<EditBlog />} />
        </Route> */}
        <Route path="*" element={<Maintaince />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
