import Head from "next/head";

export default function Home() {
   return (
      <div>
         <div className="login-user">
            <div className="login-user__top">
               <div className="login-user__logo"></div>
               <span className="login-user__title">Who Is Watching?</span>
            </div>
            <div className="login-user__form">
               <div className="login-user__user-box">
                  <img
                     src="https://uifaces.co/our-content/donated/n4Ngwvi7.jpg"
                     alt=""
                     className="login-user__user-img"
                  />
                  <div className="login-user__user-name">Bryant</div>
               </div>
            </div>
            <div className="login-user__buttons">
               <button className="login-user__adult">Add Adult</button>
               <button className="login-user__kid">Add Kid</button>
            </div>
         </div>
      </div>
   );
}
