//@ts-nocheck
import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy from "http-proxy";

import prepareHeaders from "utils/headers.util";

const proxy = httpProxy.createProxyServer();

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  req.headers = await prepareHeaders(req, res);
  proxy.web(req, res, {
    target: `${process.env.API_PROXY}`,
    changeOrigin: true,
  });
};
