import Head from "next/head";
import MainLayout from "../../components/Layouts/MainLayout";
import FeaturedMedia from "../../components/UI/FeaturedMedia/FeaturedMedia";
import MediaRow from "../../components/UI/MediaRow/MediaRow";
import CastInfo from "../../components/UI/CastInfo/CastInfo";
import AuthCheck from "../../components/UI/AuthCheck";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { extractTrailer } from "../../components/UI/utilities";
import LazyLoad from "react-lazyload";
import PlaceHolders from "../../components/UI/PlaceHolders/PlaceHolders";

export default function SingleMediaPage(props) {
   const router = useRouter();
   const [mediaData, setMediaData] = useState(false);
   const [trailerID, setTrailerID] = useState(props.finalTrailer.key);

   useEffect(() => {
      setTrailerID(props.trailerID);
   }, [props.trailerID]);

   // useEffect(() => {
   //    setFeaturedMediaTrailer();
   // }, [props.mediaData]);
   return AuthCheck(
      <MainLayout>
         <FeaturedMedia
            title={
               props.query.mediaType === "movie"
                  ? props.mediaData.title
                  : props.mediaData.name
            }
            type="single"
            trailerID={trailerID}
            overview={props.mediaData.overview}
            backdrop={props.mediaData.backdrop_path}
            poster={props.mediaData.poster_path}
            mediaType={props.query.mediaType}
            mediaId={props.query.id}
            completeTrailerData={props.completeTrailerData}
            runtime={props.runtime}
         ></FeaturedMedia>

         <MediaRow
            updateData={props.query.id}
            title="Similar to This"
            type="small-v"
            endpoint={`${props.query.mediaType === "movie" ? "movie" : "tv"}/${
               props.query.id
            }/similar?`}
            mediaType={props.query.mediaType}
         ></MediaRow>

         {/* <MediaRow title="More Like This" type="small-v"></MediaRow> */}
         <CastInfo
            updateData={props.query.id}
            mediaType={props.query.mediaType}
            mediaID={props.query.id}
         ></CastInfo>
      </MainLayout>
   );
}

export async function getServerSideProps(context) {
   let mediaData;
   let finalTrailer = "lol";
   let trailerID;
   let completeTrailerData;
   let runtime = "";
   const getFeaturedMediaTrailer = async () => {
      let response;
      let videoArray;
      try {
         response = await axios.get(
            `https://api.themoviedb.org/3/${context.query.mediaType}/${context.query.id}?api_key=${process.env.MOVIE_DB_KEY}&language=en-US&append_to_response=videos,providers`
         );

         // console.log("SOMETHING IS HAPPENIONG" + JSON.stringify(response));

         // console.log("SOMETHING IS HAPPENIONG" + JSON.stringify(response.data));
         // let lol = response.map((item) => {
         //    if (item === undefined) console.log("SOMETHING IS FISHY");
         // });
         videoArray = response.data.videos.results;

         let finalTrailer = await extractTrailer(videoArray);

         if (
            finalTrailer === null ||
            finalTrailer === [] ||
            finalTrailer === undefined
         ) {
            // console.log("This is firing brother");
            return "none";
         } else {
            console.log("This is firing brother");
            return finalTrailer.key;
         }
      } catch (error) {
         console.log(error);
      }
   };
   try {
      mediaData = await axios.get(
         `https://api.themoviedb.org/3/${context.query.mediaType}/${context.query.id}?api_key=${process.env.MOVIE_DB_KEY}&language=en-US&append_to_response=videos`
      );

      trailerID = await getFeaturedMediaTrailer();
      completeTrailerData = await axios.get(
         `https://api.themoviedb.org/3/${context.query.mediaType}/${mediaData.data.id}?api_key=${process.env.MOVIE_DB_KEY}&language=en-US&append_to_response=videos,providers`
      );

      console.log("Runtime: " + JSON.stringify(completeTrailerData.data));
      if (context.query.mediaType === "tv") {
         console.log(
            "DA RUNTIME: " + completeTrailerData.data.episode_run_time
         );
         runtime = completeTrailerData.data.episode_run_time;
      } else {
         runtime = completeTrailerData.data.runtime;
      }
   } catch (error) {
      console.log(error);
   }

   return {
      props: {
         finalTrailer: finalTrailer,
         trailerID: trailerID,
         mediaData: mediaData.data,
         completeTrailerData: completeTrailerData.data,
         runtime: runtime,
         query: context.query,
      },
   };
}
