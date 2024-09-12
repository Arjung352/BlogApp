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
      .post("http://localhost:1000/register/login", formData)
      .then((response) => {
        localStorage.setItem("username", formData.username);
        setFormData({ username: "", password: "" });
        toast.success("Login succesfully!");
        redirectToHome("/home");
      })
      .catch((error) => {
        toast.error("Failed to send data.");
      });
  };
  const navigate = useNavigate();
  const singup = () => {
    navigate("/");
  };
  return (
    <div className="w-screen flex justify-center items-center h-svh">
      <div className="text-center gap-3 font-bold font-worksans text-2xl text-lightBlue flex flex-col  p-6 rounded-md border-2 border-black shadow-lg shadow-black">
        <h2 className=" text-2xl ">Log-In to TasteBudsTreats</h2>
        <h3 className=" text-base">
          Log in to get to work and manage your account.
        </h3>
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
        </form>{" "}
        <button className="text-sm text-blue-700 underline" onClick={singup}>
          Don't have an account? Sign-in!
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
