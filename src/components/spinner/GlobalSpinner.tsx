import * as React from "react";
import { useState, useEffect } from "react";
import { useSpinner } from "../../context/Spinner";
import ClipLoader from "react-spinners/ClipLoader";

export default function GlobalSpinner() {
  const spinner = useSpinner();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(spinner.isLoading);
  }, [spinner]);

  return (
    <div className="fixed right-5 bottom-5">
      <ClipLoader color="#562EBB" loading={isLoading} size={50} />
    </div>
  );
}
