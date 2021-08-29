import React, { useContext, useState } from "react";

export const StateContext = React.createContext();

export function useStateContext() {
   return useContext(StateContext);
}

export function HBOProvider({ children }) {
   const [user, setUser] = useState("");
   const defaultUserImg = "https://uifaces.co/our-content/donated/n4Ngwvi7.jpg";
   const createUserAction = (e) => {
      setUser(e.target.value);
      console.log(2 + 2);
   };

   const [sideNavOpen, setSideNavOpenAction] = useState(false);
   const [accountOpen, setAccountOpenAction] = useState(false);
   const [searchOpen, setSearchOpenAction] = useState(false);
   const thumbTypes = ["large-v", "small-v", "large-h", "small-h"];
   return (
      <StateContext.Provider
         value={{
            user,
            createUserAction,
            setUser,
            defaultUserImg,
            setSideNavOpenAction,
            sideNavOpen,
            accountOpen,
            setAccountOpenAction,
            searchOpen,
            setSearchOpenAction,
            thumbTypes,
         }}
      >
         {children}
      </StateContext.Provider>
   );
}
