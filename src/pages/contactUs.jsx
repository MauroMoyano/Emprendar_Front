import React, { useEffect, useState } from 'react'
import Layout from 'components/Layout'
import Head from 'next/head'
import Link from 'next/link'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import style from './styles/contactUs.module.css'
import clienteAxios from 'config/clienteAxios'
import { useSelector } from 'react-redux';


export default function ContactUs() {

    const User = useSelector(state => state.user )
    useEffect(()=>{

    }, [User])

    const [alert,setAlert] = useState(null)

    let [input, setInput] = useState({
        message: ""
    })

    const handleSumbit = async (e) => {
        e.preventDefault()
        try {
            input.name  = User.user_name
            input.email = User.email
            const response = await clienteAxios.post('/user/contactUs/sendmessage',input)
            setAlert(response.data.msg)

            setInput({
               
                message: ""
            })

        } catch (error) {
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
                                <h2>CONTÁCTANOS</h2>
                            </div>
                        </div>

                        <div className={style.card}>
                            <div className={style.contact}> 
                                <form onSubmit={handleSumbit} className={style.form}>
                                    {alert && <p>{alert}</p>}
                                        <input type="text" className={style.input} value={User?User.user_name:null}   readOnly placeholder='Tu nombre' />
                                        <input type="text" className={style.input} placeholder='Tu mail' value={User?User.email:null}  readOnly />

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

/*export default function ContactUs() {

    const User = useSelector(state => state.user )
    useEffect(()=>{

    }, [User])

    const [alert,setAlert] = useState(null)

    let [input, setInput] = useState({
        name: "",
        message: ""
    })

    const handleSumbit = async (e) => {
        e.preventDefault()
        try {
            input.email = User.email
            const response = await clienteAxios.post('/user/contactUs/sendmessage',input)
            setAlert(response.data.msg)

            setInput({
                name: "",
                message: ""
            })

        } catch (error) {
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
                                <input type="text" className={style.input} placeholder='Tu mail' value={User?User.email:null} readOnly  />

                                <textarea name="" id="" value={input.message}  onChange={((e) => {setInput({...input,message:e.target.value})}) } className={style.textarea} placeholder="Mensaje" cols="30" rows="10"></textarea>

                                <button type="submit">Enviar</button>
                        </form>
                        </div>
                    </div>
                </div>

            </Layout>
        </div>
    ) */