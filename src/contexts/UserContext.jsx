import { createContext, useContext, useReducer } from "react";

const UserDataContext = createContext();

const initialState = {
  currentUserDetails: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "addCurrentUser":
      return { ...state, currentUserDetails: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

function UserContextProvider({ children }) {
  const [{ currentUserDetails }, dispatch] = useReducer(reducer, initialState);

  return (
    <UserDataContext.Provider value={{ currentUserDetails, dispatch }}>
      {children}
    </UserDataContext.Provider>
  );
}

function useUserDataContext() {
  const context = useContext(UserDataContext);
  if (context === undefined)
    throw new Error("UserDataContext was used outside the UserContextProvider");
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { UserContextProvider, useUserDataContext };
