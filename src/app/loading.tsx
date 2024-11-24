'use client';

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="w-4 h-4 bg-green-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-4 h-4 bg-yellow-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-4 h-4 bg-red-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.3s" }}
          ></div>
        </div>
      </div>
  );
}
