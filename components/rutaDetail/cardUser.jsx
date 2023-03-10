import Link from "next/link";
import { useSelector } from "react-redux"
import style from "./styles/cardUser.module.css" 


export default function CardUser({userId}){ 
    const selectorUser = useSelector(state=>state. detailUsuario)

    if(!Object.keys(selectorUser).length){
        return(
            <>cargando</>
        )
    } else {
        return(
            <div className={style.cardUser}>
                <div className={style.perfil}>
                    <img className={style.img} src={selectorUser.profile_img} alt="" />
                </div>
                <div className={style.detailPerfil}>
                        <h5>{selectorUser.user_name.substring(0, 5)+"..."}</h5>
                        <p>Reputacion</p>
                        <p>{selectorUser.reputation}</p>
                         
                </div>
              
            </div>
        )
    }

  
} 

