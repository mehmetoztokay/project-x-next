// components/Counter.tsx
"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "@/lib/store";
import { increment, decrement, incrementByAmount } from "@/lib/store/slices/counterSlice";

export const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="flex w-64 flex-col items-center gap-4 rounded-lg border p-4 shadow-md">
      <h1 className="text-2xl font-bold">Counter: {count}</h1>
      <div className="flex gap-2">
        <button className="rounded bg-blue-500 px-4 py-2 text-white" onClick={() => dispatch(increment())}>
          +
        </button>
        <button className="rounded bg-red-500 px-4 py-2 text-white" onClick={() => dispatch(decrement())}>
          -
        </button>
      </div>
      <button className="rounded bg-green-500 px-4 py-2 text-white" onClick={() => dispatch(incrementByAmount(5))}>
        +5
      </button>
    </div>
  );
};
