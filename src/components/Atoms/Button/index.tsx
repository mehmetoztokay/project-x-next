import { Spinner } from "@/components/Spinner";
import { combineClass } from "@/helpers/development/combineClass";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text?: string;
  isPending?: boolean;
};

export const Button = ({ className, text = "", isPending = false, ...props }: ButtonProps) => {
  return (
    <button
      className={combineClass(
        "flex select-none items-center gap-2 rounded-md bg-blue-200 px-4 py-2 transition duration-100 ease-in-out hover:bg-blue-300 disabled:pointer-events-none",
        className,
        {
          "bg-blue-50": isPending,
        },
      )}
      {...props}
      disabled={isPending}
    >
      {isPending ? (
        <>
          <Spinner /> {text}
        </>
      ) : (
        text
      )}
    </button>
  );
};
