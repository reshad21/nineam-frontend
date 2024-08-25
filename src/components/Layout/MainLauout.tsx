import { Outlet } from "react-router-dom";
import Navbar from "../Header/Navber";
import Container from "../Ui/Container";
import Footer from "../Ui/Footer";

const MainLauout = () => {
  return (
    <>
      <Navbar />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </>

    // <Container>
    //   <Navbar />
    //   <Outlet />
    //   <Footer />
    // </Container>
  );
};

export default MainLauout;
