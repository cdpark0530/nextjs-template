import {
  dehydrate,
} from "@tanstack/react-query";
import Head from "next/head";
import {
  memo,
} from "react";
import {
  type Page,
  type PageCommonProps,
} from "@/_app";
import {
  queryClient,
} from "@/context/clients";
import {
  storeWrapper,
} from "@/context/store";
import {
  initCookies,
} from "@/slices/cookies";
import {
  initUserAgent,
} from "@/slices/userAgent";


const PageRoot: Page<PageCommonProps> = memo(function PageRoot() {
  return (
    <>
      <Head>
        <meta
          name="description" content="nextjs-template"
        />
        <meta
          name="author" content="Phi"
        />
      </Head>
      This is root route segment
    </>
  );
});

export const getServerSideProps = storeWrapper.getServerSideProps<PageCommonProps>(
  (store) => async (ctx) => {
    const {
      req,
    } = ctx;

    initUserAgent(store, req);
    initCookies(store, req);

    return {
      props: {
        pageName: "Home",
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      },
    };
  },
);

export default PageRoot;
