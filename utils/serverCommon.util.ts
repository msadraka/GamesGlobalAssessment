import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import parser from "ua-parser-js";

const serverCommon = (ctx: any) => {
  const { res, req } = ctx;
  const queryClient = new QueryClient();

  const uaDeviceType = parser(ctx.req?.headers["user-agent"]).device.type;

  queryClient.setQueryData(["client", "isMobile"], uaDeviceType === "mobile");

  const theme =
    getCookie("app-theme", {
      res,
      req,
    }) || "light";

  const withoutLayoutList = ["/"];
  return {
    isWithoutLayout: withoutLayoutList.includes(ctx.resolvedUrl),
    isMobile: uaDeviceType === "mobile",
    dehydratedState: dehydrate(queryClient),
    theme,
  };
};

export default serverCommon;
