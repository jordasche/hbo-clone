import ReactPlayer from "react-player";
import { useState } from "react";
import { Router, useRouter } from "next/dist/client/router";

const FeaturedMedia = (props) => {
   const router = useRouter();
   const clickedPlay = () => {
      togglePlaying();
   };

   const [fullScreen, setFullScreen] = useState(false);
   const toggleFullScreen = () => {
      if (fullScreen === true) {
         setFullScreen(false);
      } else setFullScreen(true);
   };
   const clickedTitle = () => {
      if (props.type === "main" || props.type === "discover") {
         router.push(props.mediaUrl);
      }
   };
   const clickedMoreInfo = () => {
      if (props.type === "main" || props.type === "discover") {
         router.push(props.mediaUrl);
      }
   };

   const [muted, setMuted] = useState(true);
   const [playing, setPlaying] = useState(true);

   const togglePlaying = () => {
      if (playing === true) {
         setPlaying(false);
      } else setPlaying(true);
   };
   const toggleMute = () => {
      if (muted === true) {
         setMuted(false);
      } else {
         setMuted(true);
      }
   };

   const showMedia = () => {
      console.log("Trailer ID: ", props.trailerID);
      if (
         props.trailerID === "none" ||
         props.trailerID === null ||
         props.trailerID === undefined ||
         props.trailerID === ""
      ) {
         console.log("FOUND NOT VALID");
         console.log(props.backdrop);
         // `https://image.tmdb.org/t/p/w1280${props.backdrop}`;
         console.log(props.poster);
         return (
            <img
               src={`https://image.tmdb.org/t/p/w1280${
                  props.backdrop === null ? props.poster : props.backdrop
               }`}
               // src={() => {
               //    if (props.backdrop === null) {
               //       return `https://image.tmdb.org/t/p/w1280${props.poster}`;
               //    } else {
               //       return `https://image.tmdb.org/t/p/w1280${props.backdrop}`;
               //    }
               // }}
               alt=""
               className="featured-media__img"
            />
         );
      } else {
         //url={`https://www.youtube.com/embed/${props.trailerID}?autoplay=1&loop=1&start=16&playlist=${props.trailerID}`}
         return (
            <ReactPlayer
               url={`https://www.youtube.com/embed/${props.trailerID}`}
               muted={muted}
               volume={1}
               className="featured-media__video"
               width="100%"
               height="100%"
               playing={playing}
               loop={true}
            />
         );
      }
   };

   const getModifier = () => {
      if (props.type === "single") {
         return "featured-media--single";
      } else {
         return "";
      }
   };
   return (
      <div
         className={`featured-media ${
            fullScreen ? "" : "featured-media--single"
         }`}
         //    `featured-media
         // ${getModifier()}`}
      >
         {showMedia()}
         <div className="featured-media__bg">
            <div className="featured-media__container">
               <div className="featured-media__title" onClick={clickedTitle}>
                  {props.title}
               </div>
               <div className="featured-media__playing">Now Playing</div>
               <div className="featured-media__overview">{props.overview}</div>

               <div className="featured-media__buttons">
                  <div
                     className="featured-media__play-btn"
                     onClick={clickedPlay}
                  >
                     <i
                        // className="fas fa-play"
                        className={`${
                           playing ? "fas fa-pause" : "fas fa-play"
                        }`}
                     ></i>
                  </div>
                  <div
                     className="featured-media__full-screen-btn"
                     onClick={toggleFullScreen}
                  >
                     <i
                        // className="fas fa-play"
                        className={`${
                           fullScreen
                              ? "fas fa-chevron-up"
                              : "fas fa-chevron-down"
                        }`}
                     ></i>
                  </div>
                  <div
                     className={`featured-media__info-btn ${
                        props.type === "single" ? "hide-comp" : ""
                     }`}
                     onClick={clickedMoreInfo}
                  >
                     MORE INFO
                  </div>
               </div>
               <div className="featured-media__mute" onClick={toggleMute}>
                  <i
                     className={`${
                        muted ? "fas fa-volume-mute" : "fas fa-volume-up"
                     }`}
                  ></i>
               </div>
            </div>
         </div>
      </div>
   );
};

export default FeaturedMedia;
