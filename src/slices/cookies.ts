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
  type Store,
  type State,
} from "@/context/store";
import {
  amend,
  getSerializable,
  isServerSide,
} from "@/utils";


const name = "Cookies";
type Slice = Record<string, string | undefined>;

const getInitialCookies = (): Slice => ({
});

/**
 * ### The background of putting cookie in state
 * 1. You may need to access userAgent on server-side, and the unified way to access it
 * on both client-side and server-side is using a global variable. And global state is
 * a good option for that because you can see the actual userAgent value easily through devtools
 * that most state manager provides.
 * 2. You may want to re-render depending on changes of cookie.
 */
export const cookiesSlice = createSlice({
  name,
  initialState: getInitialCookies,
  reducers: {
    updateCookies: (
      slice,
      {
        payload,
      }: PayloadAction<Partial<Slice>>,
    ) => {
      // TODO: make payload have meta data for cookie
      if (!isServerSide) {
        // TODO: change `document.cookie` on client-side
      }
      return getSerializable(amend(slice, payload));
    },
  },
  extraReducers: {
    [HYDRATE]: (_, action) => action.payload[name],
  },
});

export const {
  updateCookies,
} = cookiesSlice.actions;

export const selectCookies = (state: State) => state[name];


export const initCookies = (store: Store, req: GetServerSidePropsContext["req"]) => {
  store.dispatch(updateCookies(req.cookies));
};
