"use server";
import { revalidateTag } from "next/cache";

export const revalidateCacheLifeTags = async () => {
  // This function is used to revalidate the cache for the "alltags" tag on the cacheLife example page.
  // It will clear all cached data associated with this tag.

  // Use the revalidateTag function from Next.js to clear the cache for "alltags"
  await revalidateTag("alltags");
};
