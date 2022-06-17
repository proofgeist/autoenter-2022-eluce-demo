import type { NextPage } from "next";
import Navbar from "../components/Navbar";
import Profile from "../components/Profile";

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      <Profile />
    </>
  );
};

export default Home;
