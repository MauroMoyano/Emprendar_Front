import Layout from "components/Layout";
import { use, useEffect, useState } from "react";
import { PaginatedUsers } from "components/PaginatedUsers";
import { useDispatch, useSelector } from "react-redux";
import style from "./styles/users.module.css";
import { changePathToFilterAndSearchUsers } from "redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faArrowDownWideShort, faDeleteLeft, faDollarSign, faPhone } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Users() {

    const dispatch = useDispatch()

    const [search, setSearch] = useState('')
    const [orden, setOrden] = useState('')

    useEffect(() => {
        let path
        orden !== ''
            ? path = `orden=${orden}&`
            : path = `orden=&`
        search !== ''
            ? path = path + `search=${search}`
            : path = path + `search=`

        dispatch(changePathToFilterAndSearchUsers(path))
    }, [orden, search])

    const handlerDeleteSearch = () => {
        setOrden('')
        setSearch('')
    }

    return (
        <Layout>
            <div className={style.allContainer}>
                <div className={style.bodyContainer}>
                    <div className={style.subMenuContainer}>
                        <ul>
                            <li><Link href="/home"><FontAwesomeIcon icon={''} className={style.theIcon} /> Proyectos</Link></li>
                            <li><Link href="#"><FontAwesomeIcon icon={faPhone} className={style.theIcon} />Contáctanos</Link></li>
                            <li><Link href="/aboutUs"><FontAwesomeIcon icon={faAddressCard} className={style.theIcon} />Acerca de</Link></li>
                            <li className={style.dropdown}><Link href="#menu"><FontAwesomeIcon icon={faArrowDownWideShort} className={style.theIcon} />Ordenar Por</Link>
                                <div id="menu" className={style.dropdownContent}>
                                    <section className={style.column}>
                                        <div>
                                            <label className={style.accordion}>
                                                <input type='radio' name='radio-accordion' defaultChecked="unChecked" />
                                                <div className={style.accordion__header}><FontAwesomeIcon icon={faDollarSign} className={style.theIcon} />Donación</div>
                                                <div className={style.accordion__content} value={orden}>
                                                    <button onClick={(e) => setOrden(e.target.value)} value=''> - </button>
                                                    <button onClick={(e) => setOrden(e.target.value)} value='ASC'>Ascendente</button>
                                                    <button onClick={(e) => setOrden(e.target.value)} value='DESC'>Descendente</button>
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
                                <input value={search} type='search' onChange={(e) => setSearch(e.target.value)} placeholder="Buscar proyecto..." ></input>
                            </div>
                        </ul>
                    </div>
                    <PaginatedUsers />
                </div>
            </div>
        </Layout>
    )
}