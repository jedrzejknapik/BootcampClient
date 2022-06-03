import { createContext, useState } from "react";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logUserIn = (user) => {
    setLoggedUser({
      ...user,
    });

    setIsLoggedIn(true);
  };

  const logOut = () => {
    setLoggedUser({});
    setIsLoggedIn(false);
  };

  return (
    <AppContext.Provider
      value={{
        loggedUser,
        isLoggedIn,
        logUserIn,
        logOut,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
