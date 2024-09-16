import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    <div className="flex items-center justify-center h-svh bg-gradient-to-r from-blue-100 to-gray-400">
      <div className="bg-white p-6 rounded-md shadow-lg border-2 border-gray-300 w-full max-w-md">
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
          <Button
            variant="contained"
            fullWidth
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign-in
          </Button>
        </form>
        <button
          type="button" // This button should be of type 'button' to prevent accidental form submission
          className="mt-4 text-sm text-blue-600 hover:underline block mx-auto"
          onClick={login}
        >
          Already have an account? Login!
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signin;
