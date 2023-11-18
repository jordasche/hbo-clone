import Head from "next/head";
import { useStateContext } from "../components/HBOProvider";
import { useState } from "react";
import ls from "local-storage";
import { v4 } from "uuid";
import { useEffect } from "react";
import { useRouter } from "next/dist/client/router";
// import router from "next/router";

export default function Create() {
   const globalState = useStateContext();
   const router = useRouter();
   const [avatarSelectin, setavatarSelectin] = useState({
      activeAvatar: null,
      avatars: [...globalState.avatars],
   });
   const [inputValue, setInputValue] = useState("");
   const [incomplete, setIncomplete] = useState(true);
   const [error, setError] = useState([false, ""]);
   const [noUsers, setNoUsers] = useState(false);
   const toggleActive = (index) => {
      setavatarSelectin({
         ...avatarSelectin,
         activeAvatar: avatarSelectin.avatars[index],
      });
   };

   useEffect(() => {
      setError([false, ""]);
      if (ls("users") < 1) {
         setNoUsers(true);
      }
   }, []);

   const saveUser = () => {
      console.log("SAVE USER INCOMPLETE: " + incomplete);

      let users = [],
         user;

      console.log("INCOMPLETE RI" + incomplete);
      if (ls("users") < 1) {
         user = {
            id: v4(),
            userName: inputValue,
            myListID: [],
            watchList: [],
            avatarID: avatarSelectin.activeAvatar.id,
         };
         users.push(user);
         ls("users", users);
         router.push("/login");
      } else {
         users = ls("users");

         let repeatedName = false;
         users.map((user) => {
            console.log("USER: " + JSON.stringify(user));
            if (user.userName === inputValue) {
               console.log("THERE IS A REPEAT NAME");
               repeatedName = true;
            }
         });

         if (repeatedName) {
            // alert("Name already exists");
            setError([true, "Name already exists"]);
         } else {
            user = {
               id: v4(),
               userName: inputValue,
               myListID: [],
               watchList: [],
               avatarID: avatarSelectin.activeAvatar.id,
            };
            users.push(user);
            ls("users", users);
            setError([false, ""]);
            router.push("/login");
         }
      }
   };

   const clickedCancel = () => {
      router.push("/login");
   };
   return (
      <div>
         <form
            onSubmit={(e) => {
               e.preventDefault();
               console.log("KNEEGROW" + inputValue.length);
               if (
                  inputValue.length === 0 ||
                  avatarSelectin.activeAvatar === null
               ) {
                  // alert("tHIS SHIT IS EMPTY");
                  setError([true, "Must enter a name and select an avatar"]);
               } else {
                  // console.log("this is running");
                  // setIncomplete(false);
                  // setIncomplete(false);
                  // setIncomplete(false);
                  // console.log("INCOMPLETE IS NOW: " + incomplete);
                  globalState.createUserAction;
                  saveUser();
               }
            }}
         >
            <div className="create-user">
               <div className="create-user__top">
                  <div className="create-user__logo"></div>
                  <span className="create-user__title">Create An Account</span>
               </div>

               <div className="create-user__form">
                  <div className="create-user__input-group">
                     <label htmlFor="">Name</label>
                     <input
                        placeholder={"Enter Name"}
                        onChange={(e) => {
                           setInputValue(e.target.value);
                           globalState.createUserAction;
                        }}
                        type="text"
                        className="create-user__inputText"
                        value={inputValue}
                     />
                     <label htmlFor="">Avatar</label>
                     <div className="create-user__avatars">
                        {globalState.avatars.map((avatar, index) => {
                           return (
                              <div
                                 key={index}
                                 className={`create-user__avatar ${
                                    avatarSelectin.avatars[index] ===
                                    avatarSelectin.activeAvatar
                                       ? "create-user__avatar--active"
                                       : ""
                                 }`}
                                 style={{
                                    background: "rgb(194,140,31)",
                                    background:
                                       "linear-gradient(135deg, rgba(9,0,19,1) 10%, rgba(0,232,255,1) 100%)",
                                 }}
                                 onClick={() => {
                                    toggleActive(index);
                                 }}
                              >
                                 <img src={avatar.url} alt="" />
                              </div>
                           );
                        })}
                        <div
                           className={`create-user__error-message ${
                              error[0] ? "create-user__error-message--show" : ""
                           }`}
                        >
                           <i className="fas fa-exclamation-triangle"></i>
                           {error[1]}
                        </div>
                     </div>
                  </div>
               </div>
               <div className="create-user__buttons">
                  <button
                     className="create-user__save"
                     type="submit"
                     // onClick={saveUser}
                  >
                     Save
                  </button>

                  <button
                     className={`create-user__cancel ${
                        noUsers ? "create-user__cancel--hide" : ""
                     }`}
                     onClick={clickedCancel}
                  >
                     Cancel
                  </button>
               </div>
            </div>
         </form>
      </div>
   );
}
