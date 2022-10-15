import styles from "./index.module.scss";
import classNames from "classnames";
import type { HTMLAttributes } from "react";

function Body({ children, className, ...rest }: Body.Props) {
  return (
    <div
      {...rest}
      className={classNames(className, styles.body)}
    >
      {children}
    </div>
  );
}

namespace Body {
  export interface Props extends HTMLAttributes<HTMLElement> {
  }
}

export default Body;
