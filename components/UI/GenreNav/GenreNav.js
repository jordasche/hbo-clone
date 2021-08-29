import { useStateContext } from "../../HBOProvider";
import Link from "next/Link";
import { useState } from "react";

const GenreNav = (props) => {
   const globalState = useStateContext();
   const [activeNav, setActiveNav] = useState(false);

   setTimeout(() => {
      return setActiveNav(true);
   }, 100);
   return (
      <ul className={`genre-nav ${activeNav ? "genre-nav--active" : ""}`}>
         <GenreList genresData={props.genresData} mediaType={props.mediaType} />
      </ul>
   );
};

const GenreList = (props) => {
   return props.genresData.map((item, i) => {
      return (
         <li key={i}>
            <Link href={`/${props.mediaType}/genre/${item.id}`}>
               <a>{item.name}</a>
            </Link>
         </li>
      );
   });
};

export default GenreNav;
