import Link from "next/link";


export default function cardProject(props) {
    return (
        //link a ruta de detailuser paso params userId
        <div>
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