
export default function CardDetail(props) {

    return (
        //link a ruta de detailuser paso params userId
        <div>
                <h1>{props.name}</h1>
                <h1>{props.summary}</h1>
                <h1>{props.date}</h1>
                <img src={props.img} alt="Image not found"/>
          
        </div>
    )
}