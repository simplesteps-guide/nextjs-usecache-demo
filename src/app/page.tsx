import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg space-y-6">
        <h1 className="text-2xl font-bold text-center">Cache demo</h1>
        <p className=" text-gray-500 text-xs">
          This page demonstrates the use of caching in Next.js.
        </p>
        <div className="flex flex-col gap-8">
          <Link href="/use-cache-example">
            <button className="w-full bg-blue-600 hover:bg-blue-700  text-white py-3 rounded-lg font-semibold transition duration-200">
              Use Cache Demo
            </button>
          </Link>
          <Link href="/cacheTag-example">
            <button className="w-full bg-amber-400 hover:bg-amber-500  text-white py-3 rounded-lg font-semibold transition duration-200">
              cacheTag Demo
            </button>
          </Link>
          <Link href="/cacheLife-example">
            <button className="w-full bg-green-600 hover:bg-green-700  text-white py-3 rounded-lg font-semibold transition duration-200">
              cacheLife Demo
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
