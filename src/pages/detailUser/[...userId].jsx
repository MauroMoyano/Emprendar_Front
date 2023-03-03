import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import CardProjectDetail from "../../../components/CardProjectDetail"
import style from "../styles/detail.module.css"
import CardUser from "components/CardUser";
import CardDetail from "components/CardDetail"

import { getDetailProject, getUser, resetDetailProject } from "redux/actions";
export default function Detail (props){
 
       //en el use effect tengo que hacer un dspatch para llenar detail user y detailProject
    //tomar la info del id usuario de lla card project 

    console.log("estas son las props",props);

    let  userId = props.userId
    let  projectId = props.projectId

    useEffect(()=>{
        dispatch(getDetailProject(projectId))
        dispatch(getUser(userId)) 
         return async ()=>{ 
             dispatch(resetDetailProject())
         }
    },[projectId,userId]) 

    
    const selectorProject = useSelector(state=> state.detailProject)
    const selectorUser = useSelector(state => state.detailUsuario)

    const dispatch = useDispatch() 


    const handlerDetailProject = (event,obj)=>{
        console.log("estoye en el handle detail",obj);
        dispatch(getDetailProject(obj.id))
        event.target.id === "signIn" 
        ?  setChecked(!checked)
        : setChecked(false)
    }




    const [checked, setChecked] = useState(false)
    //Con esta funcion manejamos el estado del checkbox si es true mostramos un formulario de Log In si es false de Sign In
    const handlerCheckbox = (event) =>{
        event.target.id === "signIn" 
            ?  setChecked(!checked)
            : setChecked(false)
    }


   
    return(
        <div className={style.ConteinerDetailproject}>
            <CardUser />
            <div>
                <label onClick={handlerCheckbox}  id="logIn" className={style.label} htmlFor="chk" aria-hidden="true">Detalle del Proyecto</label> 
               { Object.keys(selectorProject).length ? 
                 <CardProjectDetail 
                    obj = {selectorProject}
                    />
                    : <>cargando en el detail</>
                }
                <input type="checkbox" className={style.chk} id ="chk" aria-hidden="true" checked={checked}/>
              
               <div className={style.tarjetsProjets}>
                <label onClick={handlerCheckbox}  id="signIn" className={style.label} htmlFor="chk" aria-hidden="true">Más Proyectos</label> 

                 { 
                     selectorUser.userProjects?selectorUser.userProjects.map((obj) => {
                        const {id, title, summary, description, date, goal, img, userId} = obj
                         //enviar este obj al state si es necesario
                        return (
                            <div  onClick={(event)=> handlerDetailProject(event,obj)}  id="logIn" >
                                
                                <CardDetail
                                     key={id}
                                     idProject={id}
                                     name={title}
                                     summary={summary}
                                     description={description}
                                     date={date}
                                     goal={goal}
                                     img=""
                                     userId={userId}
                                 />
                            </div>   
                         )
                     })
                     :null
                     } 
                    </div>
            </div>
        </div>
    )
}
 

export async function getServerSideProps({query}){
    console.log("estas son la squerys",query);
    return {
        props:{
            userId : query.userId[0],
            projectId :query.userId[1]
        }
    }
}