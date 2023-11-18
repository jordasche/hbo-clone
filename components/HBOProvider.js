import React, { useContext, useState } from "react";
import ls from "local-storage";

export const StateContext = React.createContext();

export function useStateContext() {
   return useContext(StateContext);
}

export function HBOProvider({ children }) {
   const [user, setUser] = useState("");
   const avatars = [
      {
         id: 1,
         url: "https://img.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg?size=626&ext=jpg",
      },
      {
         id: 2,
         url: "https://avatars.cloudflare.steamstatic.com/3699e77595996fb297de45aa08650af5b5df4df4_full.jpg",
      },
      {
         id: 3,
         url: "https://m.economictimes.com/thumb/msid-69280013,width-1200,height-900,resizemode-4,imgsize-150576/john-wicks-noble-hobby-revealed-keanu-reeves-says-it-was-cut-from-original-film.jpg",
      },
   ];
   const defaultUserImg =
      // "https://images.unsplash.com/photo-1456327102063-fb5054efe647?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=f05c14dd4db49f08a789e6449604c490";
      "https://m.economictimes.com/thumb/msid-69280013,width-1200,height-900,resizemode-4,imgsize-150576/john-wicks-noble-hobby-revealed-keanu-reeves-says-it-was-cut-from-original-film.jpg";

   const getAvatarUrl = (avatarID) => {
      let avatar = avatars.find((avatar) => {
         if (avatarID === avatar.id) {
            return avatar;
         }
      });

      return avatar.url;
   };

   const createUserAction = (e) => {
      setUser(e.target.value);
   };

   const [sideNavOpen, setSideNavOpenAction] = useState(false);
   const [accountOpen, setAccountOpenAction] = useState(false);
   const [searchOpen, setSearchOpenAction] = useState(false);
   const [watchList, setWatchList] = useState(ls.get("myList"));
   const [showAdded, setShowAdded] = useState(false);
   const [featuredId, setFeaturedId] = useState(null);

   // const addToList = (video) => {
   //    let myList;
   //    if (ls("myList") !== null) {
   //       myList = ls.get("myList");
   //       myList.push(video);
   //       ls.set("myList", myList);
   //       setWatchList(myList);
   //    } else {
   //       ls.set("myList", [video]);
   //    }
   // };
   const isInWatchList = (id) => {
      let found = null;
      if (watchList === null) {
         return false;
      }
      found = watchList.find((item) => {
         item.mediaId === id;
      });

      return found === null ? false : true;
   };
   const addToList = (video) => {
      console.log("VIDEO fdsafsaLOL: " + JSON.stringify(video));

      let myList;
      if (watchList !== null) {
         myList = watchList;
         myList.push(video);
         setWatchList(myList);
      } else {
         // ls.set("myList", [video]);
         setWatchList([video]);
      }
      console.log("ADDED TO WATCHLIST");
   };

   const removeFromList = (videoId) => {
      let myList = watchList;
      myList = myList.filter((item) => item.mediaId != videoId);
      // ls.set("myList", myList);
      setWatchList(myList);
      console.log("REMOVED FROM WATCHLIST");
   };
   // const removeFromList = (videoId) => {
   //    let myList = ls("myList");
   //    myList = myList.filter((item) => item.mediaId != videoId);
   //    ls.set("myList", myList);
   //    setWatchList(myList);
   // };

   // const thumbTypes = ["large-v", "small-v", "large-h", "small-h"];
   const thumbTypes = ["small-v", "large-v"];

   return (
      <StateContext.Provider
         value={{
            user,
            createUserAction,
            setUser,
            defaultUserImg,
            setSideNavOpenAction,
            sideNavOpen,
            accountOpen,
            setAccountOpenAction,
            searchOpen,
            setSearchOpenAction,
            thumbTypes,
            removeFromList,
            addToList,
            watchList,
            setWatchList,
            isInWatchList,
            showAdded,
            setShowAdded,
            featuredId,
            setFeaturedId,
            defaultUserImg,
            avatars,
            getAvatarUrl,
         }}
      >
         {children}
      </StateContext.Provider>
   );
}
