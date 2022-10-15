import { useInfiniteQuery } from "@tanstack/react-query";
import { getFruits } from "./features";

export const useFruits = (options?: {
  queryOptions?: SimpleUseInfiniteQueryOptions<typeof getFruits>;
}) => {
  const {
    queryOptions,
  } = {
    ...options,
  };

  const queryKey = getFruits.key();

  return useInfiniteQuery(queryKey, getFruits, {
    ...queryOptions,
  });
};
