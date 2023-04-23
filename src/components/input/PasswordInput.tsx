import React, { useState } from "react";
import { InputPropsWithoutRef } from "react-html-props";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { twMerge } from "tailwind-merge";

interface IPasswordInputProps extends InputPropsWithoutRef {}

const PasswordInput = React.forwardRef<any, IPasswordInputProps>(
  ({ type, className, ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const toggleVisibility = () => setIsPasswordVisible((v) => !v);

    return (
      <div className="relative">
        <input
          {...props}
          type={isPasswordVisible ? "text" : "password"}
          className={twMerge(
            "input w-full bg-white mx-auto rounded text-black border-2 p-3 focus:outline-none",
            className
          )}
          ref={ref}
        />
        <button
          className="absolute inset-y-0 right-4 flex items-center text-black/50"
          onClick={toggleVisibility}
          type="button"
        >
          <span className="mx-2">{isPasswordVisible ? "hide" : "show"} </span>
          {isPasswordVisible ? (
            <AiOutlineEyeInvisible className="h-6 w-auto" />
          ) : (
            <AiOutlineEye className="h-6 w-auto" />
          )}
        </button>
      </div>
    );
  }
);

export default PasswordInput;
