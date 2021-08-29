import { useStateContext } from "../../HBOProvider";
import { useEffect, useRef } from "react";
import OutsideClickHandler from "react-outside-click-handler";

import Link from "next/link";

const SideNav = (props) => {
   const globalState = useStateContext();

   const handleClickOutside = (event) => {
      console.log("hi");
      toggleSideNav();
   };

   let menuRef = useRef();
   useEffect(() => {
      let handler = (event) => {
         console.log("THIS IS EVENT TARGET");
         console.log(event.target);
         if (!menuRef.current.contains(event.target)) {
            console.log("Closing side nav");
            globalState.setSideNavOpenAction(false);
         }
      };
      document.addEventListener("mousedown", handler);

      return () => {
         document.removeEventListener("mousedown", handler);
      };
   }, [menuRef]);

   useEffect(() => {
      if (globalState.sideNavOpen) {
         document.body.style.overflowY = "hidden";
      } else {
         document.body.style.overflowY = "auto";
      }
   }, [globalState.sideNavOpen]);

   const toggleSideNav = () => {
      if (globalState.sideNavOpen) {
         globalState.setSideNavOpenAction(false);
      } else {
         globalState.setSideNavOpenAction(true);
      }
   };

   return (
      <div
         className={`side-nav ${
            globalState.sideNavOpen ? "side-nav--active" : ""
         }`}
         ref={menuRef}
      >
         <div className="side-nav__close-btn" onClick={toggleSideNav}>
            <i className="fas fa-times"></i>
         </div>

         <ul className="side-nav__main">
            <li onClick={toggleSideNav}>
               <Link href="/">
                  <a>Home</a>
               </Link>
            </li>
            <li onClick={toggleSideNav}>
               <Link href="/movie">
                  <a>Movies</a>
               </Link>
            </li>
            <li onClick={toggleSideNav}>
               <Link href="/tv">
                  <a>Series</a>
               </Link>
            </li>
         </ul>

         <div className="side-nav__divider" />
      </div>
   );
};

export default SideNav;
