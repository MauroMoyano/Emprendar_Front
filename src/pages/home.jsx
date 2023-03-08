import Paginated from "../../components/Paginated";
import {useDispatch, useSelector} from "react-redux"
import {filterCategory, filterCountry, getHomeProjects, orderTop} from "../../redux/actions";
import Layout from "../../components/Layout";
import style from "./styles/home.module.css"
import { useEffect } from "react";
import { authedUser } from "../../redux/actions";

export default function Home() {

 

    const user = useSelector(state => state.user)

    console.log(user)

    const dispatch = useDispatch()

  
    useEffect(() => {
       
        const token = localStorage.getItem('token')

            if(token) {
              
                dispatch(authedUser( () => { 
                    router.push('/home')
                 } ))
                  
            }
    }, [dispatch])

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

    const handlerDeleteSearch = () => {
        dispatch(getHomeProjects())
    }
    /////////////////////////  // filtros

    return (
        <Layout>
            
            <div className={style.filtersContainer}>
                <div>
                    <select onChange={handleOrderTop}>
                    <option disabled selected>Highest Donations</option>
                    <option value="Ascendente">Ascendente</option>
                    <option value="Descendente">Descendente</option>
                    </select>
                </div>
                <div>
                    <select onChange={handleFilterCountry}>
                    <option disabled selected>Country</option>
                    {
                        country?.map((c, index) => {
                            return <option value={c} key={index}>{c}</option>
                        })
                    }
                </select>
                </div>

                

                {/*en este filtro se buscara todos los proyectos que coincidan con el pais seleccionado. para eso necesitamos cargar un array con todos los paises disponibles y mapearlos en el select*/}

                <div>
                    <select onChange={handleFilterCategory}>
                    <option disabled selected>Category</option>
                    {
                        category?.map((c, index) => {
                            return <option value={c} key={index}>{c}</option>
                        })
                    }
                    </select>
                </div>
                <div>
                    <button onClick={handlerDeleteSearch}>Delete Search</button>
                </div>

                {/*/////////////////////////////filtros/////////////////////////////*/}
            </div>

            <Paginated/>
        </Layout>
    )
}
