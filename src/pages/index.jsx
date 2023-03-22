import { useState, useEffect } from "react";
import style from "./styles/landingExtra.module.css"
import FormLanding from "components/formLanding/formLanding";
import logo from '../../public/assets/logo.png'
import Image from "next/image";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import { authedUser } from "redux/actions";
import { useRouter } from "next/router";
import QandA from "components/QandA";
import AboutUsLanding from "components/aboutUsLanding";
import Link from "next/link";
//imports de iconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentsDollar } from "@fortawesome/free-solid-svg-icons";
import { faHandHoldingDollar } from "@fortawesome/free-solid-svg-icons";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
// console.log(process.env.NEXT_PUBLIC_BACK_APP_URL)



export default function Landing(){


 
    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
       
        const token = localStorage.getItem('token')
            // console.log(token)
            if(token) {
              
                dispatch(authedUser( () => { 
                    router.push('/home')
                 } ))
                  
            }
    }, [dispatch])



    return(
        <>
            <Head>
                <title>Emprendar</title>
            </Head>

            <div className={style.header}>
                <Image className={style.logo} src={logo} alt="logo" />
            </div>

        <div className={style.generalContainer}>
            <div className={style.bodyContainer}>
                    <div className={style.welcomeImageContainer}>
                        {/* <Image className={style.welcomeImage} src={welcomeImage} alt="welcomebanner" priority="true" /> */}
                        <div className={style.formPosition}>
                            <FormLanding />
                        </div>
                    </div>

                    <div className={style.boxIn}>
                                <div className={style.lorems}>
                                    <p>¡Bienvenido a Emprendar! Somos una plataforma de crowdfunding que se enfoca en apoyar y financiar emprendimientos innovadores y prometedores.</p><br/>
                                    <p>En Emprendar, creemos en la creatividad, la pasión y el talento de los emprendedores. Sabemos que empezar un negocio puede ser difícil y costoso, pero también sabemos que las grandes ideas merecen una oportunidad. Por eso, hemos creado una comunidad de personas comprometidas en ayudar a que estas ideas se conviertan en realidad.</p>
                                </div>
                                <div className={style.infoContainer}>
                                    <div className={style.boxOne}>
                                        <FontAwesomeIcon icon={faHandHoldingDollar} className={style.theIcons}/> 
                                        <p>Brindar ayuda</p>
                                    </div>
                                    <div className={style.boxOne}>
                                        <FontAwesomeIcon icon={faCommentsDollar} className={style.theIcons} />
                                        <p>Apoyo de la comunidad</p>
                                    </div>
                                    <div className={style.boxOne}>
                                        <FontAwesomeIcon icon={faCreditCard} className={style.theIcons}/>     
                                        <p>Medios de pagos Online</p>
                                    </div>
                                    <div className={style.boxOne}>
                                        <FontAwesomeIcon icon={faUsers} className={style.theIcons}/>
                                        <p>Feedback de otros usuarios</p>
                                    </div>
                                    <div className={style.boxOne}>
                                        <FontAwesomeIcon icon={faLocationDot} className={style.theIcons} />
                                        <p>Proyectos por país</p>
                                    </div>
                                </div>
                    </div>
                    <div id="about" className={style.aboutUs}>
                        <AboutUsLanding />
                    </div>
                    <div id="questions" className={style.QandABox}>
                        <QandA />
                    </div>
                    <div className={style.copyR}>
                        <div className={style.helperButtons}>
                            <Link href="#about"><button className={style.buttonLevitation}>Acerca de nosotros</button></Link>
                            <Link href="#questions"><button className={style.buttonLevitation}>Preguntas frecuentes</button></Link>
                        </div>
                        <p>Copyright Emprendar 2023 &copy;</p>
                    </div>
            </div>            
        </div>
       </>
    )
}
