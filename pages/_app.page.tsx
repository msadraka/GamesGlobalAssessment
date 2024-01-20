import { useState } from "react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import NProgress from "nprogress";
import Router from "next/router";
import Theme from "../themes";
import { ErrorBoundary } from "components";

import GlobalStyle from "../styles/global.style";
import "nprogress/nprogress.css";

if (process.env.NODE_ENV === "development") {
  require("react/jsx-dev-runtime");
}

NProgress.configure({
  minimum: 0.3,
  easing: "ease",
  speed: 800,
  showSpinner: false,
});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const MyApp = ({ Component, pageProps }: any) => {
  const { dehydratedState, theme } = pageProps;

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
            staleTime: Infinity,
            cacheTime: Infinity,
          },
        },
      })
  );

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Theme theme={theme}>
          <GlobalStyle />

          <Hydrate state={dehydratedState}>
            <Component />
          </Hydrate>

          <ReactQueryDevtools initialIsOpen={false} />
        </Theme>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default MyApp;
