import axios from "axios";
import { useState, useEffect } from "react";
import { shuffleArray } from "../utilities";

const CastInfo = (props) => {
   const [loadingData, setLoadingData] = useState(true);
   const [credits, setCredits] = useState([]);

   useEffect(() => {
      axios
         .get(
            `https://api.themoviedb.org/3/${
               props.mediaType === "movie" ? "movie" : "tv"
            }/${
               props.mediaID
            }/credits?api_key=8b4d9144732c62a3656d7c80c4753668&language=en-US`
         )
         .then(function (response) {
            setCredits(response.data);
            setLoadingData(false);
         })
         .then(function (error) {});
   }, [props.updateData]);

   const showCast = () => {
      if (loadingData !== true) {
         return credits.cast.map((item, i) => {
            if (
               item.known_for_department === "Acting" &&
               item.profile_path !== null
            ) {
               return (
                  <ul className="cast-info__crew" key={i}>
                     <li>
                        <img
                           src={`https://image.tmdb.org/t/p/w92${item.profile_path}`}
                           alt=""
                           className="cast-info__profile-img"
                        />
                     </li>
                     <li className="cast-info__details">
                        <li>{item.name}</li>
                        <li className="cast-info__details--role">
                           {item.character}
                        </li>
                        <a href="#" className="cast-info__details--btn">
                           See More{" "}
                           <i
                              style={{ marginLeft: "0.75rem" }}
                              className="fas fa-angle-right"
                           ></i>
                        </a>
                     </li>
                     {/* <li></li> */}
                  </ul>
               );
            }
         });
      } else {
         return <div>Loading Cast</div>;
      }
   };
   // const showCrew = () => {
   //    if (loadingData !== true) {
   //       return credits.crew.map((item, i) => {
   //          return (
   //             <ul className="cast-info__crew" key={i}>
   //                <li>{item.name}</li>
   //                <li>{item.job}</li>
   //             </ul>
   //          );
   //       });
   //    } else {
   //       return <div>Loading Crew</div>;
   //    }
   // };

   return (
      <div className="cast-info">
         <div className="cast-info__group-title">Cast</div>
         <div className="cast-info__list">{showCast()}</div>
         {/* <div className="cast-info__group-title">Crew</div> */}
         {/* <div className="cast-info__list">{showCrew()}</div> */}
      </div>
   );
};

export default CastInfo;
