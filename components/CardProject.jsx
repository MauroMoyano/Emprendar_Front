import Link from "next/link";
import { useDispatch } from "react-redux";
import style from "../src/pages/styles/cardProject.module.css"
import { getDetailProject, getUser } from "redux/actions";

export default function CardProject(props) {

    //al tocar una tarjeta tendria que llenar el estado de detailProject de redux despachando la action  
    console.log("estas son las props de las card del home",props);
  


    return (
        //link a ruta de detailuser paso params userId
        <div >
            <Link href={`/detailUser/${props.userId}/${props.idProject}`}>
                <h1>{props.name}</h1>
                <h1>{props.summary}</h1>
                <h1>{props.description}</h1>
                <h1>{props.date}</h1>
                <h1>{props.goal}</h1>
                <img src="" alt="Image not found"/>
            </Link>
        </div>
    )
}