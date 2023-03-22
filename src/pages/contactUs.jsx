import React, { useState } from 'react'
import Layout from 'components/Layout'
import Head from 'next/head'
import Link from 'next/link'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownWideShort , faHouse} from "@fortawesome/free-solid-svg-icons";
import style from './styles/contactUs.module.css'
import clienteAxios from 'config/clienteAxios'


export default function ContactUs() {


    const [alert,setAlert] = useState(null)

    const [input, setInput] = useState({
        name: "",
        email: "",
        message: ""
    })

    const handleSumbit = async (e) => {
        e.preventDefault()

        try {
          const response = await clienteAxios.post('/user/contactUs/sendmessage',input)

          setAlert(response.data.msg)

          setInput({
            name: "",
            email: "",
            message: ""
          })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div >
            <Head>
                <title>Contacta con nosotros</title>
            </Head>
            <Layout>
                <div className={style.fatherContainer}>
                    <div className={style.container}>
                        <div className={style.button}>
                            <Link href="/home"><button className={style.buttonBack}><FontAwesomeIcon icon={faHouse} className={style.theIcon} /> HOME</button></Link>
                        </div>

                        <div className={style.card}>
                        <div className={style.contact}>                  
                            <h1>Contacta con nosotros</h1>
                            <img src="https://cdn.pixabay.com/photo/2016/02/07/21/03/computer-1185626_1280.jpg" alt="" />
                        </div>

                        <form onSubmit={handleSumbit} className={style.form}>
                            {alert && <p>{alert}</p>}
                                <input type="text" className={style.input} value={input.name} onChange={((e) => { setInput({ ...input, name: e.target.value }) })} placeholder='Tu nombre' />
                                <input type="text" className={style.input} placeholder='Tu mail' value={input.email} onChange={((e) => { setInput({ ...input, email: e.target.value }) })} />

                                <textarea name="" id="" value={input.message}  onChange={((e) => {setInput({...input,message:e.target.value})}) } className={style.textarea} placeholder="Mensaje" cols="30" rows="10"></textarea>

                                <button type="submit">Enviar</button>
                        </form>
                        </div>
                    </div>
                </div>

            </Layout>
        </div>
    )
}

