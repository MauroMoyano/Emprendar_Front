import style from "./styles/rutaDetailUser/sugerencias.module.css" 


export default function Sugerencia(){ 
    return(
        <div className={style.card}>
            <div className={style.img_container}>
                <div className={style.img}>
                </div>
                <div className={style.description }>
                    <span className={style.title}>
                        Card
                    </span>
                </div>
            </div>
        </div>
    )
} 
