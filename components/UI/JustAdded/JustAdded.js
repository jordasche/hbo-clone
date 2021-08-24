const JustAdded = (props) => {
   const loopComp = (comp, digit) => {
      let thumbnails = [];
      for (let index = 1; index <= digit; index++) {
         thumbnails.push(comp);
      }
      return thumbnails;
   };
   return (
      <div className="just-added">
         <h3 className="just-added__title">Just Added</h3>
         <div className="just-added__thumbnails">
            {loopComp(
               <div className="just-added__thumbnail">
                  <img
                     src="https://i.etsystatic.com/13367669/r/il/db21fd/2198543930/il_570xN.2198543930_4qne.jpg"
                     alt=""
                  />
                  <div className="just-added__top-layer">
                     <i className="fas fa-play"></i>
                  </div>
               </div>,
               10
            )}
         </div>
      </div>
   );
};

export default JustAdded;
