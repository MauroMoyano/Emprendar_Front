import style from './styles/Layout.module.css'
import Link from 'next/link'
import logo from '../public/assets/logo.png'
import Image from 'next/image'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useSelector, useDispatch} from 'react-redux';
import {logOut, searchProject} from 'redux/actions';
import {useState, useEffect} from "react";
import { authedUser } from 'redux/actions';

const Layout = ({children}) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    useEffect(() => {
       
        const token = localStorage.getItem('token')
            console.log(token)
            if(token) {
              
                dispatch(authedUser())
                  
            }
    }, [dispatch])

    const [searchValue, setSearchValue] = useState("")


    const handleInput = (event) => {
        setSearchValue(event.target.value)
    }

    const handleClick = (event) => {
        event.preventDefault()
        dispatch(searchProject(searchValue))
        setSearchValue("")

    }

    if (!user) {
        return (
            <div>le erraste pa logeate  <Link href={"/"} > login  </Link>   </div>
        )
        
    } else {

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

}

export default Layout