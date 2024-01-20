import Link from "next/link";

import { serverWrapper } from "utils";

const NotFoundPage = () => {
  return (
    <div>
      404
      <h1>page not found</h1>
      <p>
        you will be redirected to <Link href="/">dashboard</Link>
      </p>
    </div>
  );
};

export const getStaticProps = serverWrapper().getStaticProps(() => {
  return {
    props: {},
  };
});

export default NotFoundPage;
