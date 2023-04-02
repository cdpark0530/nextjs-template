import {
  type GetServerSideProps,
} from "next";
import Head from "next/head";
import {
  memo,
} from "react";
import {
  type Page,
  type PageCommonProps,
} from "@/_app";


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

export const getServerSideProps: GetServerSideProps<PageCommonProps> = async () => {
  return {
    props: {
    },
  };
};

export default PageRoot;
