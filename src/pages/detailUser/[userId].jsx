import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import CardProjectDetail from "../../../components/CardProjectDetail"
import style from "../styles/detail.module.css"
import CardUser from "components/CardUser";
import CardProject from "components/CardProject";

const Detail = () => {
    const router = useRouter()
    const [state,setState] = useState(true)
    const selectorUser = useSelector(state => state.detailUsuario)
    
    //FUNCION QUE TE PERMITE VER TODOS LOS PROYECTOS
    const handlerState = () =>{
        setState(false)
    }    

    const [checked, setChecked] = useState(false)
    //Con esta funcion manejamos el estado del checkbox si es true mostramos un formulario de Log In si es false de Sign In
    const handlerCheckbox = (event) =>{
        event.target.id === "signIn" 
            ?  setChecked(!checked)
            : setChecked(false)
    }

    console.log(state);
    return(
        <div className={style.ConteinerDetailproject}>
            <CardUser />
            <div>
                <label onClick={handlerCheckbox}  id="logIn" className={style.label} htmlFor="chk" aria-hidden="true">Detalle del pryecto</label> 
                <CardProjectDetail />
                <input type="checkbox" className={style.chk} id ="chk" aria-hidden="true" checked={checked}/>
              
               <div className={style.tarjetsProjets}>
                <label onClick={handlerCheckbox}  id="signIn" className={style.label} htmlFor="chk" aria-hidden="true">mas proyecto de este user</label> 

                 {
                     state?selectorUser.userProjects.map(({id, title, summary, description, date, goal, img, userId}) => {
                         return (
                             <CardProject 
                                     key={id}
                                     idProject={id}
                                     name={title}
                                     summary={summary}
                                     description={description}
                                     date={date}
                                     goal={goal}
                                     img={img}
                                     userId={userId}
                                 />
                             
                             
                         )
                     })
                     :null
                     } 
                    </div>
            </div>
        </div>
    )
   
      

}
export default Detail;