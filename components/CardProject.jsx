import Link from "next/link";
import { useDispatch } from "react-redux";
import style from "./styles/CardProject.module.css"
import { getDetailProject, getUser } from "redux/actions";

export default function CardProject(props) {


    return (
        <div  className={style.divGral}>
            <Link href={`/detailUser/${props.userId}/${props.idProject}`}>
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