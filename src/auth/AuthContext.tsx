import {
  createContext,
  useCallback,
  useState,
  useEffect,
  useContext,
} from "react";
import { useNavigate } from "react-router-dom";
import swal, { SweetAlertResult } from "sweetalert2";

import { apiChat } from "../api/ApiChat";
import { LoginResponse } from "../interfaces/models";
import { Loading } from "../components/Loading";
import { ChatContext } from "../context/chat/ChatContext";

export type InitialState = {
  uid: string | null;
  checking: boolean;
  logged: boolean;
  name: string | null;
  email: string | null;
  image?: string | null;
};
const initialState: InitialState = {
  uid: null,
  checking: true,
  logged: false,
  name: null,
  email: null,
  image: null,
};
export type AuthContextProps = {
  auth: InitialState;
  login: (
    email: string,
    password: string
  ) => Promise<SweetAlertResult<any> | undefined>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<SweetAlertResult<any> | undefined>;
  checkToken: () => Promise<void>;
  logout: () => void;
};
export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [auth, setAuth] = useState<InitialState>(initialState as InitialState);
  const [isLoading, setIsLoading] = useState<boolean>();
  const Navigate = useNavigate();
  const { cleanMessages, chatState } = useContext(ChatContext);

  const login = async (
    email: string,
    password: string
  ): Promise<SweetAlertResult<any> | undefined> => {
    try {
      setIsLoading(true);
      const res = await apiChat.post<LoginResponse>("/login", {
        email: email,
        password: password,
      });
      setIsLoading(false);
      if (res.data.ok) {
        localStorage.setItem("token", res.data.token);
        const { uid, nombre, email, image } = res.data.usuario;
        setAuth({
          uid: uid,
          checking: false,
          logged: true,
          name: nombre,
          email: email,
          image: image,
        });
        // navigate("/messages", {});
        console.log(auth);
        console.log(res.data.ok);
      }
    } catch (error) {
      // console.log(JSON.stringify(error));
      if (!email || !password) {
        setIsLoading(false);
        return swal.fire("Error", "Los campos estan vacios", "info");
      }
      setIsLoading(false);
      swal.fire("Error", "Verifique usuario o contraseña", "error");
      console.log(auth);
    }
  };
  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<SweetAlertResult<any> | undefined> => {
    try {
      setIsLoading(true);
      const res = await apiChat.post<LoginResponse>("/login/register", {
        nombre: name,
        email: email,
        password: password,
      });
      console.log(res.data);
      setIsLoading(false);
      if (res.data.ok) {
        localStorage.setItem("token", res.data.token);
        const { uid, nombre, email } = res.data.usuario;
        setAuth({
          uid: uid,
          checking: false,
          logged: true,
          name: nombre,
          email: email,
        });
      }
      Navigate("/messages");
    } catch (error) {
      if (!email || !password || !name) {
        setIsLoading(false);
        return swal.fire("Error", "Los campos estan vacios", "info");
      }
      setIsLoading(false);
      swal.fire("Error", "El usuario ya existe", "error");
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    Navigate("/auth/login");
    setAuth({
      uid: null,
      checking: false,
      logged: false,
      name: null,
      email: null,
      image: null,
    });
    cleanMessages(chatState);
  };
  // useCallback para que guarde solo en memoria y no desborde el sistema
  const checkToken = useCallback(async (): Promise<void> => {
    const token = localStorage.getItem("token");
    if (!token) {
      return setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
        image: null,
      });
    }
    //pero si el token existe lo renovamos
    const res = await apiChat.get<LoginResponse>("/login/renew");
    if (res.data.ok) {
      localStorage.setItem("token", res.data.token);
      const { uid, nombre, email, image } = res.data.usuario;
      console.log(res.data.usuario.image);
      console.log("token renovado");
      return setAuth({
        uid: uid,
        checking: false,
        logged: true,
        name: nombre,
        email: email,
        // image: image,
      });
    } else {
      console.log("token no valido");
      return setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        email: null,
      });
    }
  }, []);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  useEffect(() => {
    if (auth.logged) {
      return Navigate("/messages");
    } else {
      return Navigate("/auth/login");
    }
  }, [auth.logged]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={{ auth, login, register, logout, checkToken }}>
      {children}
    </AuthContext.Provider>
  );
};
