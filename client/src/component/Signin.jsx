import fb from "../Firebase";
import UseAuthState from "./hooks/hooks";

function Signin() {
  const { user, initializing } = UseAuthState(fb.auth());

  const signinGoogle = async () => {
    const provider = new fb.auth.GoogleAuthProvider();
    fb.auth().useDeviceLanguage();
    try {
      await fb.auth().signInWithPopup(provider);
    } catch (error) {
      console.error("Error during sign-in:", error.message);
    }
  };

  if (initializing) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      {user ? (
        <div className="mt-20 text-center">
          <img src={user.photoURL} alt="user" className="w-12 h-12 mx-auto" />
          <p>{user.displayName}</p>
        </div>
      ) : (
        <div className="mt-20 text-center">
          <button className="border-2 border-black" onClick={signinGoogle}>
            sign in with Google
          </button>
        </div>
      )}
    </div>
  );
}

export default Signin;
