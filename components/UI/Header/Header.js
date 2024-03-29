import Account from "../Account/Account";
import SearchModal from "../SearchModal/SearchModal";
import { useStateContext } from "../../HBOProvider";
import { useState, useEffect } from "react";
import Link from "next/link";
import ls, { remove } from "local-storage";

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

   const getUserName = () => {
      let users = ls.get("users");
      let activeUID = ls.get("activeUID");
      let activeUser;

      activeUser = users.map((user, index) => {
         if (user.id === activeUID) {
            return user;
         }
      });

      activeUser = activeUser.filter((user) => user !== undefined);

      return activeUser[0].userName;
   };

   const getUserAvatar = () => {
      let users = ls.get("users");
      let activeUID = ls.get("activeUID");
      let activeUser;

      activeUser = users.map((user, index) => {
         if (user.id === activeUID) {
            return user;
         }
      });

      activeUser = activeUser.filter((user) => user !== undefined);

      return activeUser[0].avatarID;
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
                  src={globalState.getAvatarUrl(getUserAvatar())}
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
