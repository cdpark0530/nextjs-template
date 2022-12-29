import {
  type PropsWithChildren,
} from "react";
import Body from "@/Body";
import Container from "@/Container";
import Footer from "@/Footer";
import Header from "@/Header";


export default function FullLayout({
  children,
}: PropsWithChildren<{}>) {
  return (
    <Container>
      <Header />
      <Body>
        {children}
      </Body>
      <Footer />
    </Container>
  );
}
