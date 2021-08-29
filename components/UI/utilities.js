import axios from "axios";

function shuffleArray(array) {
   for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
   }

   return array;
}

// const getValidVideo = (allTrailerInfo) => {
//    let success = false;
//    for (let trailer of allTrailerInfo) {
//       trailer.then((result) => {
//          if (
//             "ytRating" in
//                result.videoInfo.data.items[0].contentDetails.contentRating ||
//             "regionRestriction" in result.videoInfo.data.items[0].contentDetails
//          ) {
//             console.log("NOT VALID TRAILER");
//          } else {
//             success = true;
//             console.log("Valid Trailer");
//             return resolve(result.trailer);
//          }
//       });
//       if (success) {
//          break;
//       }
//    }
// };

const getTrailers = (trailers) => {
   let allTrailerInfo,
      videoInfo,
      success = false;
   console.log(`IT's REACHING HERE AT LEASTT ${trailers[0]}`);
   return new Promise((resolve, reject) => {
      allTrailerInfo = trailers.map(async (trailer) => {
         try {
            videoInfo = await axios.get(
               `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${trailer.key}&key=AIzaSyAnqZ7BXG0Zr7ZMmqyHuURkH5vlw0bkaKQ`
            );
         } catch (error) {
            console.log(error);
         }

         return { trailer, videoInfo };
      });
      console.log(allTrailerInfo);
      for (let trailer of allTrailerInfo) {
         trailer.then((result) => {
            console.log("RESILT IN UTZZZZZ");
            console.log(result);
            if (result.videoInfo.data.items.length < 1) {
               console.log("NOT VALID TRAILER");
            } else if (
               "ytRating" in
                  result.videoInfo.data.items[0].contentDetails.contentRating ||
               "regionRestriction" in
                  result.videoInfo.data.items[0].contentDetails
            ) {
               console.log("NOT VALID TRAILER");
            } else {
               success = true;
               console.log("Valid Trailer");
               return resolve(result.trailer);
            }
         });
         if (success) {
            break;
         }
      }
      if (success) resolve([]);
   });
};

const filterTrailer = async (trailers) => {
   let finalTrailer = [];

   finalTrailer = await getTrailers(trailers);
   console.log("THIS IS THE FINAL TRAILER");
   console.log(finalTrailer);
   return finalTrailer;
};

async function extractTrailer(videos) {
   let onlyTrailers = [];
   let finalTrailer;

   onlyTrailers = videos.filter((video) => {
      return video.type === "Trailer";
   });

   if (onlyTrailers.length < 1 && videos.length > 0) {
      return videos[0];
   } else if (onlyTrailers.length > 0) {
      finalTrailer = await filterTrailer(onlyTrailers);
      console.log("FINAL TRAILER IN UTILITIES");
      console.log(finalTrailer);

      if (finalTrailer.length < 1 || finalTrailer === undefined) {
         console.log("LODU");
         return videos[0];
      } else return finalTrailer;
   }
}

export { shuffleArray, extractTrailer };
