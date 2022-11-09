import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";

import "../../css/login-register.css";

export const RegisterPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  //definimos el onChane para todos
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    console.log({ name, value });
  };
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register(form.name, form.email, form.password);
  };
  const { register } = useContext(AuthContext);
  return (
    <div className="limiter" id="recomendations">
      <div className="container-login100">
        <div className="wrap-login100 p-t-50 p-b-90">
          <form
            className="login100-form validate-form flex-sb flex-w"
            onSubmit={(e) => onSubmit(e)}
          >
            <span className="login100-form-title mb-3">¡Registrate ahora!</span>

            <div className="wrap-input100 validate-input mb-3">
              <input
                className="input100"
                type="text"
                name="name"
                placeholder="Nombre"
                value={form.name}
                onChange={onChange}
              />
              <span className="focus-input100"></span>
            </div>

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
              <div className="col text-right">
                <Link to="/auth/login" className="txt1">
                  Ya tienes cuenta?
                </Link>
              </div>
            </div>

            <div className="container-login100-form-btn m-t-17">
              <button className="login100-form-btn">Crear cuenta</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
