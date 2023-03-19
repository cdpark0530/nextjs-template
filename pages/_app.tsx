import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";
import {
  type DehydratedState,
  Hydrate,
  QueryClientProvider,
} from "@tanstack/react-query";
import {
  ReactQueryDevtools,
} from "@tanstack/react-query-devtools";
import {
  type NextPage,
} from "next";
import {
  type AppProps,
} from "next/app";
import Head from "next/head";
import {
  type FC,
  lazy,
  memo,
  useMemo,
  type PropsWithChildren,
} from "react";
import {
  Provider,
} from "react-redux";
import {
  persistStore,
} from "redux-persist";
import {
  PersistGate,
} from "redux-persist/integration/react";
import {
  queryClient,
} from "@/context/clients";
import {
  storeWrapper,
  useAppSelector,
} from "@/context/store";
import {
  selectPageTitle,
} from "@/slices/pageContext";


const FullLayout = lazy(() => import("@/(full-layout)/layout"));


export default memo(function App({
  Component,
  ...rest
}: Props<PageCommonProps>) {
  const {
    store,
    props,
  } = storeWrapper.useWrappedStore(rest);

  const persistor = useMemo(() => persistStore(store), [store]);

  const {
    pageProps: {
      pageName,
      dehydratedState,
    },
    ...restPageProps
  } = props as Omit<Props<PageCommonProps>, "Component">;

  const PageLayout = Component.Layout || FullLayout;

  return (
    <>
      <CssBaseline />
      <Provider
        store={store}
      >
        <PersistGate
          persistor={persistor}
        >
          <PageContextGate>
            <QueryClientProvider
              client={queryClient}
            >
              <Hydrate
                state={dehydratedState}
              >
                <ReactQueryDevtools
                  initialIsOpen={false} />
                <PageLayout>
                  <Component
                    {...restPageProps} />
                </PageLayout>
              </Hydrate>
            </QueryClientProvider>
          </PageContextGate>
        </PersistGate>
      </Provider>
    </>
  );
});

function PageContextGate({
  children,
}: PropsWithChildren<{}>) {
  const pageTitle = useAppSelector(selectPageTitle);

  return (
    <>
      <Head>
        <meta
          charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no"
        />
        <title>{pageTitle}</title>
      </Head>
      {children}
    </>
  );
}

interface Props<T extends PageCommonProps> extends Omit<AppProps<T>, "pageProps"> {
  pageProps: T;
  Component: Page<PageSpecificProps<T>>;
}

export type Page<T extends PageCommonProps = PageCommonProps> = NextPage<PageSpecificProps<T>>
& {
  Layout?: FC;
};

export interface PageCommonProps {
  pageName?: string;
  dehydratedState?: DehydratedState;
}

type PageSpecificProps<T> = Omit<T, keyof PageCommonProps>;
