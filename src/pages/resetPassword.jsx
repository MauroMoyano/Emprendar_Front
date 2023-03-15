import React, {useState} from "react";
import Link from "next/link";
import clienteAxios from "config/clienteAxios";
const ResetPassword = () => {

    const [email,setEmail] = useState('')

    const [alerta, setAlerta] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(email === "" || email.length < 6) {
            setAlerta({
                msg: "El emial es obligatorio",
                error:true
            })

            return
        }

        
        try {
            const {data} = await clienteAxios.post('//config/resetpassword/', {email})

            setAlerta({
                msg: data.msg,
                error: false
            })
        } catch (error) {
            
        }
    }

  return (
    <div>
      <h1>Recupera tu cuenta y no pierdas tu acceso</h1>

      <form onSubmit={handleSubmit}>
        {alerta && alerta.msg}
        <label htmlFor="emai">Email: </label>
        <input
          type="emial"
          placeholder="Email de registro"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input type="submit" value='Enviar instrucciones' />
      </form>

      <nav>
        <Link href="/">Volver al inicio</Link>
      </nav>
    </div>
  );
};

export default ResetPassword;
