import Link from "next/link";
import { useSelector } from "react-redux"
import style from "../src/pages/styles/detail.module.css"
export default function CardUser({userId}){
    const selectorUser = useSelector(state=>state. detailUsuario)
    return(
        <div className={style.cardUser}>
            <div className={style.perfil}>

                <img src="https://images.ecestaticos.com/E_3gjOzXKgpERrgZvKPeNw9eux4=/0x0:1024x683/600x450/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Fd51%2Fd35%2F17b%2Fd51d3517ba2cc066b0b6170e25e3245b.jpg"alt="" />
            </div>
            <div className={style.detailPerfil}>
                    <h4>Username</h4>
                    <h5>{selectorUser.user_name}</h5>
                    <br />
                    <h4>Nombre</h4>
                    <h5>{selectorUser.name}</h5>
                    <br />
                 
                    <h4>Apellido</h4>
                    <h5>{selectorUser.last_name}</h5>
                    <br />

                    <h4>Email</h4>
                    <h5>{selectorUser.email}</h5>
                    <br />

                    <h4>Reputacion</h4>
                    <p>{selectorUser.reputation}</p>
                    
                     

            </div>
          
        </div>
    )
} 


// <h2>reputacion </h2>
// <h2>email : </h2>
// <h2>nombre: </h2>
// <h2>apellido :</h2>