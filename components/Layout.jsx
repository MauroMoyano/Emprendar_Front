
import style from './styles/Layout.module.css'
import Link from 'next/link'
const Layout = ({children}) => {

    return (<div style={{fontFamily: 'sans-serif'}}>
            <nav className={style.nav}>
                <h1>Emprendar</h1>

                <div className={style.links}>
                    <Link href="/">Iniciar Sesion</Link>
                    <Link href="/">Registrarse</Link>

                </div>
            </nav>
        <div>
            {children}
        </div>
        <h1>Este es el Footer</h1>
    </div>)
}

export default Layout