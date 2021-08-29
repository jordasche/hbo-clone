import Account from "../Account/Account";
import SearchModal from "../SearchModal/SearchModal";
import { useStateContext } from "../../HBOProvider";
import { useState } from "react";
import Link from "next/link";

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
   window.addEventListener("scroll", changeHeader);

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
               onClick={toggleAccount}
               style={{ cursor: "pointer" }}
            >
               <img
                  className="top-header__user-img"
                  src="https://uifaces.co/our-content/donated/n4Ngwvi7.jpg"
                  alt="user profile picture"
               />
               <div className="top-header__user-name">{globalState.name}</div>
            </div>
            <Account></Account>
            <SearchModal></SearchModal>
         </header>
      </>
   );
};

export default Header;
