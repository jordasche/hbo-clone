import Head from "next/head";
import { useStateContext } from "../components/HBOProvider";
import { useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import MainLayout from "../components/Layouts/MainLayout";
import FeaturedMedia from "../components/UI/FeaturedMedia/FeaturedMedia";
import JustAdded from "../components/UI/JustAdded/JustAdded";
import PosterView from "../components/UI/PosterView/PosterView";
import ForYouList from "../components/UI/ForYouList/ForYouList";
import AuthCheck from "../components/UI/AuthCheck";
export default function Home() {
   const globalState = useStateContext();
   const router = useRouter();
   useEffect(() => {}, []);
   return AuthCheck(
      <div>
         <MainLayout>
            <FeaturedMedia></FeaturedMedia>
            <ForYouList></ForYouList>
            <JustAdded></JustAdded>
            <PosterView></PosterView>
         </MainLayout>
      </div>
   );
}
