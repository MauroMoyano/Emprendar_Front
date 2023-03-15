import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./styles/cardProjectDetail.module.css"


export default function CardProjectDetail(props){ 

    const {title,date,description,img,goal,amount_collected} = props.obj

    if(!Object.keys(props.obj).length){
        return <>cargando</>
    } else {
        return(
            <div className={style.conteiner}>

                    <div className={style.containerInfo}>
                        <div className={style.container_photo}> 
                            <img className={style.img} src={img} alt="" />

                        </div>
                        <div className={style.InfoLessDescription}>
                             <div className={style.title}>
                                <h2>{title}</h2>
                            </div>
                            <div className={style.extra_info}>
                                <div className={style.date}>
                                    <h3 >Fecha de posteo</h3>
                                    <p>{date}</p>
                                </div>
                                <div>
                                    {/* <h3>Comentarios</h3>
                                    <p>56</p> */}
                                </div>

                                <div className={style.cash}>
                                    <div >
                                        <h3>Meta de Dinero</h3>
                                        <p>${goal}</p>
                                    </div>
                                    <div>
                                        <h3>Dinero recolectado</h3>
                                        <p>${amount_collected}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className={style.description}>
                        <h3>Descripción</h3>
                        <p className={style.description_text}>{description}
                        

                     
                        </p>
                    </div>  
        </div> 
    )
}
}  