import Link from "next/link";
import { useSelector } from "react-redux"
import style from "../src/pages/styles/detail.module.css"
export default function CardUser({userId}){
    const selectorUser = useSelector(state=>state. detailUsuario)
    return(
        <div className={style.cardUser}>
            <div className={style.perfil}>
            <button>
                <Link  href={`/home`} >Inicio</Link>
            </button>
                <img src="https://images.ecestaticos.com/E_3gjOzXKgpERrgZvKPeNw9eux4=/0x0:1024x683/600x450/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Fd51%2Fd35%2F17b%2Fd51d3517ba2cc066b0b6170e25e3245b.jpg"alt="" />
                <h1>{selectorUser.user_name}</h1>
            </div>
            <div className={style.detailPerfil}>
                <div className={style.campos}>
                    <p className={style.datos}>Nombre :</p>
                    <h3>{selectorUser.name}</h3>
                </div>

                <div className={style.campos}>
                    <p className={style.datos}>Apellido :</p>
                    <h3> {selectorUser.last_name}</h3>
                </div>

                <div className={style.campos}>
                    <p className={style.datos}>Reputacion :</p>
                    <h3>{selectorUser.reputation}</h3>
                </div>

                <div  className={style.campos}>
                    <p className={style.datos}>Email :</p>
                    <h3>{selectorUser.email}</h3>
                </div>

            </div>
          
        </div>
    )
} 


// <h2>reputacion </h2>
// <h2>email : </h2>
// <h2>nombre: </h2>
// <h2>apellido :</h2>