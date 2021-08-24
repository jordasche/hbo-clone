const CastInfo = () => {
   return (
      <div className="cast-info">
         <div className="cast-info__group-title">Cast & Crew</div>
         <div className="cast-info__list">
            <ul className="cast-info__crew">
               <li>Samantha Barretto</li>
               <li>George Lucas</li>
            </ul>
            <ul className="cast-info__crew">
               <li>Daniel Naroditsky</li>
               <li>Bob Lucas</li>
            </ul>
            <ul className="cast-info__crew">
               <li>James May</li>
               <li>George Lucas</li>
            </ul>
            <ul className="cast-info__crew">
               <li>Christian Bale</li>
               <li>Hans Zimmer</li>
            </ul>
         </div>
         <div className="cast-info__group-title">Director</div>
         <div className="cast-info__list">
            <ul className="cast-info__crew">
               <li>George Lucas</li>
               <li>Steven Speilberg</li>
            </ul>
         </div>
      </div>
   );
};

export default CastInfo;
