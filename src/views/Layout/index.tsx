import styles from "./index.module.scss";
import type { ReactNode } from "react";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

function Layout({ children, excludeHeader, excludeFooter }: Layout.Props) {
  return (
    <div
      className={styles.layout}
    >
      {
        excludeHeader || (
          <Header />
        )
      }
      <Body
        className={styles.body}
      >
        {children}
      </Body>
      {
        excludeFooter || (
          <Footer />
        )
      }
    </div>
  );
}

namespace Layout {
  export interface Props {
    children?: ReactNode;
    excludeHeader?: boolean;
    excludeFooter?: boolean;
  }
}

export default Layout;
