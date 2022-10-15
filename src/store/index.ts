import { switchGroupSlice } from "@/components/switch-groups";
import { contextSlice } from "@/context";
import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const makeStore = () => {
  const _store = configureStore({
    reducer: {
      [switchGroupSlice.name]: switchGroupSlice.reducer,
      [contextSlice.name]: contextSlice.reducer,
    },
  });

  store = _store;

  return _store;
};

export type Store = ReturnType<typeof makeStore>;
export type State = ReturnType<Store["getState"]>;

export const useAppDispatch: () => Store["dispatch"] = useDispatch;
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

export let store: Store;
export const storeWrapper = createWrapper(makeStore);
