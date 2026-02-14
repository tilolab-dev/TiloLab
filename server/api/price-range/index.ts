import { defineEventHandler } from "h3";
import { getPriceRange } from "@/server/services/productsServices";

export default defineEventHandler((event) => {
  return getPriceRange(event);
});
