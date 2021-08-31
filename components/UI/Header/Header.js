import Account from "../Account/Account";
import SearchModal from "../SearchModal/SearchModal";
import { useStateContext } from "../../HBOProvider";
import { useState } from "react";
import Link from "next/link";
import ls from "local-storage";

const Header = (props) => {
   const globalState = useStateContext();
   const [headerBg, setHeaderBg] = useState(false);
   const toggleSideNav = () => {
      if (globalState.sideNavOpen) {
         globalState.setSideNavOpenAction(false);
      } else {
         if (globalState.accountOpen) {
            globalState.setAccountOpenAction(false);
         }
         globalState.setSideNavOpenAction(true);
      }
   };

   const changeHeader = () => {
      if (window.scrollY >= 785) {
         setHeaderBg(true);
      } else {
         setHeaderBg(false);
      }
   };
   window.addEventListener("scroll", changeHeader, { passive: true });

   const toggleAccount = () => {
      if (globalState.accountOpen) {
         globalState.setAccountOpenAction(false);
      } else {
         if (globalState.sideNavOpen) {
            globalState.setSideNavOpenAction(false);
         }
         globalState.setAccountOpenAction(true);
      }
   };

   const getUserName = () => {
      let users = ls.get("users");
      let activeUID = ls.get("activeUID");
      let activeUser;
      console.log("LOCAL STORAGE");
      console.log(users);
      console.log("GLOBAL STATE");
      console.log(ls.get("activeUID"));

      activeUser = users.map((user, index) => {
         if (user.id === activeUID) {
            return user;
         }
      });
      console.log("THIS IS THE ACTIVE USER");
      console.log(activeUser);

      activeUser = activeUser.filter((user) => user !== undefined);
      console.log("FILTERED");
      console.log(activeUser);
      return activeUser[0].user;
   };

   return (
      <>
         <header
            className={`top-header ${
               globalState.accountOpen || globalState.sideNavOpen
                  ? "top-header--menu-open"
                  : ""
            } ${headerBg ? "top-header--active" : ""}`}
         >
            <div className="top-header__left-side">
               <div className="top-header__menu-btn">
                  <i className="fas fa-bars" onClick={toggleSideNav}></i>
               </div>
               <div
                  className="top-header__search-btn"
                  onClick={() => globalState.setSearchOpenAction(true)}
               >
                  <i className="fas fa-search"></i>
               </div>
            </div>
            <Link href="/">
               <div className="top-header__logo"></div>
            </Link>

            <div
               className="top-header__account"
               onClick={() =>
                  globalState.setAccountOpenAction(!globalState.accountOpen)
               }
               style={{ cursor: "pointer" }}
            >
               <img
                  className="top-header__user-img"
                  src="https://uifaces.co/our-content/donated/n4Ngwvi7.jpg"
                  alt="user profile picture"
               />
               <div className="top-header__user-name">{getUserName()}</div>
            </div>
            <Account></Account>
            <SearchModal></SearchModal>
         </header>
      </>
   );
};

export default Header;
