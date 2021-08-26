import Head from "next/head";
import MainLayout from "../components/Layouts/MainLayout";
import FeaturedMedia from "../components/UI/FeaturedMedia/FeaturedMedia";
import MediaRow from "../components/UI/MediaRow/MediaRow";
import CastInfo from "../components/UI/CastInfo/CastInfo";
import AuthCheck from "../components/UI/AuthCheck";

export default function HomeView() {
   return AuthCheck(
      <MainLayout>
         <FeaturedMedia></FeaturedMedia>
         <MediaRow title="More Like This" type="small-v"></MediaRow>
         <CastInfo></CastInfo>
      </MainLayout>
   );
}
