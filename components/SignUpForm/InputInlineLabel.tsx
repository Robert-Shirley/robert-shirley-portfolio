import classNames from "@/functions/classNames";
import * as React from "react";
import { Input } from "./Input";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
}

const InputInlineLabel = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, placeholder, className, type, ...props }, ref) => {
    return (
      <div
        className={classNames(
          "flex flex-col h-fit w-full rounded-md border border-gray-700 bg-background px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
      >
        {label && <label className="text-gray-600 px-3">{label}</label>}
        <Input
          type={type}
          className="w-full bg-white py-2 border-none ring-0 focus:ring-0 focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 text-lg"
          ref={ref}
          placeholder={placeholder}
          {...props}
        />
      </div>
    );
  }
);
InputInlineLabel.displayName = "Input";

export { InputInlineLabel };
