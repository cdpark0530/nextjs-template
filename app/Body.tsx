import {
  type PropsWithChildren,
} from "react";


export default function Body({
  children,
}: PropsWithChildren<{}>) {
  return (
    <main>
      {children}
    </main>
  );
}
