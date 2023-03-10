import Paginated from "../../components/Paginated";
import {useDispatch, useSelector} from "react-redux"
import {chargeState, filterCategory, filterCountry, getHomeProjects, orderTop} from "../../redux/actions";
import Layout from "../../components/Layout";
import style from "./styles/home.module.css"
import {useState} from "react";
import clienteAxios from "../../config/clienteAxios";

export default function Home() {

    const [filtros, setFiltros] = useState(
        {
            orden: null,
            country: null,
            category: null
        }
    )

    const dispatch = useDispatch()
    const category = useSelector(state => state.category)
    const country = useSelector(state => state.country)

    const handleInputChange  = (event)=>{
        setFiltros({...filtros, [event.target.name]: event.target.value})
        }

    const handlerDeleteSearch = () => {
        dispatch(getHomeProjects())
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
        const {data} = await clienteAxios.get(`/project/filter?page=1&orden=${filtros.orden}&country=${filtros.country}&category=${filtros.category}`)
        dispatch(chargeState(data))
    }

    return (
        <Layout>
            <form>
                <div className={style.filtersContainer}>
                    <div>
                        <label>Highest Donations </label>
                        <select onChange={handleInputChange}>
                            <option value={null}> - </option>
                            <option value="ASC">Ascendente</option>
                            <option value="DESC">Descendente</option>
                        </select>
                    </div>
                    <div>
                        <label>Country </label>
                        <select onChange={handleInputChange}>
                            <option value={null}> - </option>
                            {
                                country?.map((c, index) => {
                                    return <option value={c} key={index}>{c}</option>
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <label>Category </label>
                        <select onChange={handleInputChange}>
                            <option value={null}> - </option>
                            {
                                category?.map((c, index) => {
                                    return <option value={c} key={index}>{c}</option>
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <button onClick={handleSubmit}> Filtrar </button>
                    </div>
                    <div>
                        <button onClick={handlerDeleteSearch}> Delete Search < /button>
                    </div>
                </div>
            </form>
            <Paginated/>
        </Layout>
    )
}
