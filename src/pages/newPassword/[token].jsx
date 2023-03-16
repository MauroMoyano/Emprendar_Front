import React, { useState, useEffect } from "react";

import Link from "next/link";
import clienteAxios from "config/clienteAxios";
import style from "../styles/newPassword.module.css";
const NewPassword = (props) => {
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [tokenValido, setTokenValido] = useState(false);

  const [alerta, setAlerta] = useState({});

  const { token } = props;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        const response = await clienteAxios.get(
          `/user/config/resetpassword/${token}`
        );
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.error,
          error: true,
        });
      }
    };

    comprobarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("enviando");
    if (password !== verifyPassword) {
      setAlerta({
        msg: "La contraseña deben ser iguales",
        error: false,
      });
    } else {
      try {
        const response = await clienteAxios.post(
          `/user/config/resetpassword/${token}`,
          { password }
        );
        setAlerta({
          msg: response.data.msg,
          error: false,
        });

        setPassword('')
        setVerifyPassword('')
      } catch (error) {
        setAlerta({
          msg: error.response.data.error,
          error: true,
        });
      }
    }
  };

  return (
    <div className={style.container}>
      <h1>Cambia tu contraseña</h1>

      {alerta.msg == "Token invalido" ? (
        <p>Token Invalido</p>
      ) : (
        <form className={style.form} onSubmit={handleSubmit}>
          {alerta && <p>{alerta.msg}</p>}

          <div className={style.inputBox}>
            <label htmlFor="">Ingresa tu contraseña</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={style.inputBox}>
            <label htmlFor="">Repite tu contraseña</label>

            <input
              type="password"
              value={verifyPassword}
              onChange={(e) => setVerifyPassword(e.target.value)}
            />
          </div>

          <input className={style.button} type="submit" value="Confirmar" />
        </form>

      
      )}
      <nav>
        <Link className={style.link} href={'/'}>Volver al inicio</Link>
      </nav>
    </div>
  );
};

export default NewPassword;

export async function getServerSideProps({ query }) {
  return {
    props: {
      token: query.token,
    },
  };
}
