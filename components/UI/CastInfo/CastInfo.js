import axios from "axios";
import { useState, useEffect } from "react";
import { shuffleArray } from "../utilities";

const CastInfo = (props) => {
   const [loadingData, setLoadingData] = useState(true);
   const [credits, setCredits] = useState([]);

   useEffect(() => {
      axios
         .get(
            `https://api.themoviedb.org/3/movie/${props.mediaID}/credits?api_key=8b4d9144732c62a3656d7c80c4753668&language=en-US`
         )
         .then(function (response) {
            setCredits(response.data);
            setLoadingData(false);
            // console.log("Success Response For Cast and Crew" + props.title);
            // console.log(response);
         })
         .then(function (error) {
            // console.log(error);
         });
   }, []);

   const showCast = () => {
      if (loadingData !== true) {
         return credits.cast.map((item) => {
            return (
               <ul className="cast-info__crew">
                  <li>{item.name}</li>
                  <li>{item.character}</li>
               </ul>
            );
         });
      } else {
         return <div>Loading Cast</div>;
      }
   };
   const showCrew = () => {
      if (loadingData !== true) {
         return credits.crew.map((item) => {
            return (
               <ul className="cast-info__crew">
                  <li>{item.name}</li>
                  <li>{item.job}</li>
               </ul>
            );
         });
      } else {
         return <div>Loading Crew</div>;
      }
   };

   return (
      <div className="cast-info">
         <div className="cast-info__group-title">Cast</div>
         <div className="cast-info__list">{showCast()}</div>
         <div className="cast-info__group-title">Crew</div>
         <div className="cast-info__list">{showCrew()}</div>
      </div>
   );
};

export default CastInfo;
