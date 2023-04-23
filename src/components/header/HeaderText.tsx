import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const HeaderText = (props: Props) => {
  return (
    <Link to="/home">
      <p className="text-6xl font-bold text-white">
        TODO
        <span className="text-foreground-primary"> LIST</span>
      </p>
    </Link>
  );
};

export default HeaderText;