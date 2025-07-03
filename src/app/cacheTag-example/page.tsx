"use client";

import { getData3 } from "@/server/getData3";
import { revalidateMyAllTag } from "@/server/revalidateMyAllTag";
import { revalidateMySpecificTag } from "@/server/revalidateMySpecificTag";
import { useState } from "react";

const CacheTagExample = () => {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [sum, setSum] = useState<number | null>(null);
  const [launchTime, setLaunchTime] = useState<string | null>(null);
  const [timeStamp, setTimeStamp] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCalculateWithCache = async () => {
    const a = parseFloat(num1);
    const b = parseFloat(num2);

    if (isNaN(a) || isNaN(b)) {
      setError("Please enter valid numbers");
      setSum(null);
      return;
    }

    setError(null);
    setIsLoading(true);
    setTimeStamp(null);
    setSum(null);
    setLaunchTime(new Date().toISOString());
    const result = await getData3(a, b);
    setSum(result.sum);
    setTimeStamp(result.timeStamp);
    setIsLoading(false);
  };

  const handleRevalidateAll = async () => {
    revalidateMyAllTag();
    alert("Revalidated all cache tags.");
  };

  const handleRevalidateSpecific = async () => {
    revalidateMySpecificTag(parseFloat(num1));
    alert("Revalidated specific cache tags.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg space-y-6">
        <h1 className="text-2xl font-bold text-center">Cache demo</h1>
        <p className=" text-gray-500 text-xs">
          This page demonstrates the revalidateing tags in NextJS.
        </p>
        <p className=" text-gray-500 text-xs">
          The first red button clears all the cache.
        </p>
        <p className=" text-gray-500 text-xs">
          The second red button clears the cache for a specific tag based on
          value 1.
        </p>
        <div className="flex flex-col gap-4">
          <input
            type="number"
            placeholder="Enter first number"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Enter second number"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-center gap-4">
            <button
              onClick={handleRevalidateAll}
              disabled={isLoading}
              className="w-1/2 bg-red-600 hover:bg-red-700 disabled:hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition duration-200"
            >
              my-all-tag
            </button>
            <button
              onClick={handleRevalidateSpecific}
              disabled={isLoading}
              className="w-1/2 bg-red-600 hover:bg-red-700 disabled:hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition duration-200"
            >
              all-val1-xx
            </button>
          </div>
          <button
            onClick={handleCalculateWithCache}
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700 disabled:hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition duration-200"
          >
            {isLoading ? "Please wait..." : "Calculate Sum (with cache)"}
          </button>
        </div>
        {error && (
          <div className="text-center text-red-600 font-medium">{error}</div>
        )}
        {isLoading && (
          <div className="text-center text-blue-600 font-medium">
            Loading...
          </div>
        )}
        {!isLoading && !error && (
          <div className="text-center text-sm text-gray-500">
            {launchTime && (
              <div>
                Launch Time:{" "}
                <span className="font-medium">
                  {new Date(launchTime).toLocaleString()}
                </span>
              </div>
            )}
            {timeStamp && (
              <div>
                Timestamp:{" "}
                <span className="font-medium">
                  {new Date(timeStamp).toLocaleString()}
                </span>
              </div>
            )}
            {sum !== null && (
              <div>
                Result: <span className="font-medium">{sum}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default CacheTagExample;
