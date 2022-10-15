import { useFruits } from "@/services/fruit";
import Link from "next/link";
import { memo, useMemo } from "react";
import styles from "./sample.module.scss";

function Sample() {
  const {
    data: fruitResultPages,
  } = useFruits({
    queryOptions: {
      suspense: true,
    },
  });

  const fruits = useMemo(() => fruitResultPages?.pages.flatMap((page) => page), [fruitResultPages]);

  return (
    <div className={styles.grid}>
      {
        fruits?.map(({ id, name }) => (
          <Link
            key={id}
            href={`https://www.google.com/search?q=${name}`}
          >
            <a
              className={styles.card}
            >
              <h2>{name}</h2>
            </a>
          </Link>
        ))
      }
    </div>
  );
}

export default memo(Sample);
