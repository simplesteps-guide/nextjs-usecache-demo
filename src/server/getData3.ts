"use server";
import { unstable_cacheTag as cacheTag } from "next/cache";

// This is the mock data fetch function for the cacheTag page with caching applied.
// It simulates a delay of 3 seconds to mimic a real data fetch operation.
// The function takes two numeric values, sums them, and returns the sum along with the current timestamp.
// The data will be cached data if the same number values are passed.
// however it sets 2 cache tags,
// 1 called 'my-all-tag' which will tag all results and another called 'all-val1-xx' which will tag using value 1's value as part of the tag.

export const getData3 = async (value1: number, value2: number) => {
  // This function is marked with "use cache" to enable caching in Next.js
  "use cache";

  // Simulate a data fetch delay of 3 seconds
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const sumOfValues = value1 + value2;
  const timeStamp = new Date().toISOString();

  // set the cache tags
  cacheTag("my-all-tag", "all-val1-" + value1);

  // Return mock data of the sum of the both values and the current timestamp
  return {
    sum: sumOfValues,
    timeStamp: timeStamp,
  };
};
