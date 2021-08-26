import { useState } from "react";
import axios from "axios";
import { shuffleArray } from "../utilities";

const PlaceHolders = (props) => {
   const [loadingData, setLoadingData] = useState(true);
   const [movies, setMovies] = useState([]);

   return (
      <div className={`media-row ${props.type}`}>
         <h3 className="media-row__title">{props.title}</h3>
         <div className="media-row__thumbnails">
            <div className="media-row__thumbnail-skeleton">
               <div className="media-row__thumbnail-skeleton-img"></div>
            </div>
            <div className="media-row__thumbnail-skeleton">
               <div className="media-row__thumbnail-skeleton-img"></div>
            </div>
            <div className="media-row__thumbnail-skeleton">
               <div className="media-row__thumbnail-skeleton-img"></div>
            </div>
            <div className="media-row__thumbnail-skeleton">
               <div className="media-row__thumbnail-skeleton-img"></div>
            </div>
            <div className="media-row__thumbnail-skeleton">
               <div className="media-row__thumbnail-skeleton-img"></div>
            </div>
            <div className="media-row__thumbnail-skeleton">
               <div className="media-row__thumbnail-skeleton-img"></div>
            </div>
            <div className="media-row__thumbnail-skeleton">
               <div className="media-row__thumbnail-skeleton-img"></div>
            </div>
         </div>
      </div>
   );
};

export default PlaceHolders;
