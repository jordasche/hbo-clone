import { useStateContext } from "../../HBOProvider";

const SideNav = (props) => {
   const globalState = useStateContext();
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
            <li>
               <a href="/" className="active">
                  Home
               </a>
            </li>
            <li>
               <a href="/" className="">
                  Series
               </a>
            </li>
            <li>
               <a href="/" className="">
                  Movies
               </a>
            </li>
            <li>
               <a href="/" className="">
                  Originals
               </a>
            </li>
            <li>
               <a href="/" className="">
                  Just Added
               </a>
            </li>
            <li>
               <a href="/" className="">
                  Last Chance
               </a>
            </li>
            <li>
               <a href="/" className="">
                  Coming Soon
               </a>
            </li>
            <li>
               <a href="/" className="">
                  Trending Now
               </a>
            </li>
         </ul>
         <div className="side-nav__divider" />
         <ul className="side-nav__main">
            <li>
               <a href="/" className="">
                  Home
               </a>
            </li>
            <li>
               <a href="/" className="">
                  Series
               </a>
            </li>
            <li>
               <a href="/" className="">
                  Movies
               </a>
            </li>
            <li>
               <a href="/" className="">
                  Originals
               </a>
            </li>
            <li>
               <a href="/" className="">
                  Just Added
               </a>
            </li>
            <li>
               <a href="/" className="">
                  Last Chance
               </a>
            </li>
            <li>
               <a href="/" className="">
                  Coming Soon
               </a>
            </li>
            <li>
               <a href="/" className="">
                  Trending Now
               </a>
            </li>
         </ul>
      </div>
   );
};

export default SideNav;
