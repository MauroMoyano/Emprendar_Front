import Link from "next/link";
import { useDispatch } from "react-redux";
import style from "../src/pages/styles/cardProject.module.css"
import { getDetailProject, getUser } from "redux/actions";

export default function cardProject(props) {

    //al tocar una tarjeta tendria que llenar el estado de detailProject de redux despachando la action  
    const dispatch = useDispatch()

    const handlerDetailProject = (idProject) =>{
        dispatch(getDetailProject(idProject))
        dispatch(getUser(props.userId)) 
    } 



    return (
        //link a ruta de detailuser paso params userId
        <div onClick={()=>handlerDetailProject(props.idProject)} className={style.container}>
            <Link href={`/detailUser/${props.userId}`}>
                <h1>{props.index}</h1>
                <h1>{props.name}</h1>
                <h1>{props.summary}</h1>
                <h1>{props.description}</h1>
                <h1>{props.date}</h1>
                <h1>{props.goal}</h1>
                <img src={props.img} alt="Image not found"/>
            </Link>
        </div>
    )
}