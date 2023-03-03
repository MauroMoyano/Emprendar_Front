
import style from './styles/Layout.module.css'
import Link from 'next/link'
import logo from '../public/assets/logo.png'
import Image from 'next/image'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Layout = ({children}) => {

    return (<div className={style.divGral}>
            <nav className={style.nav}>


                <p className={style.menu}>Menu &nabla;</p>

                    <div className={style.logo}>
                    <Image className={style.logo} src={logo}/>
                    </div>

                <div className={style.links}>
                    <Link href="/">Iniciar Sesion</Link>
                    <Link href="/">Registrarse</Link>

                </div>
            </nav>
        <div>
            {children}
        </div>
        <footer className={style.footer}>
            <p> &copy; 2023, Emprendar.  All rights reserved</p>
        </footer>
    </div>)
}

export default Layout