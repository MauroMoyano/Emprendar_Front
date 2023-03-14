import Paginated from "../../components/Paginated";
import { useDispatch, useSelector } from "react-redux"
import { changePathToFilterAndSearch, deleteSearchAndFilter, filterAllProjectos, filterCategory, filterCountry, getHomeProjects, orderTop } from "../../redux/actions";
import Layout from "../../components/Layout";
import style from "./styles/home.module.css"
import { useEffect, useState } from "react";
import { authedUser } from "../../redux/actions";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Home() {

    const dispatch = useDispatch()

    const { allProjectsCopy, searchProjects, category, country } = useSelector(state => state)

    useEffect(() => {
        dispatch(getHomeProjects())
    }, [])

    const [ordenss, setOrden] = useState('')
    const [countriess, setCountry] = useState('')
    const [categoriess, setCategory] = useState('')
    const [search, setSearch] = useState('')

    useEffect(() => {
        let path
        ordenss !== ''
            ? path = `orden=${ordenss}&`
            : path = `orden=&`
        countriess !== ''
            ? path = path + `country=${countriess}&`
            : path = path + `country=&`
        categoriess !== ''
            ? path = path + `category=${categoriess}&`
            : path = path + `category=&`
        search !== ''
            ? path = path + `search=${search}`
            : path = path + `search=`
        dispatch(changePathToFilterAndSearch(path))

    }, [ordenss, countriess, categoriess, search])

    /* let toPath = [ordenss, countriess, categoriess] */

    const handlerDeleteSearch = () => {
        setOrden(''),
        setCountry(''),
        setCategory(''),
        setSearch('')
    }

    return (
        <Layout>
            <div className={style.allContainer}>
                <div className={style.bodyContainer}>
                    <form>
                        <div className={style.filtersContainer}>
                            <div>
                                <label>Highest Donations </label>
                                <select value={ordenss} className={style.select} onChange={(e) => setOrden(e.target.value)}>
                                    <option value=''> - </option>
                                    <option value="ASC">Ascendente</option>
                                    <option value="DESC">Descendente</option>
                                </select>
                            </div>
                            <div>
                                <label>Country </label>
                                <select value={countriess} className={style.select} onChange={(e) => setCountry(e.target.value)}>
                                    <option value=''> - </option>
                                    {
                                        country?.map((c, index) => {
                                            return <option value={c} key={index}>{c}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div>
                                <label>Category </label>
                                <select value={categoriess} className={style.select} onChange={(e) => setCategory(e.target.value)}>
                                    <option value=''> - </option>
                                    {
                                        category?.map((c, index) => {
                                            return <option value={c} key={index}>{c}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div>
                                <input value={search} type='search' onChange={(e) => setSearch(e.target.value)} placeholder="Buscar..." ></input>
                            </div>
                            {/* <div>
                                <button type="button" onClick={() => filterProj()}>filter</button>
                            </div> */}
                            <div>
                                <button type="button" onClick={() => handlerDeleteSearch()}>Delete Search</button>
                            </div>
                        </div>
                    </form>
                    <Paginated />
                </div>
            </div>
        </Layout>
    )

}






/* const filterProj = () => {
        let result

        if (ordenss !== '' || countriess !== '' || categoriess !== '') {
            searchProjects.length
                ? (
                    countriess !== ''
                        ? result = searchProjects.filter(pj => pj.country.name === countriess)
                        : result = searchProjects,
                    categoriess !== ''
                        ? result = result.filter(pj => pj.categories.find(cat => cat.name === categoriess))
                        : result,
                    ordenss !== ''
                        ? ordenss === 'ASC'
                            ? result.sort((low, max) => low.goal.localeCompare(max.goal))
                            : result.sort((low, max) => max.goal.localeCompare(low.goal))
                        : result
                )
                : (
                    countriess !== ''
                        ? result = allProjectsCopy.filter(pj => pj.country.name === countriess)
                        : result = allProjectsCopy,
                    categoriess !== ''
                        ? result = result.filter(pj => pj.categories.find(cat => cat.name === categoriess))
                        : result,
                    ordenss !== ''
                        ? ordenss === 'ASC'
                            ? result.sort((low, max) => low.goal.localeCompare(max.goal))
                            : result.sort((low, max) => max.goal.localeCompare(low.goal))
                        : result
                )
            console.log(result)
            dispatch(filterAllProjectos(result))
        } else {
            window.alert('debes poner algo para filtrar antes')
        }
    } */