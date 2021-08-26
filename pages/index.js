import Head from "next/head";
import { useStateContext } from "../components/HBOProvider";
import { useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import MainLayout from "../components/Layouts/MainLayout";
import FeaturedMedia from "../components/UI/FeaturedMedia/FeaturedMedia";

import AuthCheck from "../components/UI/AuthCheck";
import MediaRow from "../components/UI/MediaRow/MediaRow";
export default function Home() {
   const globalState = useStateContext();
   const router = useRouter();
   useEffect(() => {}, []);
   return AuthCheck(
      <div>
         <MainLayout>
            <FeaturedMedia></FeaturedMedia>
            <MediaRow
               title="Movies"
               type="large-v"
               endpoint="discover/movie?sort_by=popularity.desc&primary_release_year=2021"
            ></MediaRow>
            <MediaRow
               title="Series"
               type="small-v"
               endpoint="discover/tv?sort_by=popularity.desc&primary_release_year=2021"
            ></MediaRow>
            <MediaRow
               title="Action"
               type="small-h"
               endpoint="discover/movie?with_genres=28&primary_release_year=2021"
            ></MediaRow>
            <MediaRow
               title="Horror"
               type="large-h"
               endpoint="discover/movie?with_genres=27&primary_release_year=2021"
            ></MediaRow>
            <MediaRow
               title="Animations"
               type="large-h"
               endpoint="discover/movie?with_genres=16&primary_release_year=2021"
            ></MediaRow>
            <MediaRow
               title="Sci-fi"
               type="large-v"
               endpoint="discover/movie?with_genres=878&primary_release_year=2021"
            ></MediaRow>
         </MainLayout>
      </div>
   );
}
