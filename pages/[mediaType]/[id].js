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

   console.log(props.finalTrailer);
   useEffect(() => {
      console.log(`Title: ${props.mediaData.title}`);
      setTrailerID(props.finalTrailer.key);
      console.log("lol this works");
   }, [props.finalTrailer]);

   // useEffect(() => {
   //    if (props)
   //       try {
   //          axios
   //             .get(
   //                `https://api.themoviedb.org/3/movie/${props.query.id}?api_key=8b4d9144732c62a3656d7c80c4753668&language=en-US&append_to_response=videos`
   //             )
   //             .then(async function (response) {
   //                setMediaData(response.data);

   //                if (
   //                   response.data.videos.results.length < 1 ||
   //                   response.data.videos.results === null ||
   //                   response.data.videos.results === undefined
   //                ) {
   //                   setTrailerID("none");

   //                   throw "No Trailers";
   //                }

   //                const finalTrailer = await extractTrailer(
   //                   response.data.videos.results
   //                );

   //                setTrailerID(finalTrailer.key);
   //             })
   //             .then(function (error) {
   //                console.log(error);
   //             });
   //       } catch (error) {
   //          if (error === "No Trailers") {
   //          }
   //       }
   // }, [mediaData]);

   //    console.log(router.query);
   //    console.log("MEDIA DATA: ", mediaData);

   const setFeaturedMediaTrailer = async () => {
      let response;
      let videoArray;
      try {
         response = await axios.get(
            `https://api.themoviedb.org/3/${props.query.mediaType}/${props.mediaData.id}?api_key=8b4d9144732c62a3656d7c80c4753668&language=en-US&append_to_response=videos,providers`
         );
      } catch (error) {
         console.log(error);
      }

      videoArray = response.data.videos.results;
      let finalTrailer = await extractTrailer(videoArray);

      if (
         finalTrailer === null ||
         finalTrailer === [] ||
         finalTrailer === undefined
      ) {
         setTrailerID("none");
      } else {
         setTrailerID(finalTrailer.key);
      }
   };
   useEffect(() => {
      setFeaturedMediaTrailer();
      console.log("HERES THE ID");
      console.log(props.mediaData.id);
   }, [props.mediaData]);
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
         ></FeaturedMedia>
         <LazyLoad
            height={680}
            offset={-400}
            placeholder={<PlaceHolders type="large-v" />}
         >
            <MediaRow
               updateData={props.query.id}
               title="Similar to This"
               type="large-v"
               endpoint={`${
                  props.query.mediaType === "movie" ? "movie" : "tv"
               }/${props.query.id}/similar?`}
               mediaType={props.query.mediaType}
            ></MediaRow>
         </LazyLoad>
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
   // console.log("LOLLLLZZZZ");
   // console.log(context.query.mediaType);
   try {
      mediaData = await axios.get(
         `https://api.themoviedb.org/3/${context.query.mediaType}/${context.query.id}?api_key=8b4d9144732c62a3656d7c80c4753668&language=en-US&append_to_response=videos`
      );
   } catch (error) {
      console.log(error);
   }

   console.log("MEDIA DATA IN GETSERVERPROPS");
   console.log(context.query.mediaType);
   console.log(mediaData.data.results);

   // if (
   //    mediaData.data.videos.results.length < 1 ||
   //    mediaData.data.videos.results === null ||
   //    mediaData.data.videos.results === undefined
   // ) {
   //    console.log("THERE IS NO TRAILER");
   //    finalTrailer = "none";
   // } else {
   //    console.log("TRAILER IS THERE");
   //    finalTrailer = await extractTrailer(mediaData.data.videos.results);
   //    // console.log("THIS IS THE FINAL TRAILER: " + finalTrailer);
   // }

   return {
      props: {
         finalTrailer: finalTrailer,
         mediaData: mediaData.data,
         query: context.query,
      },
   };
}
