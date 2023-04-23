import React from "react";
import { useContext, useMemo, useState } from "react";

const UseSpinnerContext = React.createContext<any>(null);

const useSpinner = () => {
  const spinnerContext = useContext(UseSpinnerContext);

  if (spinnerContext === null) {
    throw new Error(
      "useSpinner() can only be used inside of <UseSpinnerProvider />, " +
        "please declare it at a higher level."
    );
  }

  const { spinner } = spinnerContext;

  return useMemo(() => {
    return spinner;
  }, [spinner]);
};

const UseSpinnerProvider: React.FC<{}> = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const spinnerContext = useContext(UseSpinnerContext);

  if (spinnerContext !== null) {
    throw new Error("<UseSpinnerContext /> has already been declared.");
  }
  const [isLoading, setIsLoading] = useState<any>(false);
  // eslint-disable-next-line
  const setLoadingState = (loading: any): any => {
    setIsLoading(loading);
  };
  const spinner = useMemo(
    () => ({
      isLoading,
      setLoadingState,
    }),
    [isLoading, setLoadingState]
  );

  return (
    <UseSpinnerContext.Provider
      value={{
        spinner,
      }}
    >
      {children}
    </UseSpinnerContext.Provider>
  );
};

function UseSpinnerProviderWrapper(props: any) {
  return <UseSpinnerProvider {...props} />;
}

export const withSpinner = (Component: any) => {
  return (props: any) => {
    const spinner = useSpinner();

    return <Component spinner={spinner} {...props} />;
  };
};

export { UseSpinnerProviderWrapper as UseSpinnerProvider, useSpinner };
