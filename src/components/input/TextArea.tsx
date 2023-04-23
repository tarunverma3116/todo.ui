import React from "react";
import { TextAreaPropsWithoutRef } from "react-html-props";
import { twMerge } from "tailwind-merge";

export interface ITextAreaProps extends TextAreaPropsWithoutRef {}

export const TextArea = React.forwardRef<any, ITextAreaProps>(
  ({ ...props }, ref) => (
    <textarea
      {...props}
      defaultValue={props.defaultValue}
      rows={5}
      cols={5}
      className={twMerge(
        "textarea w-full mx-auto rounded text-black border-2 p-1 focus:outline-none bg-white",
        props.className
      )}
      ref={ref}
    />
  )
);

export default TextArea;
