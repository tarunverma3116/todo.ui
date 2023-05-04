import api from "api/axios";
import React, { createContext, useState, useEffect } from "react";

interface User {
  name: string;
  email: string;
  id: number;
}

interface UserContextValue {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserContextValue>({
  user: null,
  setUser: () => {},
});

const UseUserProvider: React.FC = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

function UseUserProviderWrapper(props: any) {
  return <UseUserProvider {...props} />;
}

export { UseUserProviderWrapper as UseUserProvider };
