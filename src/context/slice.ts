import type { State } from "@/store";
import { amend, getSerializable } from "@/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import type { Context } from "./types";
import { OS } from "./user-agent";

const name = "context";
type Slice = Context;

const getInitialContext = (): Slice => ({});

export const contextSlice = createSlice({
  name,
  initialState: getInitialContext,
  reducers: {
    updateContext: (state, { payload }: PayloadAction<Partial<IndexSignature<Slice>>>) => {
      return getSerializable(amend(state, payload, getInitialContext()));
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => action.payload[name],
  },
});

export const {
  updateContext,
} = contextSlice.actions;

export const selectUserAgent = (state: State) => state[name].userAgent;
export const selectOs = (state: State) => (OS as Record<string, number | undefined>)[state[name].userAgent?.os?.name ?? ""] ?? OS.undefined;
