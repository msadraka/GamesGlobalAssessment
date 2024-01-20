import { serverWrapper } from "utils";

export default function Custom500() {
  return <h1>500 - Server-side error occurred reload page</h1>;
}

export const getStaticProps = serverWrapper().getStaticProps(() => {
  return {
    props: {},
  };
});
