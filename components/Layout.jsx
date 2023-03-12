import style from './styles/Layout.module.css'
import Link from 'next/link'
import logo from '../public/assets/logo.png'
import Image from 'next/image'
import {useSelector, useDispatch} from 'react-redux';
import {logOut, searchProject} from 'redux/actions';
import {useState, useEffect} from "react";
import { authedUser } from 'redux/actions';
//import de iconos
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Layout = ({children}) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    useEffect(() => {
       
        const token = localStorage.getItem('token')
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

        return (  
        <div className={style.divGral}>
            <nav className={style.nav}>
                <div className={style.menuContainer}>
                    <div className={style.dropdown}>
                            <button  className={style.userButton}>
                                <img src={user.profile_img} alt="profile_img" className={style.profileImage}/>
                                <div className={style.textContainer}>
                                    <p>Bienvenid@</p>
                                    <h3>{user.name + " " + user.last_name}</h3>
                                </div>
                            </button>
                            <div className={style.dropdownContent}>
                                <Link href="/createProject"><button className={style.buttonNewProject}><h3>Nuevo Proyecto</h3></button></Link>
                                <Link href="/"><button onClick={() => dispatch(logOut())}><h3>Cerrar Sesión</h3></button></Link>
                            </div>
                    </div>
                </div>
                <div className={style.logoContainer}>
                    <Link href='/home'><Image className={style.logo} src={logo} alt="logo"/></Link>
                </div>
                <div className={style.searchBarContainer}>
                    <div className={style.containForm}>
                        <input type='search' value={searchValue} onChange={handleInput} placeholder="Buscar..."/>
                        <Link href="/home">
                            <button type='submit' className={style.buttonSearch} onClick={handleClick}><FontAwesomeIcon icon={faSearch} className={style.theIconSearch} /></button>
                        </Link>
                    </div>
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