import Paginated from "../../components/Paginated";
import {useDispatch, useSelector} from "react-redux"
import {orderTop} from "../../redux/actions";
import Layout from "../../components/Layout";

export default function Home() {

    const dispatch = useDispatch()
    // const  = useSelector(state => state)

    /*const handleFilterLocation = (event) => {
        dispatch(/!*funcion*!/(event.target.value))
    }*/

    const handleOrderTop = (event) => {
        dispatch(orderTop(event.target.value))
    }

    /*const handleFilterCategory = (event) => {
        dispatch(filterCategory(event.target.value))
    }*/
    /////////////////////////  // filtros

    return (
        <Layout>
            <h1>Este es el componente Home</h1>

            {/*<select onChange={handleOrderLocation}>
                <option disabled selected>Title</option>
                <option value="Ascendente">Ascendente</option>
                <option value="Descendente">Descendente</option>
            </select>*/}
            {/*en este filtro se buscara todos los proyectos que coincidan con el pais seleccionado. para eso necesitamos cargar un array con todos los paises disponibles y mapearlos en el select*/}


            <select onChange={handleOrderTop}>
                <option disabled selected>highest donations</option>
                <option value="Ascendente">Ascendente</option>
                <option value="Descendente">Descendente</option>
            </select>


            {/*<select onChange={handleFilterCategory}>
                <option disabled selected>Category</option>
                {
                    diets.map((d, index) => {
                        return <option value={d} key={index}>{d}</option>
                    })
                }
            </select>*/}

            {/*/////////////////////////////filtros/////////////////////////////*/}

            <Paginated/>
        </Layout>
    )
}
