"use client"; // Crucial directive! We tell Next.js that this component is interactive.

import { useState } from "react";

export default function Counter() {
  // We use the useState hook.
  const [count, setCount] = useState<number>(0);

  return (
    <div className="p-4 border rounded-lg m-4 text-center">
      <p className="text-xl mb-2">Conteo actual: {count}</p>
      <button
        className="bg-yellow-300 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded"
        onClick={() => setCount(count + 1)}
      >
        Incrementar
      </button>
    </div>
  );
}