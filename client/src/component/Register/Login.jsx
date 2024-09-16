import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const redirectToHome = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://blogapi-sooty.vercel.app/register/login", formData)
      .then((response) => {
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("_id", response.data._id);
        setFormData({ username: "", password: "" });
        toast.success("Login succesfully!");
        redirectToHome("/home");
      })
      .catch((error) => {
        setFormData({ username: "", password: "" });
        toast.error("Username or Password is Incorrect");
      });
  };
  const navigate = useNavigate();
  const signup = () => {
    navigate("/");
  };
  return (
    // <div className="w-screen flex justify-center items-center ">
    //   <div className="text-center gap-3 font-bold font-worksans text-2xl text-lightBlue flex flex-col  p-6 rounded-md border-2 border-black shadow-lg shadow-black">
    //     <h2 className=" text-2xl ">Log-In to DotBlogs</h2>
    //     <h3 className=" text-base">
    //       Log-in to get to work & manage your account.
    //     </h3>
    //     <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
    //       <TextField
    //         variant="outlined"
    //         label="Username"
    //         type="text"
    //         value={formData.username}
    //         required
    //         name="username"
    //         onChange={handleInputChange}
    //       />
    //       <TextField
    //         variant="outlined"
    //         label="Password"
    //         type="password"
    //         required
    //         onChange={handleInputChange}
    //         value={formData.password}
    //         name="password"
    //       />
    //       <Button variant="contained" type="submit">
    //         Log-in
    //       </Button>
    //     </form>{" "}
    //     <button className="text-sm text-blue-700 underline" onClick={singup}>
    //       Don't have an account? Sign-in!
    //     </button>
    //   </div>
    //   <ToastContainer />
    // </div>
    <div className="flex items-center justify-center h-svh bg-gradient-to-r from-blue-100 to-gray-400">
      <div className="bg-white p-6 rounded-md shadow-lg border-2 border-gray-300 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-4">
          Log-In to DotBlogs
        </h2>
        <h3 className="text-sm text-gray-600 text-center mb-6">
          Log-in to get to work & manage your account.
        </h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            label="Username"
            type="text"
            value={formData.username}
            required
            name="username"
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            variant="outlined"
            label="Password"
            type="password"
            required
            onChange={handleInputChange}
            value={formData.password}
            name="password"
            fullWidth
          />
          <Button
            variant="contained"
            type="submit"
            fullWidth
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Log-in
          </Button>
        </form>
        <button
          className="mt-4 text-sm text-blue-600 hover:underline block mx-auto"
          onClick={signup}
        >
          Don't have an account? Sign-in!
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
