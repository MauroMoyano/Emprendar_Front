import style from "./styles/slider.module.css";


export default function Slider(){
    return (
        <div className={style.sliderContent}>
            <div className={style.sliderFrame}>
                <ul>
                    <li>
                        <img src="https://res.cloudinary.com/df4kwquv8/image/upload/v1678575953/emprendar_sources/l5ohrafo7ki15lotde5a.jpg" alt="slider1" />
                        <div className={style.titleSubtitle}>
                            <h1>DONACION DE RECURSOS</h1>
                            <h3>Apoyá a proyectos que beneficien a personas de bajo recursos o en estado de desamparo.</h3>
                        </div>
                    </li>
                    <li>
                        <img src="https://res.cloudinary.com/df4kwquv8/image/upload/v1678575949/emprendar_sources/gjhgngpr7wsfxusvfv3c.jpg" alt="slider2" />
                        <div className={style.titleSubtitle}>
                            <h1>DONACIONES A LA COMUNIDAD</h1>
                            <h3>Muchos proyectos de merenderos barriales necesitan tu apoyo, que estas esperando!</h3>
                        </div>
                    </li>
                    <li>
                        <img src="https://res.cloudinary.com/df4kwquv8/image/upload/v1678575949/emprendar_sources/z9hbzmtwiyp3vondjcv6.jpg" alt="slider3" />
                        <div className={style.titleSubtitle}>
                            <h1>BECAS ESTUDIANTILES</h1>
                            <h3>Dentro de la categoria Educación, podras encontrar proyectos para generar becas de estudios para personas que no pueden costearse una carrera profesional.</h3>
                        </div>
                    </li>
                    <li>
                        <img src="https://res.cloudinary.com/df4kwquv8/image/upload/v1678575948/emprendar_sources/zntpti9v2pirkgkabyw2.jpg" alt="slider4" />
                        <div className={style.titleSubtitle}>
                            <h1>TODOS PODEMOS SER HEROES</h1>
                            <h3>Los bomberos voluntarios no tienen los suficientes recursos, con tu donacion estas ayudando a que ellos puedan salvar mas vidas!</h3>
                        </div>
                    </li>
                    <li>
                        <img src="https://res.cloudinary.com/df4kwquv8/image/upload/v1678582330/emprendar_sources/bhotby1pcgr03ksvwm2s.jpg" alt="slider5" />
                        <div className={style.titleSubtitle}>
                            <h1>#NiUnaMenos!!!</h1>
                            <h3>Doná a fundaciones que se dedican a la protección, rehubicación y ayuda a mujeres que sufren maltrato.</h3>
                        </div>
                    </li>
                    <li>
                        <img src="https://res.cloudinary.com/df4kwquv8/image/upload/v1678582535/emprendar_sources/jk4hp532pw9yf2i2h69f.jpg" alt="slider6" />
                        <div className={style.titleSubtitle}>
                            <h1>ELLOS TAMBIEN TIENEN DERECHOS!</h1>
                            <h3>En Emprendar encontraras proyectos de centros de rescates de animales, tu granito de arena podría salvar una vida</h3>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}