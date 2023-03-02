
import { useSelector } from "react-redux"
import style from "../src/pages/styles/detail.module.css"
export default function CardUser({userId}){
    const selectorUser = useSelector(state=>state. detailUsuario)
    console.log(selectorUser);
    return(
        <div className={style.cardUser}>
            <img src="https://images.ecestaticos.com/E_3gjOzXKgpERrgZvKPeNw9eux4=/0x0:1024x683/600x450/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Fd51%2Fd35%2F17b%2Fd51d3517ba2cc066b0b6170e25e3245b.jpg" alt="" />
            <h1>Usuario : {selectorUser.user_name}</h1>
            <h2>reputacion {selectorUser.reputation}</h2>
            <h2>email : {selectorUser.email}</h2>
            <h2>nombre: {selectorUser.name}</h2>
            <h2>apellido : {selectorUser.last_name}</h2>
        </div>
    )
} 