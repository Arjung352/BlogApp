import { useState } from "react";
import { useEffect } from "react";
function UseAuthState(Auth) {
  const [user, setUser] = useState(() => Auth.currentUser);
  const [initializing, setinitializing] = useState(true);
  useEffect(() => {
    const subscribe = Auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
      if (initializing) {
        setinitializing(false);
      }
    });
    return subscribe;
  }),
    [Auth, initializing];
  return { user, initializing };
}

export default UseAuthState;
