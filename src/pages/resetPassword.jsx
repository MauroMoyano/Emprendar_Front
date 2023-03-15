import React, { useState } from "react";
import Link from "next/link";
import clienteAxios from "config/clienteAxios";
import style from "./styles/resetPassword.module.css";
const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || email.length < 6) {
      setAlerta({
        msg: "El email es obligatorio",
        error: true,
      });

      return;
    }

    try {
      const { data } = await clienteAxios.post("/user/config/resetpassword", {
        email,
      });
      setAlerta({
        msg: data.msg,
        error: false,
      });

      setEmail('')
    } catch (error) {}
  };

  return (
    <div className={style.container}>
      <h1>Recupera tu cuenta y no pierdas tu acceso</h1>

      <form className={style.form} onSubmit={handleSubmit}>
        {alerta && alerta.msg}

        <div className={style.inputBox}>
          <label htmlFor="emai">Email: </label>
          <input
            type="email"
            placeholder="Email de registro"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
       
        </div>

        <input className={style.button} type="submit" value="Enviar instrucciones" />
      </form>

      <nav className=''>
        <Link className={style.link} href="/">
          Volver al inicio
        </Link>
      </nav>
    </div>
  );
};

export default ResetPassword;
