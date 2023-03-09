import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmEmail } from "redux/actions";
import Image from "next/image";
import logo from '../../../public/assets/logo.png'
// import { Button } from "bootstrap";
import { useRouter } from "next/router";
import style from '../styles/confirmar.module.css'


export default function Detail(props) {
    const router = useRouter();

    console.log("estas son las props", props);
    //props.token tiene el toqken que pasen por url

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(confirmEmail(props.token))
    }, [])

    const goLanding = () => {
        router.push('/')
    }

    const response = useSelector(state => state.message)

    //'Confirmado correctamente'
    // 'Token no valido
    return (
        <div className={style.divGral}>
            <div className={style.divNav}>
                <Image src={logo} />
            </div>
            {/* <h1>Este es el token: {props.token}</h1> */}

            <div className={style.divInfo}>
                {response === 'Confirmado correctamente' &&
                    <>
                        <h1>Gracias por confirmar su correo electrónico</h1>
                        <button onClick={goLanding} className={style.button}>Iniciar sesión</button>
                    </>
                }

                {response === 'Token no valido' &&
                    <>
                        <h1>Disculpe, no pudimos confirmar <br /> su correo electrónico</h1>
                        <button onClick={goLanding} className={style.button}>Volver a registrarse</button>
                    </>

                }

            </div>

        </div>
    )
}


export async function getServerSideProps({ query }) {
    console.log("query de la url ", query);
    return {
        props: {
            token: query.token
        }
    }
}