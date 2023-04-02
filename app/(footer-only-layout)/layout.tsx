import {
  type PropsWithChildren,
} from "react";
import Body from "@/Body";
import Container from "@/Container";
import Footer from "@/Footer";


export default function FooterOnlyLayout({
  children,
}: PropsWithChildren<{}>) {
  return (
    <Container>
      <Body>
        {children}
      </Body>
      <Footer />
    </Container>
  );
}
