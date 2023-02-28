import {useSelector} from "react-redux";

export default function Home(){

    const selector = useSelector(state => state.pruebaConexion)

    return(
        <div>

            <h1>{selector}</h1>
            <h1>Este es el componente Home</h1>
        </div>
    )
}
