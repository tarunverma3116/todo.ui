import React, { ReactNode } from "react";
import "react-toastify/dist/ReactToastify.css";
import { UseSpinnerProvider } from "./Spinner";
import { UseUserProvider } from "./UserProvider";

interface Props {
  children?: ReactNode;
}

export const AppProviders = ({ children, ...props }: Props) => {
  return (
    <UseSpinnerProvider>
      <UseUserProvider>{children}</UseUserProvider>
    </UseSpinnerProvider>
  );
};

export default AppProviders;
