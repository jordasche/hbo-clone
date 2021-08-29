import { useStateContext } from "../../HBOProvider";
import { useEffect } from "react";
const Account = () => {
   const globalState = useStateContext();
   useEffect(() => {
      if (globalState.accountOpen) {
         document.body.style.overflowY = "hidden";
      } else {
         document.body.style.overflowY = "auto";
      }
   }, [globalState.accountOpen]);
   return (
      <div
         className={`account ${
            globalState.accountOpen ? "account--active" : ""
         }`}
      >
         <div className="account__details">
            <div className="account__title">My List</div>
            <div className="account__watch-list">
               <div className="account__watch-video">
                  <img
                     src="https://m.media-amazon.com/images/I/71BPuv+iRbL._AC_SY741_.jpg"
                     alt="back to the future movie poster"
                  />
                  <div className="account__watch-overlay">
                     <div className="account__watch-buttons">
                        <div className="account__watch-circle">
                           <i className="fas fa-play"></i>
                        </div>
                        <div className="account__watch-circle">
                           <i className="fas fa-times"></i>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="account__menu">
            <ul className="account__main">
               <li>
                  <a href="/" className="active">
                     My List
                  </a>
               </li>
            </ul>
            <div className="side-nav__divider"></div>
            <ul className="account__main">
               <li>
                  <a href="/">Account</a>
               </li>
               <li>
                  <a href="/">Sign Out</a>
               </li>
            </ul>
         </div>
      </div>
   );
};

export default Account;
