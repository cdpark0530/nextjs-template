import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";
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
} from "react";


const FullLayout = lazy(() => import("@/(full-layout)/layout"));


export default memo(function App({
  pageProps,
  Component,
}: Props<PageCommonProps>) {
  const {
    ...restPageProps
  } = pageProps;

  const PageLayout = Component.Layout || FullLayout;

  return (
    <>
      <Head>
        <meta
          charSet="utf-8"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no"
        />
      </Head>
      <CssBaseline />
      <PageLayout>
        <Component
          {...restPageProps}
        />
      </PageLayout>
    </>
  );
});

interface Props<T extends PageCommonProps> extends Omit<AppProps<T>, "pageProps"> {
  pageProps: T;
  Component: Page<PageSpecificProps<T>>;
}

export type Page<T extends PageCommonProps = PageCommonProps> = NextPage<PageSpecificProps<T>>
& {
  Layout?: FC;
};

export interface PageCommonProps {
}

type PageSpecificProps<T> = Omit<T, keyof PageCommonProps>;
