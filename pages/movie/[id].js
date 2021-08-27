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
   const [trailerID, setTrailerID] = useState("");

   useEffect(() => {
      if (props)
         try {
            axios
               .get(
                  `https://api.themoviedb.org/3/movie/${props.query.id}?api_key=8b4d9144732c62a3656d7c80c4753668&language=en-US&append_to_response=videos`
               )
               .then(async function (response) {
                  setMediaData(response.data);

                  if (
                     response.data.videos.results.length < 1 ||
                     response.data.videos.results === null ||
                     response.data.videos.results === undefined
                  ) {
                     setTrailerID("none");

                     throw "No Trailers";
                  }

                  const finalTrailer = await extractTrailer(
                     response.data.videos.results
                  );

                  setTrailerID(finalTrailer.key);
               })
               .then(function (error) {
                  console.log(error);
               });
         } catch (error) {
            if (error === "No Trailers") {
            }
         }
   }, []);

   //    console.log(router.query);
   //    console.log("MEDIA DATA: ", mediaData);
   return AuthCheck(
      <MainLayout>
         <FeaturedMedia
            title={mediaData.title}
            type="single"
            trailerID={trailerID}
            overview={mediaData.overview}
            backdrop={mediaData.backdrop_path}
         ></FeaturedMedia>
         <LazyLoad
            height={680}
            offset={-400}
            placeholder={<PlaceHolders type="large-v" />}
         >
            <MediaRow
               title="Similar to This"
               type="large-v"
               endpoint={`movie/${props.query.id}/similar?`}
            ></MediaRow>
         </LazyLoad>
         {/* <MediaRow title="More Like This" type="small-v"></MediaRow> */}
         <CastInfo mediaID={props.query.id}></CastInfo>
      </MainLayout>
   );
}

export async function getServerSideProps(context) {
   return {
      props: { query: context.query },
   };
}
