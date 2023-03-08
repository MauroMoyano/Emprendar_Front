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
                    <div className={style.containerInfo}>
                        <div className={style.divInfo}>
                            <div>
                                <h1>{props.name[0].toUpperCase() + props.name.slice(1)}</h1>
                                <p className={style.date}>{props.date}</p>
                                <h4>{props.summary}</h4>
                                {/* <p className={style.description}>{props.description}</p> */}

                            </div>
                        </div>
                        <div className={style.theGoal}>
                            <h3>Objetivo: ${props.goal}.00</h3>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}