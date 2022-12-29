import {
  type PropsWithChildren,
} from "react";
import Body from "@/Body";
import Container from "@/Container";
import Header from "@/Header";


export default function HeaderOnlyLayout({
  children,
}: PropsWithChildren<{}>) {
  return (
    <Container>
      <Header />
      <Body>
        {children}
      </Body>
    </Container>
  );
}
