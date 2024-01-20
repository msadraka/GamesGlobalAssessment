import Head from "next/head";
import { DashboardCTR } from "containers";

import StyleWrapper from "./dashboard.style";

const Dashboard = () => {
  return (
    <StyleWrapper>
      <Head>
        <title>Time Tracking - Dashboard</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <DashboardCTR />
    </StyleWrapper>
  );
};

export default Dashboard;
