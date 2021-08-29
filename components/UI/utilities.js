import axios from "axios";

function shuffleArray(array) {
   for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
   }

   return array;
}

const getTrailers = (trailers) => {
   let allTrailerInfo, videoInfo;

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

      for (let trailer of allTrailerInfo) {
         trailer.then((result) => {
            if (
               "ytRating" in
                  result.videoInfo.data.items[0].contentDetails.contentRating ||
               "regionRestriction" in
                  result.videoInfo.data.items[0].contentDetails
            ) {
            } else {
               resolve(result.trailer);
               return;
            }
         });
      }
   });
};

const filterTrailer = async (trailers) => {
   let finalTrailer;

   finalTrailer = await getTrailers(trailers);

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
      return finalTrailer;
   }
}

export { shuffleArray, extractTrailer };
