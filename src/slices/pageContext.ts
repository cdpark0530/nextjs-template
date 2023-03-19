import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import {
  HYDRATE,
} from "next-redux-wrapper";
import {
  type State,
} from "@/context/store";
import {
  amend,
} from "@/utils";


const name = "PageContext";
type Slice = {
  pageTitle: string;
};

export const getInitialPageContext = (): Slice => ({
  pageTitle: "",
});

export const pageContextSlice = createSlice({
  name,
  initialState: getInitialPageContext,
  reducers: {
    updatePageContext: (
      slice,
      {
        payload,
      }: PayloadAction<PartialObject<Slice>>,
    ) => {
      return amend(slice, payload, getInitialPageContext());
    },
  },
  extraReducers: {
    [HYDRATE]: (_, action) => action.payload[name],
  },
});

export const {
  updatePageContext,
} = pageContextSlice.actions;

export const selectPageTitle = (state: State) => state[name].pageTitle;
