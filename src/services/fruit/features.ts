import { getSelfClient } from "@/clients";
import type { QueryFunctionContext } from "@tanstack/react-query";
import type { Fruit } from "./types";

const selfClient = getSelfClient();

async function getFruits({
  queryKey,
}: QueryFunctionContext<ReturnType<typeof getFruits["key"]>>): Promise<Fruit[]> {
  const [url] = queryKey;

  const res = await selfClient
    .get<Fruit[]>(url);

  return res.data;
}

namespace getFruits {
  export const key = () => [
    "/api/fruits",
  ] as const;
}

export {
  getFruits,
};
