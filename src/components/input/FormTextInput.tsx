import * as React from "react";
import TextInput, { ITextInputProps } from "./TextInput";
import type { UseFormRegisterReturn } from "react-hook-form";
import PasswordInput from "./PasswordInput";
import TextArea from "./TextArea";
import { twMerge } from "tailwind-merge";

interface IFormTextInputProps extends ITextInputProps {
  register?: () => UseFormRegisterReturn;
  label?: string;
  labelClassname?: string;
  type?: "text" | "password" | "textarea";
  error?: string;
}

interface IFormTextAreaProps extends ITextInputProps {
  register?: () => UseFormRegisterReturn;
  label?: string;
  labelClassname?: string;
  type?: "text" | "password" | "textarea";
  error?: string;
}

const FormTextInput: React.FunctionComponent<IFormTextInputProps> = ({
  register,
  label,
  error,
  type,
  labelClassname,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label
        className={twMerge(
          "block text-white font-semibold uppercase",
          labelClassname
        )}
      >
        {label}
      </label>
      {(type === "text" || type === undefined) && (
        <TextInput
          {...props}
          {...(register && register())}
          className={twMerge(props.className, error && "border-red-300")}
        />
      )}
      {type === "password" && (
        <PasswordInput
          {...props}
          {...(register && register())}
          className={twMerge(props.className, error && "border-red-300")}
        />
      )}
      {type === "textarea" && (
        <TextArea
          defaultValue={props.defaultValue}
          {...(register && register())}
          className={twMerge(props.className, error && "border-red-300")}
        />
      )}
      {error && (
        <span className="text-red-400 font-medium text-sm">{error}</span>
      )}
    </div>
  );
};

export const FormTextArea: React.FunctionComponent<IFormTextAreaProps> = ({
  register,
  label,
  error,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="block text-white font-semibold uppercase">
        {label}
      </label>
      <TextArea
        {...(register && register())}
        className={twMerge(props.className, error && "border-red-300")}
      />
      {error && (
        <span className="text-red-400 font-medium text-sm">{error}</span>
      )}
    </div>
  );
};

export default FormTextInput;
