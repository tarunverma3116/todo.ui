import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

type Props = {};

const Layout = (props: Props) => {
  const navigate = useNavigate();
  useEffect(() => {
    const item = localStorage.getItem("access_token");
    if (item) {
      navigate("/home");
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col flex-grow max-h-full max-w-full">
      <Outlet />
    </div>
  );
};

export default Layout;
