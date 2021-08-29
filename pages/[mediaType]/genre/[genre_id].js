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
      console.log("GENRES DATA IN FUNC");
      console.log(props.genresData);
      return props.genresData.map((item, index) => {
         thumbType = shuffleArray(globalState.thumbTypes)[0];
         return (
            <LazyLoad
               //    height={680}
               offset={200}
               placeholder={<PlaceHolders title={item.name} type={thumbType} />}
               key={item.id}
            >
               <MediaRow
                  updateData={props.query.genre_id}
                  title={item.name}
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

   const setFeaturedMediaTrailer = async () => {
      let response;
      let videoArray;
      try {
         response = await axios.get(
            `https://api.themoviedb.org/3/${props.query.mediaType}/${props.featuredData.id}?api_key=8b4d9144732c62a3656d7c80c4753668&language=en-US&append_to_response=videos,providers`
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
      console.log(props.featuredData.id);
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
               backdrop={props.featuredData.backdrop_path}
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
   try {
      genresData = await axios.get(
         `https://api.themoviedb.org/3/genre/${context.query.mediaType}/list?api_key=8b4d9144732c62a3656d7c80c4753668&language=en-US&append_to_response=videos`
      );
      featuredData = await axios.get(
         `https://api.themoviedb.org/3/discover/${context.query.mediaType}?primary_release_year=2021&with_genres=${context.query.genre_id}&api_key=8b4d9144732c62a3656d7c80c4753668&language=en-US&append_to_response=videos`
      );
   } catch (error) {
      console.log("error LOLZ");
      console.log(error);
   }

   //    console.log("GENRES DATA");
   //    console.log(featuredData.data);

   return {
      props: {
         genresData: genresData.data.genres,
         featuredData: shuffleArray(featuredData.data.results)[0],
         query: context.query,
      },
   };
}
