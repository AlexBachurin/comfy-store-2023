import React, { useContext, useEffect, useState } from "react";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { getUserFromLocalStorage } from "../../utils/helpers";
import { User_Context_Type } from "./user_context_types";

const UserContext = React.createContext<User_Context_Type | null>(null);

type UserProvider_Props = {
  children: React.ReactNode;
};
export const UserProvider: React.FC<UserProvider_Props> = ({ children }) => {
  const [user, setUser] = useState(getUserFromLocalStorage());
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const provider = new GoogleAuthProvider();

  //sign in
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        if (user) {
          // set user as provider info without unnecessary info
          setUser(user.providerData[0]);
          setIsAuthenticated(true);
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  // logout
  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setUser(null);
        setIsAuthenticated(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //set user to local storage on successfull login/logout
  useEffect(() => {
    localStorage.setItem("user-info", JSON.stringify(user));
    // if user is not null in local storage, then set authentication state to true aswell
    if (user) {
      setIsAuthenticated(true);
    }
  }, [user]);
  return (
    <UserContext.Provider value={{ user, isAuthenticated, signIn, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
