import React, { useState } from 'react'
import Layout from 'components/Layout'
import Head from 'next/head'
import Link from 'next/link'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
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
                        
                        <img className={style.imgContainer} src="https://res.cloudinary.com/df4kwquv8/image/upload/v1679490079/emprendar_sources/qghgcdwxrxv4bepioxdv.jpg" alt="contacUsBanner" />
                        
                        <div className={style.barra}>
                            <div className={style.backDiv}>
                                <Link href={"/home"}>
                                    <FontAwesomeIcon icon={faCircleArrowLeft} className={style.theIcon}/>
                                </Link>
                            </div>
                            <div>
                                <h2>CONTACTANOS</h2>
                            </div>
                        </div>

                        <div className={style.card}>
                            <div className={style.contact}> 
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
                </div>
            </Layout>
        </div>
    )
}

