import React, { useEffect, useState } from "react";
import { useIsAuthenticated } from "react-auth-kit";

import { useAuthUser } from "react-auth-kit";
function WrapperComponent({ children }) {
  const [admin, setadmin] = useState(false);
  const auth = useAuthUser();
  const isAuthenticated = useIsAuthenticated();
  useEffect(() => {
   
    if (isAuthenticated()) {
      const adminrole = auth().role;
      setadmin(true);
    } else {
      setadmin(false);
    }
  }, []);

  return <>{admin && children}</>;
}

export default WrapperComponent;
