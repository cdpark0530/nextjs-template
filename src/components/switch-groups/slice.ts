import type { State } from "@/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { WritableDraft } from "immer/dist/internal";
import type { SwitchOptions } from "./types";

const name = "switch-groups";
type Slice = {
  [switchId: string]: string | undefined;
};

const getInitialSwitchGroups = (): Slice => ({});

export const switchGroupSlice = createSlice({
  name,
  initialState: getInitialSwitchGroups,
  reducers: {
    toggleSwitch: (state: WritableDraft<Slice>, { payload }: PayloadAction<SwitchOptions>) => {
      const { groupId, itemId, active } = payload;

      const switchId = groupId ?? itemId;

      if (active) {
        state[switchId] = itemId;
      }
      else {
        if (state[switchId] === itemId) {
          delete state[switchId];
        }
      }

      return state;
    },
  },
});

export const {
  toggleSwitch,
} = switchGroupSlice.actions;

export const createSwitchGroupSelector = (switchId: string) => (state: State) => state[name][switchId];
