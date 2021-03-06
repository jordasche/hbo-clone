import Head from "next/head";
import { useStateContext } from "../components/HBOProvider";
import ls from "local-storage";
import { v4 } from "uuid";
import { useRouter } from "next/dist/client/router";

export default function Create() {
   const globalState = useStateContext();
   const router = useRouter();
   const saveUser = () => {
      let users = [],
         user;

      if (ls("users") < 1) {
         user = {
            id: v4(),
            user: globalState.user,
            myListID: [],
         };
         users.push(user);
         ls("users", users);
         router.push("/login");
      } else {
         users = ls("users");
         user = {
            id: v4(),
            user: globalState.user,
            myListID: [],
         };
         users.push(user);
         ls("users", users);
         router.push("/login");
      }
   };
   return (
      <div>
         <div className="create-user">
            <div className="create-user__top">
               <div className="create-user__logo"></div>
               <span className="create-user__title">Who Is Watching?</span>
            </div>
            <div className="create-user__form">
               <img
                  src={globalState.defaultUserImg}
                  alt=""
                  className="create-user__user-img"
               />
               <div className="create-user__input-group">
                  <label htmlFor="">Name</label>
                  <input
                     value={globalState.user}
                     onChange={globalState.createUserAction}
                     type="text"
                     className="create-user__inputText"
                  />
                  <div className="create-user__colors">
                     <div
                        className="create-user__color create-user__color--active"
                        style={{
                           background: "rgb(194,140,31)",
                           background:
                              "linear-gradient(135deg, rgba(9,0,19,1) 10%, rgba(0,232,255,1) 100%)",
                        }}
                     ></div>
                     <div
                        className="create-user__color"
                        style={{
                           background: "rgb(194,140,31)",
                           background:
                              "linear-gradient(135deg, rgba(9,0,19,1) 10%, rgba(61,255,0,1) 100%)",
                        }}
                     ></div>
                     <div
                        className="create-user__color"
                        style={{
                           background: "rgb(194,140,31)",
                           background:
                              "linear-gradient(135deg, rgba(9,0,19,1) 10%, rgba(145,0,255,1) 100%)",
                        }}
                     ></div>
                     <div
                        className="create-user__color"
                        style={{
                           background: "rgb(194,140,31)",
                           background:
                              "linear-gradient(135deg, rgba(9,0,19,1) 10%, rgba(186,2,2,1) 100%)",
                        }}
                     ></div>
                     <div
                        className="create-user__color"
                        style={{
                           background: "rgb(194,140,31)",
                           background:
                              "linear-gradient(135deg, rgba(9,0,19,1) 10%, rgba(255,87,214,1) 100%)",
                        }}
                     ></div>
                  </div>
               </div>
            </div>
            <div className="create-user__buttons">
               <button className="create-user__cancel">Cancel</button>
               <button className="create-user__save" onClick={saveUser}>
                  Save
               </button>
            </div>
         </div>
      </div>
   );
}
