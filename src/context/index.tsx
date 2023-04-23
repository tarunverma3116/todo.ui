import React, { ReactNode } from "react";
import "react-toastify/dist/ReactToastify.css";
import { UseSpinnerProvider } from "./Spinner";

interface Props {
  children?: ReactNode;
}

export const AppProviders = ({ children, ...props }: Props) => {
  return <UseSpinnerProvider>{children}</UseSpinnerProvider>;
};

export default AppProviders;
