import { useStateContext } from "../../HBOProvider";
import { useEffect } from "react";
import Link from "next/Link";

const SideNav = (props) => {
   const globalState = useStateContext();

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
