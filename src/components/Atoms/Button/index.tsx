import {Spinner} from "@/components/Spinner";
import {combineClass} from "@/helpers/development/combineClass";
import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {text?: string; isPending?: boolean};

export const Button = ({className, text = "", isPending = false, ...props}: ButtonProps) => {
  return (
    <button
      className={combineClass(
        "bg-blue-200 py-2 px-4 rounded-md hover:bg-blue-300 transition duration-100 ease-in-out disabled:pointer-events-none select-none flex items-center gap-2",
        className,
        {
          "bg-blue-50": isPending,
        }
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
