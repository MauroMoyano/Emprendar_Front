import { useEffect } from "react"
import style from "./styles/rutaDetailUser/sugerencias.module.css" 
import axios from "axios";
import clienteAxios from "config/clienteAxios";
import { useDispatch, useSelector } from "react-redux";
import { similares } from "redux/actions";


   


export  function CardSugerencia(){
    return(<div className={style.card}>
            <div className={style.img_container}>
                <div className={style.img}></div>
                <div className={style.description }>
                    <span className={style.title}>
                        Card
                    </span>
                </div>
            </div>
        </div>
)}




export default function Sugerencia(){ 
 

    return(  <div className={style.sugerencias}> 
        <div>
            <h3>PROYECTOS SIMILARES</h3>
            <div className={style.containerSug} >
              <CardSugerencia />
              <CardSugerencia />
              <CardSugerencia />
                
            </div>
        </div>
    </div>


        
    )
} 
