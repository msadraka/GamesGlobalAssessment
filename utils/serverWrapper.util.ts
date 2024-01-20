import authorization from "./auth.util";
import serverCommon from "./serverCommon.util";

const wrapper = () => {
  return {
    getStaticProps: (serverFN: any) => async (ctx: any) => {
      const asyncProps = (await serverFN()) || {};
      return {
        props: {
          ...serverCommon(ctx),
          ...asyncProps.props,
        },
        ...(serverFN().redirect && {
          redirect: serverFN().redirect,
        }),
      };
    },
    getServerSideProps: (serverFN: any) => async (ctx: any) => {
      const { props, redirect } = (await authorization(ctx, serverFN)) || {};

      return {
        props: {
          ...serverCommon(ctx),
          ...props,
        },
        ...(redirect && {
          redirect,
        }),
      };
    },
  };
};

export default wrapper;
