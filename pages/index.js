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
            <MediaRow title="Movies" type="large-v"></MediaRow>
            <MediaRow title="Series" type="small-v"></MediaRow>
            <MediaRow title="Action" type="small-h"></MediaRow>
            <MediaRow title="Horror" type="large-h"></MediaRow>
            <MediaRow title="Sci-fi" type="large-v"></MediaRow>
         </MainLayout>
      </div>
   );
}
