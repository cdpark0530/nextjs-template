import { switchGroupSlice } from "@/components/switch-groups";
import { contextSlice } from "@/context";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

export const makeStore = () => {
  const reducer = persistReducer(
    {
      key: "next-template",
      storage,
    },
    combineReducers({
      [switchGroupSlice.name]: switchGroupSlice.reducer,
      [contextSlice.name]: contextSlice.reducer,
    }),
  );

  const _store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
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
