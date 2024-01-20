import { useEffect } from "react";
import Head from "next/head";
import { serverWrapper } from "utils";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import StyleWrapper from "./index.style";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard");
  }, []);

  return (
    <StyleWrapper>
      <Head>
        <title>Time Tracking Adxoyh</title>
        <meta name="description" content="Time Tracking Adxoyh" />
        <link rel="icon" href="/favicon.png" />
      </Head>
    </StyleWrapper>
  );
};

export const getServerSideProps = serverWrapper().getServerSideProps(
  async () => {
    return {
      props: {},
    };
  }
) as GetServerSideProps;

export default Home;
