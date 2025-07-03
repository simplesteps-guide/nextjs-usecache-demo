"use server";
import { revalidateTag } from "next/cache";

export const revalidateMySpecificTag = async (value1: number) => {
  // This function is used to revalidate the cache for a specific tag based on value1.
  // It will clear all cached data associated with this tag.

  // Use the revalidateTag function from Next.js to clear the cache for "all-val1-xx"
  await revalidateTag(`all-val1-${value1}`);
};
