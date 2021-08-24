import Head from "next/head";
import { useStateContext } from "../components/HBOProvider";

export default function Create() {
   const globalState = useStateContext();
   console.log(globalState);
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
               <button className="create-user__save">Save</button>
            </div>
         </div>
      </div>
   );
}
