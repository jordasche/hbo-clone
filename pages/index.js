import Head from "next/head";
import { useStateContext } from "../components/HBOProvider";
import { useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import MainLayout from "../components/Layouts/MainLayout";
import FeaturedMedia from "../components/UI/FeaturedMedia/FeaturedMedia";
import AuthCheck from "../components/UI/AuthCheck";
import MediaRow from "../components/UI/MediaRow/MediaRow";
import LazyLoad from "react-lazyload";
import PlaceHolders from "../components/UI/PlaceHolders/PlaceHolders";

export default function Home() {
   const globalState = useStateContext();
   const router = useRouter();
   useEffect(() => {}, []);
   return AuthCheck(
      <div>
         <MainLayout>
            <FeaturedMedia></FeaturedMedia>
            <LazyLoad
               height={680}
               offset={-400}
               placeholder={<PlaceHolders type="large-v" />}
            >
               <MediaRow
                  title="Movies"
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
                  title="Sci-fi"
                  type="large-v"
                  endpoint="discover/movie?with_genres=878&primary_release_year=2021"
               ></MediaRow>
            </LazyLoad>
         </MainLayout>
      </div>
   );
}
