function Error({ statusCode }) {
  return (
    <p>
      <Error statusCode={500} />
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : "An error occurred on client"}
    </p>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode, isAuth: true };
};

export default Error;
