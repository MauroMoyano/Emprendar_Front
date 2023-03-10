import Link from "next/link";
import { useSelector } from "react-redux"
import style from "./styles/rutaDetailUser/cardUser.module.css" 


export default function CardUser({userId}){ 
    const selectorUser = useSelector(state=>state. detailUsuario)
    return(
        <div className={style.cardUser}>
            <div className={style.perfil}>
                <img className={style.img} src={selectorUser.profile_img} alt="" />
            </div>
            <div className={style.detailPerfil}>
                    <h5>{selectorUser.user_name}</h5>
                    <p>Reputacion</p>
                    <p>{selectorUser.reputation}</p>
                     
            </div>
          
        </div>
    )
} 

