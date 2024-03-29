import Head from "next/head";
import { useStateContext } from "../../../components/HBOProvider";
import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import MainLayout from "../../../components/Layouts/MainLayout";
import FeaturedMedia from "../../../components/UI/FeaturedMedia/FeaturedMedia";
import AuthCheck from "../../../components/UI/AuthCheck";
import MediaRow from "../../../components/UI/MediaRow/MediaRow";
import LazyLoad from "react-lazyload";
import PlaceHolders from "../../../components/UI/PlaceHolders/PlaceHolders";
import { extractTrailer } from "../../../components/UI/utilities";
import axios from "axios";
import { shuffleArray } from "../../../components/UI/utilities";
import GenreNav from "../../../components/UI/GenreNav/GenreNav";

export default function MediaTypePage(props) {
   const globalState = useStateContext();
   const router = useRouter();
   const showRandomMedia = () => {
      let thumbType;
      let pageGenre = props.genresData.find(
         (item) => item.id === parseInt(props.genre_id)
      );
      pageGenre = pageGenre.name;

      return props.genresData.map((item, index) => {
         thumbType = shuffleArray(globalState.thumbTypes)[0];

         console.log(item);
         // console.log("CONTEXT" + context.query)
         return (
            <LazyLoad
               height={680}
               offset={0}
               placeholder={
                  <PlaceHolders
                     title={`${pageGenre}/${item.name}`}
                     type={thumbType}
                  />
               }
               key={item.id}
            >
               <MediaRow
                  updateData={props.query.genre_id}
                  title={`${pageGenre}/${item.name}`}
                  mediaType={props.query.mediaType}
                  type={thumbType}
                  endpoint={`discover/${props.query.mediaType}?with_genres=${
                     props.query.genre_id
                  }&sort_by=popularity.desc&primary_release_year=2021&page=${
                     index + 1
                  }`}
               ></MediaRow>
            </LazyLoad>
         );
      });
   };
   const [featuredMovie, setFeaturedMovie] = useState("");

   const [trailerID, setTrailerID] = useState("");

   useEffect(() => {}, []);
   // const setFeaturedMediaTrailer = async () => {
   //    let response;
   //    let videoArray;

   //    try {
   //       response = await axios.get(
   //          `https://api.themoviedb.org/3/${props.query.mediaType}/${props.featuredData.id}?api_key=8b4d9144732c62a3656d7c80c4753668&language=en-US&append_to_response=videos,providers`
   //       );
   //    } catch (error) {
   //       console.log(error);
   //    }

   //    videoArray = response.data.videos.results;
   //    let finalTrailer = await extractTrailer(videoArray);

   //    if (
   //       finalTrailer === null ||
   //       finalTrailer === [] ||
   //       finalTrailer === undefined
   //    ) {
   //       setTrailerID("none");
   //    } else {
   //       setTrailerID(finalTrailer.key);
   //    }
   // };
   useEffect(() => {
      setTrailerID(props.trailerID);
   }, [props.featuredData]);

   return AuthCheck(
      <div>
         <MainLayout>
            <FeaturedMedia
               trailerID={trailerID}
               title={`${
                  props.query.mediaType === "movie"
                     ? props.featuredData.title
                     : props.featuredData.name
               }`}
               overview={props.featuredData.overview}
               mediaUrl={`/${
                  props.query.mediaType === "movie" ? "movie" : "tv"
               }/${props.featuredData.id}}`}
               type="discover"
               poster={props.featuredData.poster_path}
               backdrop={props.featuredData.backdrop_path}
               mediaType={props.query.mediaType}
               mediaId={props.featuredData.id}
            ></FeaturedMedia>
            <GenreNav
               mediaType={props.query.mediaType}
               genresData={props.genresData}
            />
            {showRandomMedia()}
         </MainLayout>
      </div>
   );
}

export async function getServerSideProps(context) {
   let genresData;
   let featuredData;
   let featuredDataList;
   let trailerID;
   const getFeaturedMediaTrailer = async (featuredID) => {
      let response;
      let videoArray;

      try {
         response = await axios.get(
            `https://api.themoviedb.org/3/${context.query.mediaType}/${featuredID}?api_key=${process.env.MOVIE_DB_KEY}&language=en-US&append_to_response=videos,providers`
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
         return "none";
      } else {
         return finalTrailer.key;
      }
   };
   try {
      genresData = await axios.get(
         `https://api.themoviedb.org/3/genre/${context.query.mediaType}/list?api_key=${process.env.MOVIE_DB_KEY}&language=en-US`
      );

      console.log("CONTEXT QUERY: " + context.query.genre_id);
      featuredDataList = await axios.get(
         `https://api.themoviedb.org/3/discover/${context.query.mediaType}?primary_release_year=2021&with_genres=${context.query.genre_id}&api_key=${process.env.MOVIE_DB_KEY}&language=en-US&append_to_response=videos`
      );

      featuredData = shuffleArray(featuredDataList.data.results)[0];
      trailerID = await getFeaturedMediaTrailer(featuredData.id);
   } catch (error) {
      console.log(error);
   }

   return {
      props: {
         genresData: genresData.data.genres,
         featuredData: featuredData,
         trailerID: trailerID,
         query: context.query,
         genre_id: context.query.genre_id,
      },
   };
}
