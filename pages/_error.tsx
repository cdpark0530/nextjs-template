import ErrorView from "@/views/ErrorView";
import Layout from "@/views/Layout";
import { NextPageContext } from "next";
import { memo, PropsWithChildren } from "react";
import type { Page, PageProps } from "./_app";


interface Props extends PageProps {
  statusCode: number | undefined;
  err: NextPageContext["err"];
}

const Page: Page<Props> = memo(function Page({ statusCode, err }: Props) {
  const description = err?.message;

  return (
    <ErrorView
      header={`${statusCode ?? 500}: 오류가 발생했습니다`}
    >
      <p>{description}</p>
    </ErrorView>
  );
});

Page.Layout = memo((props: PropsWithChildren<{}>) => {
  return (
    <Layout
    >
      {props.children}
    </Layout>
  );
});

Page.getInitialProps = ({ res, err }: NextPageContext): Props => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return {
    statusCode,
    err,
  };
};

export default Page;
