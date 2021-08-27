import axios from "axios";

function shuffleArray(array) {
   for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
   }

   return array;
}

const getVideoInfo = (trailers) => {
   let toBreak = false;

   return new Promise((resolve, reject) => {
      resolve(trailers[0]);
   });
   //    return new Promise((resolve, reject) => {
   //       for (let i = 0; i < trailers.length; i++) {
   //          //   console.log(trailer.key);
   //          axios
   //             .get(
   //                `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${trailers[i].key}&key=AIzaSyCxOckKjKJRZJJmSGBlwrc1uwrTcffffRk`
   //             )
   //             .then((response) => {
   //                if (
   //                   "regionRestriction" in
   //                      response.data.items[0].contentDetails ||
   //                   response.data.items[0].contentDetails.contentRating
   //                      .ytRating === "ytAgeRestricted"
   //                ) {
   //                } else {
   //                   resolve(trailers[i]);
   //                   toBreak = true;
   //                }
   //             })
   //             .catch((error) => {
   //                console.log(`Error in getVideoInfo: ${error}`);
   //             });

   //          if (toBreak) {
   //             resolve(trailers[i]);
   //             break;
   //          }
   //       }
   //    });
};

async function extractTrailer(videos) {
   let onlyTrailers = [];
   var validTrailer = "Bob";
   console.log(videos);
   onlyTrailers = videos.filter((video) => {
      return video.type === "Trailer";
   });
   onlyTrailers.forEach((trailer) => {
      console.log(`only trailers: ${trailer}`);
   });

   if (onlyTrailers.length < 1 && videos.length > 0) {
      return videos[0];
   } else if (onlyTrailers.length > 0) {
      const finalTrailer = await getVideoInfo(onlyTrailers);

      return finalTrailer;
   }
}

export { shuffleArray, extractTrailer };
