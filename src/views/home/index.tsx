import { memo, Suspense } from "react";
import styles from "./home.module.scss";
import Sample from "./Sample";
import { ErrorBoundary } from "react-error-boundary";

function Home() {
  return (
    <div
      className={styles.container}
    >
      <main
        className={styles.main}
      >
        <Suspense
          fallback={<></>}
        >
          <ErrorBoundary
            fallback={<></>}
          >
            <Sample />
          </ErrorBoundary>
        </Suspense>
      </main>
    </div>
  );
}

export default memo(Home);
