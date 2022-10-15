import type { Store } from "@/store";
import axios from "axios";
import type { GetServerSidePropsContext } from "next";
import { updateContext } from "./slice";
import type { Context } from "./types";
import { parseUserAgent } from "./user-agent";


export const initContext = (req: GetServerSidePropsContext["req"], store: Store) => {
  let context: Context = {};

  context = {
    ...context,
    userAgent: parseUserAgent(req.headers["user-agent"]),
  };

  store.dispatch(updateContext(context));

  initCommonHeaders(context);
};

export const initCommonHeaders = (context: Context) => {
  axios.defaults.headers.common.common?.setUserAgent(context.userAgent?.raw ?? "");
};
