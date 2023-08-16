import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const useAuth = () => { 
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      var token = sessionStorage.getItem(window.$nombre_session);
      var url = window.$url_api + "/auth/validate";

      if(!token) setIsAuth(false);

      try {
        const res = await axios.post(url, {"token" : token})
        console.log(res);    

        if(res.data.status == 1 && res.data.token.data.user_type_id == 1) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }     
      }
      catch(e) {
        console.log(e);
        setIsAuth(false);
      }

   };
   fetchData();
 }, []);      

  return isAuth;
};

const ProtegerRutasAdmin = () => {
  const isAuth = useAuth();

  if (isAuth === null)
    return null;

  return isAuth ? <Outlet /> : <Navigate to="/ingreso" />;
};

export default ProtegerRutasAdmin;