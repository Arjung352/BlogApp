import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const singin = () => {
    navigate("/Signin");
  };
  return (
    <div className="w-screen flex justify-center items-center h-svh">
      <div className="text-center gap-3 font-bold font-worksans text-2xl text-lightBlue flex flex-col  p-6 rounded-md border-2 border-black shadow-lg shadow-black">
        <h2 className=" text-2xl ">Log-In to TasteBudsTreats</h2>
        <h3 className=" text-base">
          Log in to get to work and manage your account.
        </h3>
        <form className="flex flex-col gap-3">
          <TextField variant="outlined" label="Username" />
          <TextField variant="outlined" label="Password" type="password" />
          <Button variant="contained">Log-in</Button>
        </form>
        <button className="text-sm text-blue-700 underline" onClick={singin}>
          Don't have an account? Sign-in!
        </button>
      </div>
    </div>
  );
}

export default Login;
