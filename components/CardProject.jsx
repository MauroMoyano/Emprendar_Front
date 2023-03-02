import Link from "next/link";
import { useDispatch } from "react-redux";
import style from "./styles/CardProject.module.css"
import { getDetailProject, getUser } from "redux/actions";

export default function cardProject(props) {

    //al tocar una tarjeta tendria que llenar el estado de detailProject de redux despachando la action  
    const dispatch = useDispatch()

    const handlerDetailProject = (idProject) => {
        dispatch(getDetailProject(idProject))
        dispatch(getUser(props.userId))
    }



    return (
        //link a ruta de detailuser paso params userId
        <div onClick={() => handlerDetailProject(props.idProject)} className={style.divGral}>
            <Link href={`/detailUser/${props.userId}`}>
                <div className={style.container}>
                    <div className={style.divImg}>
                        <img src={props.img} alt="Image not found" />
                    </div>
                    <div className={style.divInfo}>
                        <h1>{props.name}</h1>
                        <h4>{props.summary}</h4>
                        <p className={style.description}>{props.description}</p>
                        <p className={style.date}>{props.date}</p>
                        <h3>Objetivo: ${props.goal}.00</h3>
                    </div>
                </div>
            </Link>
        </div>
    )
}