import React,{useState,useEffect} from 'react'

import Link from "next/link";
import clienteAxios from 'config/clienteAxios';

const NewPassword = (props) => {

    const [password,setPassword] = useState('')
    const [verifyPassword, setVerifyPassword] = useState('')
    const [tokenValido, setTokenValido] = useState(false)

    const [alerta, setAlerta] = useState({})

const {token} = props

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        console.log(token)
        clienteAxios.get(`/user/config/resetpassword/${token}`)

        setTokenValido(true)
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      } 
    }

    comprobarToken()
  })



  const handleSubmit = async e => {
    e.preventDefault()
    console.log('enviando')
    if(password !== verifyPassword) {
      setAlerta({
        msg: 'La contraseña deben ser iguales',
        error:false
      })
     
    } else {

 

    try {
     const response = await clienteAxios.post(`/user/config/resetpassword/${token}`, {password})
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  }

return (
    <div>
      <h1>Cambia tu contraseña</h1>
        {alerta&& <p>{alerta.msg}</p>}
        <form onSubmit={handleSubmit}>
        <label htmlFor="">Ingresa tu contraseña</label>
      <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)}  />
      <label htmlFor="" >Repite tu contraseña</label>

      <input type="password" value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)}   />

      <input type='submit' value='Confirmar' />
        </form>
    </div>
  )
}

export default NewPassword


export async function getServerSideProps({ query }) {
  return {
    props: {
      token: query.token,
    
    },
  };
}