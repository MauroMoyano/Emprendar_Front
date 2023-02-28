import { useState } from "react";
import style from "./styles/landing.module.css"
import FormLanding from "components/formLanding/formLanding";
export default function Landing(){



    return(
       <div className={style.all}>
            <div className={style.title}>
                <h1>Emprendar</h1>
            </div>
             <div className={style.container}>
                <div className={style.aboutPage}>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis officia quae veniam ab, nulla, suscipit iste natus deleniti eligendi autem nostrum eum accusamus consequuntur nesciunt assumenda sint maiores quis neque.</p>
                </div>

                <div className={style.user}>
                    <FormLanding />
                </div> 
                
        </div>
       </div>
    )
}


