import Paginated from "../../components/Paginated";
import {useDispatch, useSelector} from "react-redux"
export default function Home(){

   /* const dispatch = useDispatch()
    // const  = useSelector(state => state)

    const handleFilterLocation = (event) => {
        dispatch(/!*funcion*!/(event.target.value))
    }

    const handleOrderTop = (event) => {
        dispatch(/!*funcion*!/(event.target.value))
    }

    const handleFilterUser = (event) => {
        dispatch(/!*funcion*!/(event.target.value))
    }*/
  /////////////////////////  // filtros

    return(
        <div>
            <h1>Este es el componente Home</h1>

            {/*<select onChange={handleOrderLocation}>
                <option disabled selected>Title</option>
                <option value="Ascendente">Ascendente</option>
                <option value="Descendente">Descendente</option>
            </select>*/}
            {/*en este filtro se buscara todos los proyectos que coincidan con el pais seleccionado. para eso necesitamos cargar un array con todos los paises disponibles y mapearlos en el select*/}


           {/* <select onChange={handleOrderTop}>
                <option disabled selected>highest donations</option>
                <option value="Ascendente">Ascendente</option>
                <option value="Descendente">Descendente</option>
            </select>


            <select onChange={handleFilterUser}>
                <option disabled selected>Diets</option>
                {
                    diets.map((d, index) => {
                        return <option value={d} key={index}>{d}</option>
                    })
                }
            </select>*/}

            {/*/////////////////////////////filtros/////////////////////////////*/}

            <Paginated/>
        </div>
    )
}
