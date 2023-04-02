import {
  combineReducers,
  configureStore,
  createAction,
} from "@reduxjs/toolkit";
import {
  HYDRATE,
  createWrapper,
} from "next-redux-wrapper";
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
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
import {
  cookiesSlice,
} from "@/slices/cookies";
import {
  pageContextSlice,
} from "@/slices/pageContext";
import {
  userAgentSlice,
} from "@/slices/userAgent";


export const makeStore = () => {
  const reducer = persistReducer(
    {
      key: "nextjs-template",
      storage,
      timeout: 100, // HACK: for `persist/REHYDRAT` issue
      whitelist: [],
    },
    combineReducers({
      [userAgentSlice.name]: userAgentSlice.reducer,
      [cookiesSlice.name]: cookiesSlice.reducer,
      [pageContextSlice.name]: pageContextSlice.reducer,
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

export const hydrateActionCreator = createAction<State>(HYDRATE);
