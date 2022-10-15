import { memo, PropsWithChildren } from "react";

interface Props {
  header: string | number;
}

function ErrorView({ header, children }: PropsWithChildren<Props>) {
  return (
    <>
      <h1>{header}</h1>
      {children}
    </>
  );
}

export default memo(ErrorView);
