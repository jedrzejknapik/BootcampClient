import { createContext, useState } from "react";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(null);

  const logUserIn = (user, isTeacher = true) => {
    setLoggedUser({
      ...user,
      isTeacher,
    });
  };

  const logOut = () => {
    setLoggedUser(null);
  };

  return (
    <AppContext.Provider
      value={{
        loggedUser,
        logUserIn,
        logOut,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
