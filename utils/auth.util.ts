const auth = async (ctx: any, serverFN?: any) => {
  const { props, redirect } = await serverFN(ctx);

  return { props, redirect };
};

export default auth;
