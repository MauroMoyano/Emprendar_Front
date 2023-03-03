import Paginated from "../../components/Paginated";
import {useDispatch, useSelector} from "react-redux"
import {filterCategory, filterCountry, getHomeProjects, orderTop} from "../../redux/actions";
import Layout from "../../components/Layout";

export default function Home() {

    const dispatch = useDispatch()
    const category = useSelector(state => state.category)
    const country = useSelector(state => state.country)

    const handleFilterCountry = (event) => {
        dispatch(filterCountry(event.target.value))
    }

    const handleOrderTop = (event) => {
        dispatch(orderTop(event.target.value))
    }

    const handleFilterCategory = (event) => {
        dispatch(filterCategory(event.target.value))
    }

    const handlerDeleteSearch = (event) => {
        dispatch(getHomeProjects())
    }
    /////////////////////////  // filtros

    return (
        <Layout>
            <h1>Este es el componente Home</h1>

            <select onChange={handleOrderTop}>
                <option disabled selected>Highest Donations</option>
                <option value="Ascendente">Ascendente</option>
                <option value="Descendente">Descendente</option>
            </select>

            <select onChange={handleFilterCountry}>
                <option disabled selected>Country</option>
                {
                    country?.map((c, index) => {
                        return <option value={c} key={index}>{c}</option>
                    })
                }
            </select>

            {/*en este filtro se buscara todos los proyectos que coincidan con el pais seleccionado. para eso necesitamos cargar un array con todos los paises disponibles y mapearlos en el select*/}

            <select onChange={handleFilterCategory}>
                <option disabled selected>Category</option>
                {
                    category?.map((c, index) => {
                        return <option value={c} key={index}>{c}</option>
                    })
                }
            </select>
            <button onClick={handlerDeleteSearch}>Delete Search</button>

            {/*/////////////////////////////filtros/////////////////////////////*/}

            <Paginated/>
        </Layout>
    )
}
