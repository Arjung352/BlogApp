import Signin from "./component/Register/Signin";
import Login from "./component/Register/Login";

import { BrowserRouter, Route, Routes } from "react-router-dom";
function Maintaince() {
  return (
    <div className="h-screen bg-offWhite w-screen flex justify-center flex-col items-center">
      <p className=" text-5xl font-salsa text-center">Site under Maintaince</p>

      <p className=" text-3xl font-salsa text-center">
        Sorry for the inconvinince
      </p>
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

        <Route path="/Signin" element={<Signin />} />
        <Route path="/Login" element={<Login />} />
        <Route path="*" element={<Maintaince />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
