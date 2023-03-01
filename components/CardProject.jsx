import Link from "next/link";


export default function cardProject(props) {
    const id = props.userId
    return (
        //link a ruta de detailuser paso params userId
        <div>
            <Link href={`/detailUser/${id}`}>
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