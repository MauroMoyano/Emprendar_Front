import Link from "next/link";
import { useDispatch } from "react-redux";
import style from "./styles/CardProject.module.css"
import { getDetailProject, getUser } from "redux/actions";

export default function CardProject(props) {

    const dispatch = useDispatch()

    const formatGoal = (num) => {
        if (!num) {
            return 'No info';
        }

        const exp = /(\d)(?=(\d{3})+(?!\d))/g;
        const rep = '$1,';
        let arr = num.toString().split('.');
        arr[0] = arr[0].replace(exp, rep);
        return arr[1] ? arr.join('.') : arr[0];
    }

    // console.log(props)
    return (
        <div className={style.card}>

            <div className={style.img}>
                <img src={props.img} alt="Imagen del proyecto" />
            </div>
            <div className={style.card_content}>
                <h4 className={style.card_title}>{props.name}</h4>
                <div className={style.card_user}>
                    <img src={props.profile_img} alt="Imagen de usuario" />
                    <p>{props.user_name}</p>
                </div>
                <div className={style.categorias}>
                    {
                        props.categories.map((elem, i) => {
                            return (
                                <p key={i}>- {elem.name}</p>
                            )
                        })
                    }
                </div>
                <p className={style.card_description}>{props.summary}</p>
                <Link href={`/detailUser/${props.userId}/${props.idProject}`}>
                    <button className={style.moreDetail} onClick={() =>
                        dispatch(getUser(props.userId))
                    }>Mas detalles</button>
                </Link>

            </div>
        </div >
    )
}

// <div className={style.divGral}>
//     <Link href={`/detailUser/${props.userId}/${props.idProject}`}>
//         <div className={style.container}>
//             <div className={style.divImg}>
//                 <img src={props.img} alt="Image not found" />
//             </div>
//             <div className={style.containerInfo}>
//                 <div className={style.divInfo}>
//                     <div>
//                         <h1>{props.name[0].toUpperCase() + props.name.slice(1)}</h1>
//                         <p className={style.date}>{props.date}</p>
//                         <h4>{props.summary}</h4>
//                         {/* <p className={style.description}>{props.description}</p> */}

//                     </div>
//                 </div>
//                 <div className={style.theGoal}>
//                     <h3>Objetivo: ${formatGoal(props.goal)}</h3>
//                 </div>
//             </div>
//         </div>
//     </Link>
// </div>