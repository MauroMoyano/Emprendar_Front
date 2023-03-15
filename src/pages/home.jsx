import Paginated from "../../components/Paginated";
import { useDispatch, useSelector } from "react-redux"
import { changePathToFilterAndSearch, deleteSearchAndFilter, filterAllProjectos, filterCategory, filterCountry, getHomeProjects, orderTop } from "../../redux/actions";
import Layout from "../../components/Layout";
import style from "./styles/home.module.css"
import { useEffect, useState } from "react";
import { authedUser } from "../../redux/actions";
import { useRouter } from "next/router";
import Link from "next/link";
import Slider from "components/slider";

//imports de iconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownWideShort } from "@fortawesome/free-solid-svg-icons";

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
                <Slider />
                <div className={style.subMenuContainer}>
                    <ul>
                        <li><Link href="/aboutUs">Acerca de</Link></li>
                        <li><Link href="/users">Comunidad</Link></li>
                        <li><Link href="#">Contáctanos</Link></li>
                        <li className={style.dropdown}><Link href="#menu">Ordenar por <FontAwesomeIcon icon={faArrowDownWideShort} className={style.theIcon} /></Link>
                                <div id="menu" className={style.dropdownContent}>
                                    <section className={style.column}>
                                        <div>
                                            <label className={style.accordion}>
                                                <input type='radio' name='radio-accordion' defaultChecked="unChecked" />
                                                <div className={style.accordion__header}>Donacion</div>
                                                <div className={style.accordion__content} value={ordenss}>
                                                    <form value={ordenss}>
                                                    <button onClick={(e) => setOrden(e.target.value)} value=''> - </button>
                                                    <button onClick={(e) => setOrden(e.target.value)} value='ASC'>Ascendente</button>
                                                    <button onClick={(e) => setOrden(e.target.value)} value='DESC'>Descendente</button></form>
                                                </div>
                                            </label>
                                            <label className={style.accordion} >
                                                <input type='radio' name='radio-accordion' defaultChecked="unChecked" />
                                                <div className={style.accordion__header}>País</div>
                                                <div className={style.accordion__content} value={countriess}>
                                                    <button onClick={(e) => setOrden(e.target.value)} value=''> - </button>
                                                    {
                                                        country?.map((c, index) => {
                                                            console.log(c, index, 'filtros pais')
                                                            return (<button value={`${index}`} key={index} onClick={(e) => setOrden(e.target.value)}>{c}</button>)
                                                        })
                                                    }
                                                </div>
                                            </label>
                                            <label className={style.accordion}>
                                                <input type='radio' name='radio-accordion' defaultChecked="unChecked" />
                                                <div className={style.accordion__header}>Categoria</div>
                                                <div className={style.accordion__content}>
                                                    <h6>Categoria 1</h6>
                                                    <h6>Categoria 2</h6>
                                                    <h6>Categoria 3</h6>
                                                    <h6>Categoria 4</h6>
                                                    <h6>Categoria 5</h6>
                                                </div>
                                            </label>
                                            
                                        </div>
                                    </section>
                                </div>
                        </li>
                        <div className={style.menuSearch}>
                            <input value={search} type='search' onChange={(e) => setSearch(e.target.value)} placeholder="Buscar proyecto..." ></input>
                        </div>
                    </ul>
                </div>
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
                            <div>
                                <button type="button" onClick={() => handlerDeleteSearch()}>Limpiar</button>
                            </div>
                        </div>
                    </form>
                    <Paginated />
                </div>
            </div>
        </Layout>
    )

}






