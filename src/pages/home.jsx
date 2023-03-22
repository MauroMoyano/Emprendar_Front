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
import { faUsers, faDollarSign, faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { faPhone, faAddressCard, faList, faFlag } from "@fortawesome/free-solid-svg-icons";



export default function Home() {

    const dispatch = useDispatch()

    const { category, country } = useSelector(state => state)
    const [color, setColor] = useState(false)

    useEffect(() => {
        dispatch(getHomeProjects())
    }, [])

    const [ordenss, setOrden] = useState('')
    const [countriess, setCountry] = useState('')
    const [categoriess, setCategory] = useState('')
    const [search, setSearch] = useState('')
    const [searchs, setSearchs] = useState('')

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
        setOrden('')
        setCountry('')
        setCategory('')
        setSearch('')
    }

    const handleInputChange = (event) => {

        if (timer) {
            clearTimeout(timer);
        }

        setTimer(setTimeout(() => {
            let newValue = event.target.value;
            setSearch(newValue)
        }, 2000));
    };



    return (
        <Layout>
            <div className={style.allContainer}>
                <div className={style.bodyContainer}>
                    <Slider />
                    <div className={style.subMenuContainer}>
                        <ul>
                            <li><Link href="/users"><FontAwesomeIcon icon={faUsers} className={style.theIcon} /> Usuarios</Link></li>
                            <li><Link href="/contactUs"><FontAwesomeIcon icon={faPhone} className={style.theIcon} />Contáctanos</Link></li>
                            <li><Link href="/aboutUs"><FontAwesomeIcon icon={faAddressCard} className={style.theIcon} />Acerca de</Link></li>
                            <li className={style.dropdown}><Link href="#menu"><FontAwesomeIcon icon={faArrowDownWideShort} className={style.theIcon} />Ordenar Por</Link>
                                <div id="menu" className={style.dropdownContent}>
                                    <section className={style.column}>
                                        <div>
                                            <label className={style.accordion}>
                                                <input type='radio' name='radio-accordion' defaultChecked="unChecked" />
                                                <div className={style.accordion__header}><FontAwesomeIcon icon={faDollarSign} className={style.theIcon} />
                                                
                                                Meta Economicas</div>
                                                <div className={style.accordion__content} value={ordenss}>
                                                    <button  className={style.accordion__content_selected} onClick={(e) => setOrden(e.target.value)} value=''>-</button>
                                                    <button  className={style.accordion__content_selected} onClick={(e) => setOrden(e.target.value)} value='ASC'>menor a mayor</button>
                                                    <button  className={style.accordion__content_selected} onClick={(e) => setOrden(e.target.value)} value='DESC'>mayor a menor</button>
                                                </div>
                                            </label>
                                            <label className={style.accordion} >
                                                <input type='radio' name='radio-accordion' defaultChecked="unChecked" />
                                                <div className={style.accordion__header}><FontAwesomeIcon icon={faFlag} className={style.theIcon} />País</div>
                                                <div className={style.accordion__content} value={countriess}>
                                                    <button className={style.accordion__content_selected} onClick={(e) => setCountry(e.target.value)} value=''> - </button>
                                                    {
                                                        country?.map((c, index) => {
                                                            return (<button className={style.accordion__content_selected} value={`${c}`} key={index} onClick={(e) => {setCountry(e.target.value) }}>{c}</button>)
                                                        })
                                                    }
                                                </div>
                                            </label>
                                            <label className={style.accordion}>
                                                <input type='radio' name='radio-accordion' defaultChecked="unChecked" />
                                                <div className={style.accordion__header}><FontAwesomeIcon icon={faList} className={style.theIcon} />Categoria</div>
                                                <div className={style.accordion__content}>
                                                    <button className={style.accordion__content_selected} onClick={(e) => setCategory(e.target.value)} value=''> - </button>
                                                    {
                                                        category?.map((c, index) => {
                                                            return (<button  className={style.accordion__content_selected} value={`${c}`} key={index} onClick={(e) =>{ 
                                                                setCategory(e.target.value)
                                                               
                                                            }}>{c}</button>)
                                                        })
                                                    }
                                                </div>
                                            </label>
                                            <label className={style.accordion}>
                                                <div className={style.accordion__header}>
                                                    <button type="button" onClick={() => handlerDeleteSearch()}>
                                                        <FontAwesomeIcon icon={faDeleteLeft} className={style.theIconInvert} />
                                                        Borrar filtro
                                                    </button>
                                                </div>
                                            </label>

                                        </div>
                                    </section>
                                </div>
                            </li>
                            <div className={style.menuSearch}>
                                <input value={search} type='search' onChange={(e) => { handleInputChange(e), setSearchs(e.target.value) }} placeholder="Buscar proyecto..." ></input>
                            </div>
                        </ul>
                    </div>
                    { countriess || categoriess 
                        ?  <div className={style.mensaje_filtros}> 
                                 Estas buscando en el país = "{countriess || "seleciona un pais" }" 
                                proyectos de la categoria = "{categoriess || "seleciona una categoria"}" 
                            </div>
                        : <div className={style.mensaje_filtros} > Puedes mejorar tu busqueda usando los filtros</div>

                    }
                   
                    <Paginated />
                </div>
            </div>
        </Layout>
    )

}






