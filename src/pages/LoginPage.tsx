import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import "../css/login-register.css";
import { AuthContext } from "../auth/AuthContext";

export const LoginPage = () => {
  //vamos a manejar los valores del formulario d emanera mas profesional asi que es mejor hacer un objeto cons los campos del formulario
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberme: false,
  });
  useEffect(() => {
    const emailLocal = localStorage.getItem("email");
    if (emailLocal) {
      setForm({
        ...form,
        email: emailLocal,
        rememberme: true,
      });
    }
  }, []);

  //definimos el onChane para todos
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    console.log({ name, value });
  };
  //esta funcion es para el check
  const toggleCheck = () => {
    setForm({
      ...form,
      rememberme: !form.rememberme,
    });
    console.log("test");
  };
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //guardamos los datos del form localmente cuando el cliente presione el check
    form.rememberme
      ? localStorage.setItem("email", form.email)
      : localStorage.removeItem("email");
    const res = login(form.email, form.password);
    console.log(res);
  };

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100 p-t-50 p-b-90">
          <form
            className="login100-form validate-form flex-sb flex-w"
            onSubmit={(e) => onSubmit(e)}
          >
            <span className="login100-form-title mb-3">Chat - Ingreso</span>

            <div className="wrap-input100 validate-input mb-3">
              <input
                className="input100"
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={onChange}
              />
              <span className="focus-input100"></span>
            </div>

            <div className="wrap-input100 validate-input mb-3">
              <input
                className="input100"
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={onChange}
              />
              <span className="focus-input100"></span>
            </div>

            <div className="row mb-3">
              <div className="col" onClick={toggleCheck}>
                <input
                  className="input-checkbox100"
                  id="ckb1"
                  type="checkbox"
                  name="rememberme"
                  checked={form.rememberme}
                  // onChange={() => toggleCheck()}
                  readOnly
                />
                <label className="label-checkbox100">Recordarme</label>
              </div>

              <div className="col text-right">
                <Link to="/auth/register" className="txt1">
                  Nueva cuenta?
                </Link>
              </div>
            </div>

            <div className="container-login100-form-btn m-t-17">
              <button className="login100-form-btn">Ingresar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
