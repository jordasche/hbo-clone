import Account from "../Account/Account";
import SearchModal from "../SearchModal/SearchModal";
const Header = (props) => {
   return (
      <>
         <header className="top-header">
            <div className="top-header__left-side">
               <div className="top-header__menu-btn">
                  <i className="fas fa-bars"></i>
               </div>
               <div className="top-header__search-btn">
                  <i className="fas fa-search"></i>
               </div>
            </div>
            <div className="top-header__logo"></div>
            <div className="top-header__account">
               <img
                  className="top-header__user-img"
                  src="https://uifaces.co/our-content/donated/n4Ngwvi7.jpg"
                  alt="user profile picture"
               />
               <div className="top-header__user-name">Bryant</div>
            </div>
            <Account></Account>
            <SearchModal></SearchModal>
         </header>
      </>
   );
};

export default Header;
