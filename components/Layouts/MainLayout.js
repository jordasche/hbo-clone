import Header from "../UI/Header/Header";
import SideNav from "../UI/SideNav/SideNav";
const MainLayout = (props) => {
   return (
      <div
         style={{
            background:
               "linear-gradient(312deg, rgb(10 17 105) 0%, rgb(48, 20, 94) 45%, rgb(0, 0, 0) 100%)",
            background: "#0a0a0a",
            minHeight: "100vh",
         }}
      >
         <Header></Header>
         <SideNav></SideNav>
         <section className="content-container">{props.children}</section>
      </div>
   );
};

export default MainLayout;
