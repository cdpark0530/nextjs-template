import { queryClient } from "@/clients";
import { initContext } from "@/context";
import { storeWrapper } from "@/store";
import Home from "@/views/home";
import { dehydrate } from "@tanstack/react-query";
import type { NextPage } from "next";
import { memo } from "react";
import type { PageOptions } from "./_app";

const Page: NextPage = function Page() {
  return (
    <Home />
  );
};

export const getServerSideProps = storeWrapper.getServerSideProps<PageOptions>(
  (store) => async (ctx) => {
    const {
      req,
    } = ctx;

    initContext(req, store);

    return {
      props: {
        pageName: "Home",
        pageDescription: "좌충우돌 토이 프로젝트",
        pageAuthor: "박창대",
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      },
    };
  },
);

export default memo(Page);
