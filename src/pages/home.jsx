import Paginated from "../../components/Paginated";
import {useDispatch, useSelector} from "react-redux"
import {filterCategory, filterCountry, getHomeProjects, orderTop} from "../../redux/actions";
import Layout from "../../components/Layout";
import style from "./styles/home.module.css"
import { useEffect } from "react";
import { authedUser } from "../../redux/actions";
import { useRouter } from "next/router";
import Link from "next/link";

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

    const handlerDeleteSearch = () => {
        dispatch(getHomeProjects())
    }

    return (
        <Layout>
            <form>
                <div className={style.filtersContainer}>
                    <div>
                        <label>Highest Donations </label>
                        <select className={style.select} onChange={handleOrderTop}>
                            <option disabled selected> - </option>
                            <option value="Ascendente">Ascendente</option>
                            <option value="Descendente">Descendente</option>
                        </select>
                    </div>
                    <div>
                        <label>Country </label>
                        <select className={style.select} onChange={handleFilterCountry}>
                            <option disabled selected> - </option>
                            {
                                country?.map((c, index) => {
                                    return <option value={c} key={index}>{c}</option>
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <label>Category </label>
                        <select className={style.select} onChange={handleFilterCategory}>
                            <option disabled selected> - </option>
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
                </div>
            </form>
            <Paginated/>
        </Layout>
    )

}
