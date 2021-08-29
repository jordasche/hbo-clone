import Head from "next/head";
import { useStateContext } from "../components/HBOProvider";
import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import MainLayout from "../components/Layouts/MainLayout";
import FeaturedMedia from "../components/UI/FeaturedMedia/FeaturedMedia";
import AuthCheck from "../components/UI/AuthCheck";
import MediaRow from "../components/UI/MediaRow/MediaRow";
import LazyLoad from "react-lazyload";
import PlaceHolders from "../components/UI/PlaceHolders/PlaceHolders";
import { extractTrailer } from "../components/UI/utilities";
import axios from "axios";

export default function Home() {
   const globalState = useStateContext();
   const router = useRouter();
   const [featuredMovie, setFeaturedMovie] = useState("");

   const [trailerID, setTrailerID] = useState("");
   useEffect(() => {
      axios
         .get(
            `https://api.themoviedb.org/3/movie/436969?api_key=8b4d9144732c62a3656d7c80c4753668&language=en-US&append_to_response=videos,providers`
         )
         .then(async function (response) {
            setFeaturedMovie(response.data);
            const trailerKey = await extractTrailer(
               response.data.videos.results
            );

            setTrailerID(trailerKey.key);
         });
   }, []);

   return AuthCheck(
      <div>
         <MainLayout>
            <FeaturedMedia
               trailerID={trailerID}
               title={featuredMovie.title}
               overview={featuredMovie.overview}
               mediaUrl="/movie/436969"
               type="main"
            ></FeaturedMedia>
            <LazyLoad
               height={680}
               offset={-400}
               placeholder={<PlaceHolders type="large-v" />}
            >
               <MediaRow
                  title="Movies"
                  mediaType="movie"
                  type="large-v"
                  endpoint="discover/movie?sort_by=popularity.desc&primary_release_year=2021"
               ></MediaRow>
            </LazyLoad>
            <LazyLoad
               height={445}
               offset={-400}
               placeholder={<PlaceHolders type="small-v" />}
            >
               <MediaRow
                  title="Series"
                  mediaType="series"
                  type="small-v"
                  endpoint="discover/tv?sort_by=popularity.desc&primary_release_year=2021"
               ></MediaRow>
            </LazyLoad>
            <LazyLoad
               height={479}
               offset={-400}
               placeholder={<PlaceHolders type="small-h" />}
            >
               <MediaRow
                  mediaType="movie"
                  title="Action"
                  type="small-h"
                  endpoint="discover/movie?with_genres=28&primary_release_year=2021"
               ></MediaRow>
            </LazyLoad>
            <LazyLoad
               height={394}
               offset={-400}
               placeholder={<PlaceHolders type="large-h" />}
            >
               <MediaRow
                  mediaType="movie"
                  title="Horror"
                  type="large-h"
                  endpoint="discover/movie?with_genres=27&primary_release_year=2021"
               ></MediaRow>
            </LazyLoad>
            <LazyLoad
               height={394}
               offset={-400}
               placeholder={<PlaceHolders type="large-h" />}
            >
               <MediaRow
                  mediaType="movie"
                  title="Animations"
                  type="large-h"
                  endpoint="discover/movie?with_genres=16&primary_release_year=2021"
               ></MediaRow>
            </LazyLoad>
            <LazyLoad
               height={680}
               offset={-400}
               placeholder={<PlaceHolders type="large-v" />}
            >
               <MediaRow
                  mediaType="movie"
                  title="Sci-fi"
                  type="large-v"
                  endpoint="discover/movie?with_genres=878&primary_release_year=2021"
               ></MediaRow>
            </LazyLoad>
         </MainLayout>
      </div>
   );
}

// export async function getServerSideProps(context) {
//    return {
//       props: { query: context.query },
//    };
// }
