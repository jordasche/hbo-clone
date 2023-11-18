import { useState, useEffect } from "react";
import axios from "axios";
import { shuffleArray } from "../utilities";
import Link from "next/dist/client/link";
import Image from "next/image";
import { useStateContext } from "../../HBOProvider";

import getBase64 from "../../Utilities/getLocalBase64";

const MediaRow = (props) => {
   const globalState = useStateContext();
   const [loadingData, setLoadingData] = useState(true);
   const [movies, setMovies] = useState([]);
   let thumbType = "small-v";

   useEffect(() => {
      thumbType = shuffleArray(globalState.thumbTypes)[0];
   }, []);

   useEffect(() => {
      setLoadingData(true);
      axios
         .get(
            `https://api.themoviedb.org/3/${props.endpoint}&api_key=8b4d9144732c62a3656d7c80c4753668&language=en-US`
         )
         .then(function (response) {
            if (
               response.data.results === null ||
               response.data.results === undefined ||
               response.data.results.length === 0
            ) {
               console.log("Do something because there is no data");
            }
            console.log("RESPONSE DATA: " + response.data.results);

            let results = response.data.results.filter((result) => {
               return result.poster_path !== null;
            });

            setMovies(shuffleArray(results));
            setLoadingData(false);
         })
         .then(function (error) {
            console.log(error);
         });
      setLoadingData(true);
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

   const mapMovies = (movies) => {
      console.log("MOVIE: " + movies.length);
      if (movies.length === 0) {
         return (
            <>
               <h1
                  style={{
                     fontSize: "1rem",
                     color: "#fff",
                  }}
               >
                  There is nothing similar to this!
               </h1>
            </>
         );
      }
      return movies.map((movie) => {
         return (
            <Thumbnail
               mediaType={props.mediaType}
               movieData={movie}
               title={props.mediaType === "movie" ? movie.title : movie.name}
               type={thumbType}
               key={movie.id}
            />
         );
      });
   };
   const showThumnails = (type) => {
      console.log("PROPS TYPE: " + props.type + props.index);
      return loadingData ? loopComp(<Skeleton />, 10) : mapMovies(movies);
   };

   const scrollRight = () => {
      document.getElementById(props.title).scrollLeft += 1800;
   };
   const scrollLeft = () => {
      document.getElementById(props.title).scrollLeft -= 1800;
   };
   // console.log(props.index);
   return (
      <div className={`media-row ${thumbType}`}>
         <h3 className="media-row__title">{props.title}</h3>
         <div className="media-row__thumbnails" id={props.title}>
            <div
               className="media-row__scroll-btn media-row__scroll-btn--left"
               onClick={scrollLeft}
            >
               <i className="fas fa-chevron-left"></i>
            </div>
            {showThumnails(thumbType)}
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
   let isPortrait = true;

   if (props.type === "large-h") {
      isPortrait = false;
   }
   if (props.type === "small-h") {
      isPortrait = false;
   }

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
   // const blurUrl = await getBase64(
   //    `https://image.tmdb.org/t/p/w${thumbSize(props.type)}${
   //       props.movieData.poster_path
   //    }`
   // );

   return (
      <Link
         href={`/${props.mediaType === "movie" ? "movie" : "tv"}/${
            props.movieData.id
         }`}
      >
         <a>
            <div className="media-row__thumbnail ">
               <Image
                  src={`${
                     isPortrait
                        ? `https://image.tmdb.org/t/p/w${thumbSize(
                             props.type
                          )}${props.movieData.poster_path}`
                        : `https://image.tmdb.org/t/p/w${thumbSize(
                             props.type
                          )}${props.movieData.backdrop_path}`
                  }`}
                  // src={`https://image.tmdb.org/t/p/w${thumbSize(props.type)}${
                  //    props.movieData.poster_path
                  // }`}
                  alt=""
                  width={240}
                  height={360}
                  className="media-row__thumbnail-image"
                  // priority={true}
                  // placeholder="blur"
                  // blurDataURL={}
                  onLoad={(image) =>
                     setTimeout(() => {
                        image.target.classList.add(
                           "media-row__thumbnail-image--show"
                        );
                     }, 180)
                  }
                  // layout="fill"
               />
               <div className="media-row__top-layer">
                  <i className="fas fa-play"></i>
                  <h3 className="media-row__thumbnail-title">{props.title}</h3>
               </div>
            </div>
         </a>
      </Link>
   );
};

MediaRow.defaultProps = {
   mediaType: "movie",
};

export default MediaRow;
