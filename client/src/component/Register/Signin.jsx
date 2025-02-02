import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

function Signin() {
  const navigateToHome = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://blogapi-sooty.vercel.app/register/signup", formData)
      .then((response) => {
        console.log(response);
        localStorage.setItem("username", formData.username);
        localStorage.setItem("_id", response.data._id);
        setFormData({ name: "", email: "", password: "" });
        toast.success("Sign-in successfully!");
        navigateToHome("/home");
      })
      .catch((error) => {
        toast.error("Username or E-mail already existed");
      });
  };

  const navigate = useNavigate();

  const login = () => {
    navigate("/Login");
  };

  return (
    <div className="flex items-center justify-center h-svh backGround-Gradient-Light">
      <div className="backdrop-filter bg-gray-300 backdrop-blur-md bg-opacity-10 p-8 rounded-xl shadow-md border border-black  font-worksans shadow-black  w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-4">
          Sign-In to DotBlogs
        </h2>
        <h3 className="text-sm text-gray-600 text-center mb-6">
          Sign-Up to save and manage your account.
        </h3>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            label="Username"
            type="text"
            value={formData.username}
            required
            fullWidth
            name="username"
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            label="Email"
            type="email"
            fullWidth
            name="email"
            value={formData.email}
            required
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            label="Password"
            type="password"
            required
            fullWidth
            onChange={handleInputChange}
            value={formData.password}
            name="password"
          />
          <button
            type="submit"
            className="font-worksans  py-[0.6rem] bg-gradient-to-r from-lightBlack via-blue-800 to-lightBlack  rounded-lg w-full hover:bg-blue-700 text-white  px-4  focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign-in
          </button>
        </form>
        <button
          type="button" // This button should be of type 'button' to prevent accidental form submission
          className="mt-4 text-sm text-blue-600 hover:underline block mx-auto"
          onClick={login}
        >
          Already have an account? Login!
        </button>
      </div>
      <Toaster />
    </div>
  );
}

export default Signin;
