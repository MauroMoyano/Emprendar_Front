import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "../src/pages/styles/detail.module.css"


export default function CardProjectDetail(props){ 

    const {title,date,description,img,goal,amount_collected} = props.obj
    if(!Object.keys(props.obj).length){
        return <>cargassssndo</>
    } else {
        return(
            <div className={style.cardDetailProject}>
               <div>
                    <div className={style.containerInfo}>
                        <div>
                            <img src={img} alt="" />

                        </div>
                        <div className={style.InfoLessDescription}>
                             <div className={style.title}>
                                <h3>Titulo</h3>
                                <p>{title}</p>
                            </div>
                            <div>
                                <h3>Meta de Dinero</h3>
                                <p>{goal}</p>
                            </div>
                            <div>
                                <h3>Dinero recolectado</h3>
                                <p>{amount_collected}</p>
                            </div>
                            <div>
                                <h3>Fecha de posteo</h3>
                                <p>{date}</p>
                            </div>
                        </div>
                    </div>


                  


                    <div className={style.Description}>
                        <h3>Descripción</h3>
                        <p>{description}</p>
                    </div>
               </div>
  

        </div> 
    )
}
}  