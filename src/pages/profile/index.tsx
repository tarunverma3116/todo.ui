import HeaderText from "components/header/HeaderText";
import { UserContext } from "context/UserProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SecondaryButton } from "components/button/Button";
import { MdLogout } from "react-icons/md";

type Props = {};

const Profile = (props: Props) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col gap-6">
      <HeaderText />
      {user && (
        <div>
          <p className="title-text">Name:{user.name}</p>
          <p className="title-text">Email:{user.email}</p>
        </div>
      )}
      <SecondaryButton
        className="flex items-center gap-2 mx-auto"
        onClick={() => {
          localStorage.removeItem("access_token");
          navigate("/login");
        }}
      >
        Logout
        <MdLogout />
      </SecondaryButton>
    </div>
  );
};

export default Profile;
