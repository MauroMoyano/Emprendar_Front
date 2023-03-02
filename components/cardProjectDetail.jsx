import { useDispatch, useSelector } from "react-redux";
import style from "../src/pages/styles/detail.module.css"
import { resetDetailProject } from "redux/actions";
export default function CardProjectDetail(){ 
    //tomar datos directamente del estado de redux
    const selector = useSelector(state=>state.detailProject)
    //despachar action para  borrar estado de redux detailproject
    const dispatch = useDispatch()

    // const handlerResetProject = () =>{
    //     dispatch(resetDetailProject())
    // }
 
    /* */ 
    return(
        <div className={style.cardDetailProject}>
         
            <p>TItulo  :{selector.title}</p>
            <p>Fecha de subida : {selector.date}</p>
            <p>Description : {selector.description}</p>
            <p>Summary :{selector.summary}</p>
            <p>Meta de Dinero :{selector.goal}</p>
            <p>Dinero recolectado :{selector.amount_collected}</p>
        </div> 
    )
}  