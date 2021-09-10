import ReactPlayer from "react-player";
import { useState, useEffect } from "react";
import { Router, useRouter } from "next/dist/client/router";
import { useStateContext } from "../../HBOProvider";

const FeaturedMedia = (props) => {
   const globalState = useStateContext();
   const router = useRouter();
   const clickedPlay = () => {
      togglePlaying();
   };

   const [notification, setNotification] = useState("");

   useEffect(() => {
      setTimeout(() => {
         globalState.setShowAdded(false);
      }, 2000);
   }, [globalState.showAdded]);

   const clickedAdd = (props) => {
      let found = null;
      setNotification("LEL");
      if (globalState.watchList !== null) {
         found = globalState.watchList.find(
            (item) =>
               item.mediaId === props.mediaId &&
               item.mediaType === props.mediaType
         );
      }

      if (found === undefined || found === null) {
         globalState.addToList({
            mediaId: props.mediaId,
            mediaType: props.mediaType,
            mediaUrl: props.poster,
            mediaTitle: props.title,
         });
         setNotification(`Added "${props.title}" to Watch List`);
      } else if (found !== null) {
         globalState.removeFromList(found.mediaId);
         setNotification(`Removed "${props.title}" from Watch List`);
      }

      globalState.setShowAdded(true);
   };

   const [inWatchList, setInWatchList] = useState(false);
   useEffect(() => {
      setInWatchList(false);
      if (globalState.watchList !== null) {
         globalState.watchList.forEach((item) => {
            if (
               item.mediaId === props.mediaId &&
               item.mediaType === props.mediaType
            ) {
               setInWatchList(true);
            }
         });
      }
   }, [globalState.watchList, props.mediaId]);

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
      if (
         props.trailerID === "none" ||
         props.trailerID === null ||
         props.trailerID === undefined ||
         props.trailerID === ""
      ) {
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

   useEffect(() => {
      globalState.setFeaturedId(props.mediaId);
   }, []);
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
               <div
                  className={`featured-media__watch-list-notif ${
                     globalState.showAdded
                        ? "featured-media__watch-list-notif--active"
                        : ""
                  }`}
               >
                  <div className="featured-media__notif-title">
                     {notification}
                  </div>
               </div>
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
                     className="featured-media__add-btn"
                     onClick={() => clickedAdd(props)}
                  >
                     <i
                        // className="fas fa-play"
                        className={`${
                           inWatchList ? "fas fa-times" : "fas fa-plus"
                        }`}
                     ></i>
                  </div>
               </div>
               <div className="featured-media__buttons-right">
                  <div
                     className="featured-media__mute-btn"
                     onClick={toggleMute}
                  >
                     <i
                        className={`${
                           muted ? "fas fa-volume-mute" : "fas fa-volume-up"
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
            </div>
         </div>
      </div>
   );
};

export default FeaturedMedia;
