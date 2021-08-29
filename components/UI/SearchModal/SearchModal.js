import { useStateContext } from "../../HBOProvider";
import { useEffect, useState } from "react";
import axios from "axios";
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
                  item.media_type === "tv" || item.mediaType === "movie"
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
   const loopComp = (comp, digit) => {
      let thumbnails = [];
      for (let index = 1; index <= digit; index++) {
         thumbnails.push(comp);
      }
      return thumbnails;
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

         <div className="search-modal__title">Popular Searches</div>
         <div className="search-modal__thumbnails">
            <div className="search-modal__thumbnail">
               <img
                  src="https://i.etsystatic.com/13367669/r/il/db21fd/2198543930/il_570xN.2198543930_4qne.jpg"
                  alt=""
               />
               <div className="search-modal__top-layer">
                  <i className="fas fa-play"></i>
               </div>
            </div>
         </div>
      </div>
   );
};

export default SearchModal;
