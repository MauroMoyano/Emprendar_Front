import React, { useState } from "react";
import Link from "next/link";
import clienteAxios from "config/clienteAxios";
import style from "./styles/resetPassword.module.css";
import logo from '../../public/assets/logo.png';
import Image from "next/image";



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
    <div className={style.divGral}>
      <div className={style.header}>
        <Image className={style.logo} src={logo} alt="logo" />
      </div>
      <div className={style.container}>

        <form className={style.form} onSubmit={handleSubmit}>
          <h1>Recupera tu cuenta</h1>
          <h5>Y no pierdas tu acceso</h5>
          

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
              {alerta && alerta.msg}
        
          <Link className={style.link} href="/">
            Volver al inicio
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
