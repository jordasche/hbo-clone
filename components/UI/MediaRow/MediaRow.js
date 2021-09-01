import { useState, useEffect } from "react";
import axios from "axios";
import { shuffleArray } from "../utilities";
import Link from "next/dist/client/link";
// import Link from "next/link";

const MediaRow = (props) => {
   const [loadingData, setLoadingData] = useState(true);
   const [movies, setMovies] = useState([]);

   useEffect(() => {
      axios
         .get(
            `https://api.themoviedb.org/3/${props.endpoint}&api_key=8b4d9144732c62a3656d7c80c4753668&language=en-US`
         )
         .then(function (response) {
            setMovies(shuffleArray(response.data.results));
            setLoadingData(false);
         })
         .then(function (error) {
            console.log(error);
         });
   }, [props.updateData]);

   const loopComp = (comp, digit) => {
      let thumbnails = [
         <Skeleton key={"a"} />,
         <Skeleton key={"b"} />,
         <Skeleton key={"c"} />,
         <Skeleton key={"d"} />,
         <Skeleton key={"e"} />,
      ];
      // for (let index = 1; index <= digit; index++) {
      //    thumbnails.push(comp);
      // }
      return thumbnails;
   };
   const showThumnails = (type) => {
      return loadingData
         ? loopComp(<Skeleton />, 10)
         : movies.map((movie) => {
              return (
                 <Thumbnail
                    mediaType={props.mediaType}
                    movieData={movie}
                    title={
                       props.mediaType === "movie" ? movie.title : movie.name
                    }
                    type={type}
                    key={movie.id}
                 />
              );
           });
   };

   const scrollRight = () => {
      document.getElementById(props.title).scrollLeft += 1800;
   };
   const scrollLeft = () => {
      document.getElementById(props.title).scrollLeft -= 1800;
   };
   return (
      <div className={`media-row ${props.type}`}>
         <h3 className="media-row__title">{props.title}</h3>
         <div className="media-row__thumbnails" id={props.title}>
            <div
               className="media-row__scroll-btn media-row__scroll-btn--left"
               onClick={scrollLeft}
            >
               <i className="fas fa-chevron-left"></i>
            </div>
            {showThumnails(props.type)}
            <div
               className="media-row__scroll-btn media-row__scroll-btn--right"
               onClick={scrollRight}
            >
               <i className="fas fa-chevron-right"></i>
            </div>
         </div>
      </div>
   );
};

const Skeleton = () => {
   return (
      <div className="media-row__thumbnail-skeleton">
         <div className="media-row__thumbnail-skeleton-img"></div>
      </div>
   );
};

const Thumbnail = (props) => {
   const thumbSize = (type) => {
      if (type === "large-v") {
         return "400";
      }
      if (type === "small-v") {
         return "185";
      }
      if (type === "large-h") {
         return "500";
      }
      if (type === "small-h") {
         return "342";
      }
   };
   return (
      <a
         href={`/${props.mediaType === "movie" ? "movie" : "tv"}/${
            props.movieData.id
         }`}
      >
         <div className="media-row__thumbnail">
            <img
               src={`https://image.tmdb.org/t/p/w${thumbSize(props.type)}${
                  props.movieData.poster_path
               }`}
               alt=""
            />
            <div className="media-row__top-layer">
               <i className="fas fa-play"></i>
               <h3 className="media-row__thumbnail-title">{props.title}</h3>
            </div>
         </div>
      </a>
   );
};

MediaRow.defaultProps = {
   mediaType: "movie",
};

export default MediaRow;
