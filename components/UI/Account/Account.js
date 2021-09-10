import { useStateContext } from "../../HBOProvider";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import ls from "local-storage";
const Account = () => {
   const globalState = useStateContext();
   useEffect(() => {
      if (globalState.accountOpen) {
         document.body.style.overflowY = "hidden";
      } else {
         document.body.style.overflowY = "auto";
      }
   }, [globalState.accountOpen]);

   let accountRef = useRef();
   useEffect(() => {
      let handler = (event) => {
         if (
            event.target.className === "top-header__user-img" ||
            event.target.className === "top-header__user-name"
         ) {
            //do nothing
         } else if (!accountRef.current.contains(event.target)) {
            globalState.setAccountOpenAction(false);
         }
      };
      document.addEventListener("mousedown", handler);
      return () => {
         document.removeEventListener("mousedown", handler);
      };
   }, [accountRef]);

   const router = useRouter();
   const watchMedia = (url) => {
      router.push(url);

      globalState.setAccountOpenAction(!globalState.accountOpen);
   };

   const showWatchList = () => {
      if (globalState.watchList !== null) {
         return globalState.watchList.map((item, index) => {
            return (
               <div className="account__watch-video" key={index}>
                  <img
                     src={`https://image.tmdb.org/t/p/w185${item.mediaUrl}`}
                  />
                  <div className="account__watch-overlay">
                     <div className="account__watch-buttons">
                        <div
                           className="account__watch-circle"
                           onClick={() =>
                              watchMedia(`/${item.mediaType}/${item.mediaId}`)
                           }
                        >
                           <i className="fas fa-play"></i>
                        </div>
                        <div
                           className="account__watch-circle"
                           onClick={() =>
                              globalState.removeFromList(item.mediaId)
                           }
                        >
                           <i className="fas fa-times"></i>
                        </div>
                     </div>
                  </div>
               </div>
            );
         });
      }
   };

   const pushToLogin = () => {
      router.push("/login");
   };
   const signOut = () => {
      ls.remove("users");
      globalState.setUser("");
      router.push("/");
   };
   return (
      <div
         className={`account ${
            globalState.accountOpen ? "account--active" : ""
         }`}
         ref={accountRef}
      >
         <div className="account__details">
            <div className="account__title">My List</div>
            <div className="account__watch-list">
               {globalState.watchList !== null
                  ? showWatchList()
                  : "Sorry No Movies Added"}
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
               <li onClick={pushToLogin}>
                  <a>Account</a>
               </li>
               <li>
                  <a onClick={signOut}>Sign Out</a>
               </li>
            </ul>
         </div>
      </div>
   );
};

export default Account;
