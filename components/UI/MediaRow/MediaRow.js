const MediaRow = (props) => {
   const loopComp = (comp, digit) => {
      let thumbnails = [];
      for (let index = 1; index <= digit; index++) {
         thumbnails.push(comp);
      }
      return thumbnails;
   };
   return (
      <div className={`media-row ${props.type}`}>
         <h3 className="media-row__title">{props.title}</h3>
         <div className="media-row__thumbnails">
            {loopComp(
               <div className="media-row__thumbnail">
                  <img
                     src="https://i.etsystatic.com/13367669/r/il/db21fd/2198543930/il_570xN.2198543930_4qne.jpg"
                     alt=""
                  />
                  <div className="media-row__top-layer">
                     <i className="fas fa-play"></i>
                  </div>
               </div>,
               10
            )}
         </div>
      </div>
   );
};

export default MediaRow;
