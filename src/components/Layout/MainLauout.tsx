import { Outlet } from "react-router-dom";
import Container from "../Ui/Container";
import Footer from "../Ui/Footer";
import Header from "../Ui/Header";

const MainLauout = () => {
  return (
    <Container>
      <Header />
      <Outlet />
      <Footer />
    </Container>
  );
};

export default MainLauout;
