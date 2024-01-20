import { NextApiRequest } from "next";

export default async function prepareHeaders(req: NextApiRequest) {
  return {
    ...req?.headers,
    "Content-Type": "application/json",
  };
}
