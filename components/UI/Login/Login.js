import Head from "next/head";
import { useStateContext } from "../../HBOProvider";
import { useRouter } from "next/dist/client/router";
import { useState, useEffect } from "react";
import ls from "local-storage";
import { useMounted } from "../../Hooks/useMounted";

const Login = () => {
   const globalState = useStateContext();
   const router = useRouter();
   const [loadingUsers, setLoadingUsers] = useState(false);
   let users = ls("users") !== null ? ls("users") : [];

   let { hasMounted } = useMounted();
   useEffect(() => {
      if (users < 1) {
         setLoadingUsers(false);
      } else {
         let newUsers = users.map((item, index) => {
            if (globalState.user === item.id) {
               console.log(item.id);

               item.watchList = globalState.watchList;
               console.log(
                  "UPDATED WATCHLIST IN LOCAL STORAGE: " +
                     JSON.stringify(item.watchList)
               );
            }
            return item;
         });
         console.log("IN USE EFFECT LMAOOOZFDSJF: " + JSON.stringify(newUsers));
         ls.set("users", newUsers);
      }
   }, []);

   const selectUser = (id) => {
      console.log("LOCAL STORAGE: " + ls.get("users"));
      let newUsers = users.map((item, index) => {
         if (globalState.user === item.id) {
            console.log(item.id);

            item.watchList = globalState.watchList;
            console.log(
               "UPDATED WATCHLIST IN LOCAL STORAGE: " +
                  JSON.stringify(item.watchList)
            );
         }
         return item;
      });

      ls.set("users", newUsers);

      ls("activeUID", id);
      globalState.setUser(id);
      // globalState.setWatchList(ls());
      // let currentUser = users.find((item) => {
      //    console.log("ITEM: " + JSON.stringify(item));
      //    return item.id === id;
      // });
      let currentUpdatedUser = newUsers.find((item) => {
         console.log("ITEM: " + JSON.stringify(item));
         return item.id === id;
      });
      globalState.setWatchList(currentUpdatedUser.watchList);

      router.push("/");
   };

   const showUsers = () => {
      if (!loadingUsers) {
         return users.map((user) => {
            console.log(
               "AVATAR ID: " +
                  JSON.stringify(globalState.getAvatarUrl(user.avatarID))
            );
            return (
               <div
                  onClick={() => selectUser(user.id)}
                  className="login-user__user-box"
                  key={user.id}
               >
                  <img
                     src={globalState.getAvatarUrl(user.avatarID)}
                     alt=""
                     className="login-user__user-img"
                  />
                  <div className="login-user__user-name">{user.userName}</div>
               </div>
            );
         });
      }
   };

   const createUser = () => {
      router.push("/create");
   };
   return (
      <div className="login-user">
         <div className="login-user__top">
            <div className="login-user__logo"></div>
            <span className="login-user__title">Who Is Watching?</span>
         </div>
         <div className="login-user__form">{hasMounted ? showUsers() : ""}</div>
         <div className="login-user__buttons">
            <button className="login-user__adult" onClick={createUser}>
               Create User
            </button>
         </div>
      </div>
   );
};

export default Login;
