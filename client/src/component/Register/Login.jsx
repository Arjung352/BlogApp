import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

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
    <div className="flex items-center justify-center h-svh backGround-Gradient-Light">
      <div className="backdrop-filter bg-gray-300 backdrop-blur-md bg-opacity-10 p-8 rounded-xl shadow-md border border-black  font-worksans shadow-black w-full max-w-md">
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
          <button
            type="submit"
            className="w-full font-worksans  py-[0.6rem] bg-gradient-to-r from-lightBlack via-blue-800 to-lightBlack text-white rounded-lg px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Log-in
          </button>
        </form>
        <button
          className="mt-4 text-sm text-blue-600 hover:underline block mx-auto"
          onClick={signup}
        >
          Don't have an account? Sign-in!
        </button>
      </div>
      <Toaster />
    </div>
  );
}

export default Login;
