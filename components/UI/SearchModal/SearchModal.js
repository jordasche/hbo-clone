import { useStateContext } from "../../HBOProvider";
import { useEffect, useState } from "react";
import { Router, useRouter } from "next/dist/client/router";
import axios from "axios";
import Link from "next/dist/client/link";
const SearchModal = (props) => {
   const globalState = useStateContext();
   const [popData, setPopData] = useState([]);
   const [searchData, setSearchData] = useState([]);
   const [showResults, setShowResults] = useState(false);
   const [text, setText] = useState("");

   useEffect(async () => {
      try {
         let popData = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?primary_release_yeare=2021&api_key=8b4d9144732c62a3656d7c80c4753668&language=en-US`
         );

         setPopData(popData.data.results.filter((item, i) => i < 14));
         setShowResults(false);
         console.log("popData", popData.data.results);
      } catch (error) {
         console.log(error);
      }
   }, []);

   const handleInput = async (e) => {
      try {
         setText(e.target.value);
         let searchData = await axios.get(
            `https://api.themoviedb.org/3/search/multi?query=${e.target.value}&api_key=8b4d9144732c62a3656d7c80c4753668&language=en-US`
         );

         setSearchData(
            searchData.data.results.filter(
               (item, i) =>
                  item.media_type === "tv" || item.media_type === "movie"
            )
         );
         setShowResults(true);
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      if (globalState.searchOpen) {
         document.body.style.overflowY = "hidden";
      } else {
         document.body.style.overflowY = "auto";
      }
   }, [globalState.searchOpen]);

   const router = useRouter();
   const clickedThumbnail = (type, id) => {
      if (type === "popular") {
         router.push(`/movie/${id}`);
         globalState.setSearchOpenAction(!globalState.searchOpen);
      }
      if (type === "search") {
         router.push(`/${media_type}/${id}`);
         globalState.setSearchOpenAction(!globalState.searchOpen);
      }

      // console.log(object);
   };
   return (
      <div
         className={`search-modal ${
            globalState.searchOpen ? "search-modal--active" : ""
         }`}
      >
         <div className="search-modal__input-group">
            <input
               className="search-modal__input"
               type="text"
               placeholder="search for a title"
               onChange={handleInput}
               value={text}
            />
            <h3
               className="search-modal__close-btn"
               onClick={() => globalState.setSearchOpenAction(false)}
            >
               <i className="fas fa-times"></i>
            </h3>
         </div>

         <div className="search-modal__title">
            {showResults && searchData.length >= 1 && text.length > 0
               ? `Search Result for ${text}`
               : "Popular Searches"}
         </div>
         <div className="search-modal__thumbnails">
            {showResults && searchData.length >= 1 && text.length > 0 ? (
               <SearchResults
                  searchData={searchData}
                  clickedThumbnail={clickedThumbnail}
               />
            ) : (
               <PopularResults
                  popData={popData}
                  clickedThumbnail={clickedThumbnail}
               />
            )}
         </div>
      </div>
   );
};

const PopularResults = (props) => {
   return props.popData.map((item, index) => {
      return (
         <div
            key={index}
            className="search-modal__thumbnail"
            onClick={() => props.clickedThumbnail("popular", item.id)}
         >
            <img src={`https://image.tmdb.org/t/p/w185${item.poster_path}`} />
            <div className="search-modal__top-layer">
               <i className="fas fa-play"></i>
               <h3 className="search-modal__thumbnail-title">{item.title}</h3>
            </div>
         </div>
      );
   });
};
const SearchResults = (props) => {
   return props.searchData.map((item, index) => {
      return (
         <div
            key={index}
            className="search-modal__thumbnail"
            onClick={() =>
               props.clickedThumbnail("popular", item.id, item.media_type)
            }
         >
            <img src={`https://image.tmdb.org/t/p/w185${item.poster_path}`} />
            <div className="search-modal__top-layer">
               <i className="fas fa-play"></i>
               <h3 className="search-modal__thumbnail-title">{item.title}</h3>
            </div>
         </div>
      );
   });
};

export default SearchModal;
