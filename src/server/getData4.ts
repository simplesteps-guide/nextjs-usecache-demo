"use server";
import { unstable_cacheTag as cacheTag } from "next/cache";
import { unstable_cacheLife as cacheLife } from "next/cache";

// This is the mock data fetch function for the cacheLife page with caching applied.
// there is no dimulated delay as want it quick to show timing differences
// The function takes two numeric values, sums them, and returns the sum along with the current timestamp.
// The data will be cached data if the same number values are passed.
// there is a single 'alltags' cache tag set for this function.

export const getData4 = async (value1: number, value2: number) => {
  // This function is marked with "use cache" to enable caching in Next.js
  "use cache";

  cacheLife({
    stale: 10, // 30 seconds
    revalidate: 20, // 20 seconds
    expire: 30, // 30 seconds
  });

  const sumOfValues = value1 + value2;
  const timeStamp = new Date().toISOString();

  // set the cache tags
  cacheTag("alltags");

  // Return mock data of the sum of the both values and the current timestamp
  return {
    sum: sumOfValues,
    timeStamp: timeStamp,
  };
};
