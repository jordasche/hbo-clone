const SearchModal = (props) => {
   const loopComp = (comp, digit) => {
      let thumbnails = [];
      for (let index = 1; index <= digit; index++) {
         thumbnails.push(comp);
      }
      return thumbnails;
   };
   return (
      <div className="search-modal search-modal--active">
         <div className="search-modal__input-group">
            <input
               className="search-modal__input"
               type="text"
               placeholder="search for a title"
               value=""
            />
            <h3 className="search-modal__close-btn">
               <i className="fas fa-times"></i>
            </h3>
         </div>

         <div className="search-modal__title">Popular Searches</div>
         <div className="search-modal__thumbnails">
            {loopComp(
               <div className="search-modal__thumbnail">
                  <img
                     src="https://i.etsystatic.com/13367669/r/il/db21fd/2198543930/il_570xN.2198543930_4qne.jpg"
                     alt=""
                  />
                  <div className="search-modal__top-layer">
                     <i className="fas fa-play"></i>
                  </div>
               </div>,
               10
            )}
         </div>
      </div>
   );
};

export default SearchModal;
