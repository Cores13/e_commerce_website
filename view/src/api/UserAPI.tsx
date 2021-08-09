import axios from "axios";
import { useState, useEffect } from "react";

type IState = {
  isLogged:
    | (boolean | React.Dispatch<React.SetStateAction<boolean>>)[]
    | (() => (boolean | React.Dispatch<React.SetStateAction<boolean>>)[])
    | boolean;
  isAdmin:
    | (boolean | React.Dispatch<React.SetStateAction<boolean>>)[]
    | (() => (boolean | React.Dispatch<React.SetStateAction<boolean>>)[])
    | boolean;
};
export default function UserAPI(token: any) {
  const [isLogged, setIsLogged] = useState<IState["isLogged"]>(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get("/user/info", {
            headers: { Authorization: token },
          });
          setIsLogged(true);
          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
        } catch (error: any) {
          alert(error.res.data.msg);
        }
      };
      getUser();
    }
  }, [token, isAdmin]);

  try {
    return {
      isLogged: [isLogged, setIsLogged],
      isAdmin: [isAdmin, setIsAdmin],
    };
  } catch (error) {
    alert(error);
  }
}
