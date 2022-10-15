import fruits from "@/assets/fruits.json";
import type { Fruit } from "@/services/fruit";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse<Fruit[]>) {
  res.status(200).json(fruits);
}
