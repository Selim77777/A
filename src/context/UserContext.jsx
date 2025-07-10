import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const UserContext = createContext({
 user: null,
 setUser: () => {},
});

export const useUser = () => {
  return useContext(UserContext);
};

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe; // Cleanup subscription on unmount
  }, []);

  const value = { user: currentUser, setUser: setCurrentUser, loading };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

UserProvider.propTypes = { children: PropTypes.node.isRequired };