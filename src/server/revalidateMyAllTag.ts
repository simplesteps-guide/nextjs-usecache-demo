"use server";
import { revalidateTag } from "next/cache";

export const revalidateMyAllTag = async () => {
  // This function is used to revalidate the cache for the "my-all-tag" tag.
  // It will clear all cached data associated with this tag.

  // Use the revalidateTag function from Next.js to clear the cache for "my-all-tag"
  await revalidateTag("my-all-tag");
};
