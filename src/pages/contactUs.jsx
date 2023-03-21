import React, { useState } from 'react'
import Layout from 'components/Layout'
import Head from 'next/head'

import style from './styles/contactUs.module.css'

const contactUs = () => {

    const [input, setInput] = useState({
        name: "",
        email: "",
        message: ""
    })

    const handleSumbit = async (e) => {
        e.preventDefault()


    }

    return (
        <div>
            <Head>
                <title>Contacta con nosotros</title>
            </Head>
            <Layout>

                <div className={style.container}>

                    <div className={style.contact}>
                        <h1>Contacta con nosotros</h1>
                        <img src="https://cdn.pixabay.com/photo/2016/02/07/21/03/computer-1185626_1280.jpg" alt="" />
                    </div>

                    <form className={style.form}>
                        <input type="text" className={style.input} value={input.value} onChange={((e) => { setInput({ ...input, name: e.target.value }) })} placeholder='Tu nombre' />
                        <input type="text" className={style.input} placeholder='Tu mail' value={input.email} onChange={((e) => { setInput({ ...input, email: e.target.value }) })} />

                        <textarea name="" id="" value={input.message}  onChange={((e) => {setInput({...input,message:e.target.value})}) } className={style.textarea} placeholder="Mensaje" cols="30" rows="10"></textarea>

                        <button type="submit">Enviar</button>
                    </form>
                </div>

            </Layout>
        </div>
    )
}

export default contactUs