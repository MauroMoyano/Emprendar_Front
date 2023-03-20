import Layout from "components/Layout";
import { use, useEffect, useState } from "react";
import { PaginatedUsers } from "components/PaginatedUsers";
import { useDispatch, useSelector } from "react-redux";
import style from "./styles/users.module.css";
import { changePathToFilterAndSearchUsers } from "redux/actions";

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
                    <select value={orden} onChange={(e) => setOrden(e.target.value)}>
                        <option value=''></option>
                        <option value='ASC'>Ascendente</option>
                        <option value='DESC'>Descendente</option>
                    </select>
                    <div>
                        <input value={search} type='search' onChange={(e) => setSearch(e.target.value)} placeholder="Buscar proyecto..." ></input>
                    </div>
                    <button type="button" onClick={() => handlerDeleteSearch()} >Limpiar</button>

                    <p>Aqui hay Cards de users</p>
                    <PaginatedUsers />

                </div>
            </div>
        </Layout>
    )
}