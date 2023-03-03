
import style from './styles/Layout.module.css'
import Link from 'next/link'
import logo from '../public/assets/logo.png'
import Image from 'next/image'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Layout = ({children}) => {

    return (<div className={style.divGral}>
            <nav className={style.nav}>

                <div>
                    <a href="/aboutUs"><button>Acerca de nosotros</button></a>
                </div>

                {/* <p className={style.menu}>Menu &nabla;</p> */}

                    <div className={style.logo}>
                        <a href='/home'><Image className={style.logo} src={logo}/></a>
                    </div>

                {/* <div className={style.links}>
                    <Link href="/">Iniciar Sesion</Link>
                    <Link href="/">Registrarse</Link>

                </div> */}

                <div>
                    <a href="/"><button>Cerrar Sesión</button></a>
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