import axios from "axios";

export const axiosWrapper = async (args: any) => {
  const { method, url, ...rest } = args;

  if (!rest.hasOwnProperty("headers")) {
    throw new Error("Please pass args in axios");
  }

  let data: any;

  try {
    const res = await axios({
      data: {}, // Don't change it, used for supporting content-type
      method,
      url,
      ...rest,
    });

    data = res;
  } catch (err: any) {
    if (rest.ctx) {
      data = {
        data: {
          error: err?.response?.data?.message || err?.response?.statusText,
        },
      };
    } else {
      throw err;
    }
  }
  return data?.data || {};
};

export default axiosWrapper;
