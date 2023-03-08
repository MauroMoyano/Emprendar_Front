import style from "./styles/aboutUsLanding.module.css";
//import de iconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";


export default function AboutUsLanding (){
    return (
        <div className={style.container}>
            <div className={style.titleObject}>
                <h1>Equipo de Desarrollo:</h1>
            </div>

            <div className={style.cardAbout}>
                <div className={style.card}>
                    <img src="img/jony.jpg" alt="jonyperfil" className={style.profileImage} />
                    <h4>Jonathan Hernandez</h4>
                    <p>Desarrollador Web Full Stack</p>
                    <div className={style.socialMedias}>
                        <a href="https://www.linkedin.com/in/jonnyhz/"><FontAwesomeIcon icon={faLinkedin} className={style.theIcons} /></a>
                        <a href="https://github.com/arcanium19"><FontAwesomeIcon icon={faGithub} className={style.theIcons} /></a>
                    </div>
                </div>
                <div className={style.card}>
                    <img src="img/nachito.jpeg" alt="nachitoperfil" className={style.profileImage} />
                    <h4>Juan Arguello</h4>
                    <p>Desarrollador Web Full Stack</p>
                    <div className={style.socialMedias}>
                        <a href="https://www.linkedin.com/in/juanarguello02/"><FontAwesomeIcon icon={faLinkedin} className={style.theIcons} /></a>
                        <a href="https://github.com/Nachito02"><FontAwesomeIcon icon={faGithub} className={style.theIcons} /></a>
                    </div>
                </div>
                <div className={style.card}>
                    <img src="img/lechu.jpg" alt="lechuperfil" className={style.profileImage} />
                    <h4>Lautaro Garcia</h4>
                    <p>Desarrollador Web Full Stack</p>
                    <div className={style.socialMedias}>
                        <a href="https://www.linkedin.com/in/lautaro-garcia-704aa5205/"><FontAwesomeIcon icon={faLinkedin} className={style.theIcons} /></a>
                        <a href="https://github.com/lechugaxthz"><FontAwesomeIcon icon={faGithub} className={style.theIcons} /></a>
                    </div>
                </div>
                <div className={style.card}>
                    <img src="img/mauro.jpeg" alt="mauroperfil" className={style.profileImage} />
                    <h4>Mauro Moyano</h4>
                    <p>Desarrollador Web Full Stack</p>
                    <div className={style.socialMedias}>
                        <a href="https://www.linkedin.com/in/mauro-moyano-full-stack-in-progress/"><FontAwesomeIcon icon={faLinkedin} className={style.theIcons} /></a>
                        <a href="https://github.com/MauroMoyano"><FontAwesomeIcon icon={faGithub} className={style.theIcons} /></a>
                    </div>
                </div>
                <div className={style.card}>
                    <img src="img/pedro.jpg" alt="pedroperfil" className={style.profileImage} />
                    <h4>Pedro Midueño</h4>
                    <p>Desarrollador Web Full Stack</p>
                    <div className={style.socialMedias}>
                        <a href="https://www.linkedin.com/in/pedromidueno/"><FontAwesomeIcon icon={faLinkedin} className={style.theIcons} /></a>
                        <a href="https://github.com/PedroMidueno"><FontAwesomeIcon icon={faGithub} className={style.theIcons} /></a>
                    </div>
                </div>
                <div className={style.card}>
                    <img src="img/sandy.jpeg" alt="sandyperfil" className={style.profileImage} />
                    <h4>Sandy Pestaña</h4>
                    <p>Desarrollador Web Full Stack</p>
                    <div className={style.socialMedias}>
                        <a href="https://www.linkedin.com/in/sandy-milena-pesta%C3%B1a-d%C3%ADaz-234887222/"><FontAwesomeIcon icon={faLinkedin} className={style.theIcons} /></a>
                        <a href="https://github.com/smilena7"><FontAwesomeIcon icon={faGithub} className={style.theIcons} /></a>
                    </div>
                </div>
                <div className={style.card}>
                    <img src="img/santi.jpeg" alt="santyperfil" className={style.profileImage} />
                    <h4>Santiago Álvarez</h4>
                    <p>Desarrollador Web Full Stack</p>
                    <div className={style.socialMedias}>
                        <a href="https://www.linkedin.com/in/santiago-allvarez-83a432223/"><FontAwesomeIcon icon={faLinkedin} className={style.theIcons} /></a>
                        <a href="https://github.com/Santiagoalvarez2022"><FontAwesomeIcon icon={faGithub} className={style.theIcons} /></a>
                    </div>
                </div>
            </div>
            
        </div>
    )
}