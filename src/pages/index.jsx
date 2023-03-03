import { useState, useEffect } from "react";
import style from "./styles/landing.module.css"
import FormLanding from "components/formLanding/formLanding";
import logo from '../../public/assets/logo.png'
import Image from "next/image";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import { authedUser } from "redux/actions";
import { useRouter } from "next/router";

export default function Landing(){

    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
       
        const token = localStorage.getItem('token')

            if(token) {
              
                dispatch(authedUser()).then(() => {
                    router.push("/home");
                  });
            }
    }, [dispatch])

    return(
        <>
        <Head>
        <title>Emprendar</title>
             </Head>

       <div className={style.all} style={{fontFamily: 'sans-serif'}}>
            <div className={style.logo}>

                <Image src={logo}  />

            </div>
            
             <div className={style.container}>
                <div className={style.aboutPage}>
                    <p>¡Bienvenido a Emprendar! Somos una plataforma de crowdfunding que se enfoca en apoyar y financiar emprendimientos innovadores y prometedores.</p>

                    <p>En Emprendar, creemos en la creatividad, la pasión y el talento de los emprendedores. Sabemos que empezar un negocio puede ser difícil y costoso, pero también sabemos que las grandes ideas merecen una oportunidad. Por eso, hemos creado una comunidad de personas comprometidas en ayudar a que estas ideas se conviertan en realidad.</p>
                </div>

                <div className={style.user}>
                    <FormLanding />
                </div> 
                
        </div>
       </div>
       </>
    )
}


