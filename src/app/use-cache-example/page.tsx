"use client";

import { getData1 } from "@/server/getData1";
import { getData2 } from "@/server/getData2";
import Link from "next/link";
import { useState } from "react";

const UseCacheExample = () => {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [sum, setSum] = useState<number | null>(null);
  const [launchTime, setLaunchTime] = useState<string | null>(null);
  const [timeStamp, setTimeStamp] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCalculateWithoutCache = async () => {
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
    const result = await getData1(a, b);
    setSum(result.sum);
    setTimeStamp(result.timeStamp);
    setIsLoading(false);
  };

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
    const result = await getData2(a, b);
    setSum(result.sum);
    setTimeStamp(result.timeStamp);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg space-y-6">
        <h1 className="text-2xl font-bold text-center">Use Cache Demo</h1>
        <p className=" text-gray-500 text-xs">
          This page demonstrates the use of caching in Next.js. You can
          calculate the sum of two numbers with and without cache. The calculate
          function has a delay of 3 seconds to show the caching.
        </p>
        <p className=" text-gray-500 text-xs">
          The first button will always fetch fresh data, while the second button
          will use cached data if the same numbers are entered.
        </p>
        <p className=" text-gray-500 text-xs">
          The launch time is the time when the button was clicked, and the
          timestamp is the time when the calculation was performed.
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
          <button
            onClick={handleCalculateWithoutCache}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 disabled:hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition duration-200"
          >
            {isLoading ? "Please wait..." : "Calculate Sum (no cache)"}
          </button>
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
      <Link href="/">
        <button className="absolute top-2 left-2 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg transition duration-200">
          Back to Home
        </button>
      </Link>
    </div>
  );
};
export default UseCacheExample;
