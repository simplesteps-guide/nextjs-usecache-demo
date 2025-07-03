"use server";

// This is the mock data fetch function for the use-cache-example page with no caching applied.
// It simulates a delay of 3 seconds to mimic a real data fetch operation.
// The function takes two numeric values, sums them, and returns the sum along with the current timestamp.
// The data is always fresh as no caching is applied.

export const getData1 = async (value1: number, value2: number) => {
  // Simulate a data fetch delay of 3 seconds
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const sumOfValues = value1 + value2;
  const timeStamp = new Date().toISOString();

  // Return mock data of the sum of the both values and the current timestamp
  return {
    sum: sumOfValues,
    timeStamp: timeStamp,
  };
};
