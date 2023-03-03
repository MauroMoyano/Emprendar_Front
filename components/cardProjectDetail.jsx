import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "../src/pages/styles/detail.module.css"


export default function CardProjectDetail(props){ 

    const {title,date,description,summary,goal,amount_collected} = props.obj
    if(!Object.keys(props.obj).length){
        return <>cargassssndo</>
    } else {
        return(
            <div className={style.cardDetailProject}>
                <div>
                    <p>TItulo  :{title}</p>
                </div>
                <div>
                    <p>Descripción : {description}</p>
                </div>
                <div>
                    <p>Meta de Dinero :{goal}</p>
                </div>
                <div>
                    <p>Dinero recolectado :{amount_collected}</p>
                </div>
                <div>
                    <p>Fecha de posteo: {date}</p>
                </div>
        </div> 
    )
}
}  