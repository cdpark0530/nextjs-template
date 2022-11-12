import { queryClient } from "@/clients";
import { storeWrapper } from "@/store";
import "@/styles/globals.scss";
import Layout from "@/views/Layout";
import { DehydratedState, Hydrate, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { FC, memo, useMemo } from "react";
import { Provider } from "react-redux";
import {
  persistStore,
} from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

export default memo(function App({ Component, ...rest }: Props) {
  const { store, props } = storeWrapper.useWrappedStore(rest);

  const persistor = useMemo(() => persistStore(store), [store]);

  const {
    pageProps: {
      pageName,
      pageDescription,
      pageAuthor,
      dehydratedState,
    },
  } = props as Omit<Props, "Component">;

  const PageLayout = Component.Layout || Layout;

  return (
    <Provider
      store={store}
    >
      <PersistGate
        persistor={persistor}
      >
        <QueryClientProvider
          client={queryClient}
        >
          <Hydrate state={dehydratedState}>
            <ReactQueryDevtools initialIsOpen={false} />
            <PageLayout>
              <Head>
                <meta charSet="utf-8" />
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no"
                />
                <meta name="description" content={pageDescription} />
                <meta name="author" content={pageAuthor} />

                <title>{pageName}</title>

                <link rel="icon" href="/images/icons/favicon.ico" />
              </Head>
              <Component {...props.pageProps} />
            </PageLayout>
          </Hydrate>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
});

interface Props<T extends PageProps = PageProps> extends Omit<AppProps<T>, "pageProps"> {
  pageProps: PageOptions;
  Component: Page<T>;
}

export interface PageOptions extends PageProps {
  pageName?: string;
  pageDescription?: string;
  pageAuthor?: string;
  dehydratedState?: DehydratedState;
}

export interface PageProps {
}

export type Page<T extends PageProps = PageProps> = NextPage<T>
& {
  Layout?: FC;
};
