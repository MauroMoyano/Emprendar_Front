import style from './styles/Layout.module.css'
import Link from 'next/link'
import logo from '../public/assets/logo.png'
import Image from 'next/image'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useSelector, useDispatch} from 'react-redux';
import {logOut, searchProject} from 'redux/actions';
import {useState} from "react";

const Layout = ({children}) => {

    const [searchValue, setSearchValue] = useState("")

    const dispatch = useDispatch()

    const handleInput = (event) => {
        setSearchValue(event.target.value)
    }

    const handleClick = (event) => {
        event.preventDefault()
        dispatch(searchProject(searchValue))
        setSearchValue("")

    }

    return (<div className={style.divGral}>
        <nav className={style.nav}>

            <div>
                <Link href="/aboutUs">
                    <button>Acerca de nosotros</button>
                </Link>
            </div>

            <div>
                <Link href="/createProject"><button> Crea tu Proyecto </button></Link>
            </div>

            {/* <p className={style.menu}>Menu &nabla;</p> */}

            <div className={style.logo}>
                <a href='/home'><Image className={style.logo} src={logo} alt="Logo"/></a>
            </div>

            {/* <div className={style.links}>
                    <Link href="/">Iniciar Sesion</Link>
                    <Link href="/">Registrarse</Link>

                </div> */}

            <div>
                <input type='search' value={searchValue} onChange={handleInput}/>
            </div>
            <div>
                <Link href="/home">
                    <button type='submit' className={style.nav} onClick={handleClick}> Search</button>
                </Link>
            </div>

            <div>
                <a href="/">
                    <button onClick={() => dispatch(logOut())}>Cerrar Sesión</button>
                </a>
            </div>

        </nav>
        <div>
            {children}
        </div>
        <footer className={style.footer}>
            <p> &copy; 2023, Emprendar. All rights reserved</p>
        </footer>
    </div>)
}

export default Layout