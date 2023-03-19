import {
  type PayloadAction,
  createSlice,
} from "@reduxjs/toolkit";
import {
  type GetServerSidePropsContext,
} from "next";
import {
  HYDRATE,
} from "next-redux-wrapper";
import {
  UAParser,
} from "ua-parser-js";
import {
  type Store,
  type State,
} from "@/context/store";
import {
  amend,
  getSerializable,
} from "@/utils";


export const OS = {
  any: -1,
  none: 0,
  undefined: 0x1,
  Android: 0x2,
  iOS: 0x4,
} as const;

export const Platforms = {
  any: -1,
  none: 0,
  undefined: 0x1,
  Web: 0x2,
  App: 0x4,
} as const;

export interface UserAgent {
  raw?: string;
  browser?: Omit<UAParser.IBrowser, "major">;
  engine?: UAParser.IEngine;
  os?: UAParser.IOS;
  device?: UAParser.IDevice;
}

const name = "UserAgent";
type Slice = UserAgent;

const getInitialUserAgent = (): Slice => ({
});

/**
 * ### The background of putting userAgent in state
 * Conceptually userAgent is fixed in a request for now, which is against the concept of 'state'.
 * But I still choose to put it in state because:
 * 1. You may need to access userAgent on server-side, and the unified way to access it
 * on both client-side and server-side is using a global variable. And global state is
 * a good option for that because you can see the actual userAgent value easily through devtools
 * that most state manager provides.
 * 2. You never know if the fact that userAgent is fixed in a request will change at some point.
 * With the fact that there comes foldable devices which can be folded/unfolded at run-time,
 * the policy whether or not the value of userAgent can change at runtime can change in the future.
 */
export const userAgentSlice = createSlice({
  name,
  initialState: getInitialUserAgent,
  reducers: {
    updateUserAgent: (
      slice,
      {
        payload,
      }: PayloadAction<Partial<Slice>>,
    ) => {
      return getSerializable(amend(slice, payload));
    },
  },
  extraReducers: {
    [HYDRATE]: (_, action) => action.payload[name],
  },
});

export const {
  updateUserAgent,
} = userAgentSlice.actions;

export const selectUserAgent = (state: State) => state[name];
export const selectOs = (state: State) => (OS as Record<string, number | undefined>)[
  state[name].os?.name ?? ""
] ?? OS.undefined;


export const initUserAgent = (store: Store, req: GetServerSidePropsContext["req"]) => {
  store.dispatch(updateUserAgent(
    parseUserAgent(req.headers["user-agent"])
  ));
};

export const parseUserAgent = (userAgent: string | undefined): UserAgent => {
  if (!userAgent) {
    return {
    };
  }

  const ua = new UAParser(userAgent);
  const raw = ua.getUA();
  const browser = ua.getBrowser();
  delete browser.major;
  const engine = ua.getEngine();
  const os = ua.getOS();
  const device = ua.getDevice();

  return {
    raw,
    browser,
    engine,
    os,
    device,
  };
};
