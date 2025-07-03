"use client";

import { getData4 } from "@/server/getData4";
import { getData5 } from "@/server/getData5";
import { getData6 } from "@/server/getData6";
import { revalidateCacheLifeTags } from "@/server/revalidateCacheLifeTags";
import { useEffect, useRef, useState } from "react";

const CacheLifeExample = () => {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [sum, setSum] = useState<number | null>(null);
  const [launchTime, setLaunchTime] = useState<string | null>(null);
  const [timeStamp, setTimeStamp] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRow, setSelectedRow] = useState<number | null>(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const tableData = [
    ["10 seconds", "20 seconds", "30 seconds"],
    ["10 seconds", "20 seconds", "20 seconds"],
    ["10 seconds", "10 seconds", "10 seconds"],
  ];

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
    let result = { sum: 0, timeStamp: "" };
    switch (selectedRow) {
      case 0:
        // 10 seconds stale, 20 seconds revalidate, 30 seconds expire
        result = await getData4(a, b);
        break;
      case 1:
        // 10 seconds stale, 20 seconds revalidate, 20 seconds expire
        result = await getData5(a, b);
        break;
      case 2:
        // 10 seconds stale, 10 seconds revalidate, 10 seconds expire
        result = await getData6(a, b);
        break;
      default:
        break;
    }
    setSum(result.sum);
    setTimeStamp(result.timeStamp);
    setIsLoading(false);
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const handleChange = async (index: number) => {
    handleReset();
    setSelectedRow(index);
  };

  const displayInfo = () => {
    switch (selectedRow) {
      case 0:
        alert(
          "Hitting calculate again in:\n" +
            "0-10 seconnds -> Will show cached value\n\n" +
            "10-20 seconds -> Will show cached value but revalidate behind the scenes so hitting again after will show fresh data\n\n" +
            "20-30 seconds -> Will show cached value with no revalidaten\n\n" +
            "30+ seconds -> Will show fresh data"
        );
        break;
      case 1:
        alert(
          "Hitting calculate again in:\n" +
            "0-10 seconnds -> Will show cached value\n\n" +
            "10-20 seconds -> Will show cached value but revalidate behind the scenes so hitting again after will show fresh data\n\n" +
            "20+ seconds -> Will show fresh data"
        );
        break;
      case 2:
        alert(
          "Hitting calculate again in:\n" +
            "0-10 seconnds -> Will show cached value\n\n" +
            "10+ seconds -> Will show fresh data"
        );
        break;
      default:
        break;
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setError(null);
    setIsLoading(false);
    setTimeStamp(null);
    setSum(null);
    setLaunchTime(null);
    setSeconds(0);
    revalidateCacheLifeTags();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg space-y-4">
        <h1 className="text-2xl font-bold text-center">Cache demo</h1>
        <div className="text-4xl font-bold text-red-300 text-center">
          {seconds}{" "}
          <span className="text-sm font-normal text-gray-500">sec</span>
        </div>
        <p className=" text-gray-500 text-xs">
          This page demonstrates the cacheLife in NextJS. (3 second simulated
          delay removed from this page)
        </p>
        <p className=" text-gray-500 text-xs">
          Select one of the predefined cacheLife options. When the option
          changes, it clears the cache tag in the background so it always starts
          fresh.
        </p>
        <p className="text-red-500 text-xs">
          Note: Currently only the revalidate parameter works. so stale and
          expire is ignored. Any time up to the revalidate period will show the
          cached value, after that it will fetch fresh data. I assume thats
          because it is still experimental.
        </p>
        <table className="min-w-full border border-gray-300 shadow-md rounded-md overflow-hidden">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-3 text-left"></th>
              <th className="p-3 text-left">Stale</th>
              <th className="p-3 text-left">Revalidate</th>
              <th className="p-3 text-left">Expire</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr
                key={index}
                className={`${
                  selectedRow === index ? "bg-blue-100" : "bg-white"
                } hover:bg-blue-50 transition`}
              >
                <td className="p-3 border-t">
                  <input
                    type="radio"
                    name="rowSelect"
                    checked={selectedRow === index}
                    onChange={() => handleChange(index)}
                    className="accent-blue-600"
                  />
                </td>
                {row.map((cell, i) => (
                  <td key={i} className="p-3 border-t">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleReset}
            disabled={isLoading}
            className="w-1/2 bg-red-600 hover:bg-red-700 disabled:hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition duration-200"
          >
            Reset / Clear Cache
          </button>
          <button
            onClick={displayInfo}
            disabled={isLoading}
            className="w-1/2 bg-cyan-400 hover:bg-cyan-500 disabled:hover:bg-cyan-400 text-white py-3 rounded-lg font-semibold transition duration-200"
          >
            Info
          </button>
        </div>
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
export default CacheLifeExample;
