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
      .post("http://localhost:1000/register/signup", formData)
      .then((response) => {
        localStorage.setItem("username", formData.username);
        setFormData({ name: "", email: "", password: "" });
        toast.success("data sent successfully!");
        navigateToHome("/");
      })
      .catch((error) => {
        toast.error("Failed to send data.");
      });
  };

  const navigate = useNavigate();

  const login = () => {
    navigate("/Login");
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center out">
      <div className="gap-3 font-bold text-2xl font-worksans text-lightBlue flex flex-col p-6 rounded-md border-2 border-black shadow-lg shadow-black">
        <h2 className="text-center text-2xl">Sign-In to DotBlogs</h2>
        <h3 className="text-base">Sign-Up to save and manage your account.</h3>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            label="Username"
            type="text"
            value={formData.username}
            required
            name="username"
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            label="Email"
            type="email"
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
            onChange={handleInputChange}
            value={formData.password}
            name="password"
          />
          <Button variant="contained" type="submit">
            Sign-in
          </Button>
        </form>
        <button
          type="button" // This button should be of type 'button' to prevent accidental form submission
          className="text-sm text-blue-700 underline"
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
