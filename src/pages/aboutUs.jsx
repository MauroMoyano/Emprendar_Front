import React from "react";
import style from "./styles/aboutUs.module.css";
import Head from "next/head";
import Layout from "components/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, } from "@fortawesome/free-brands-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";




const aboutUs = () => {
  return (
    <Layout>
      <Head>
        <title>Nosotros</title>
      </Head>

      <div className={style.allContainer}>
      <div className={style.container}>
        <div>
          <Link href="/home"><button className={style.buttonBack}><FontAwesomeIcon icon={faHouse} className={style.theIcon} /> HOME</button></Link>
        </div>
        <h1 className={style.title}>Nuestro Team:</h1>
        <div>

          <div className={style.containerCards}>

            <div className={style.card}>
              <img src="img/nachito.jpeg" alt="Nachito" />

              <div className={style.info}>
                <p className={style.name}>Juan Arguello</p>
                <p className={style.carrer}>Desarrollador Web Full Stack</p>

                <div className={style.icons}>
                  <Link target='_blank' rel="noreferrer"
                    href="https://github.com/Nachito02">
                    <FontAwesomeIcon icon={faGithub} />
                  </Link>
                  <Link target='_blank' rel="noreferrer"
                    href="https://www.linkedin.com/in/juanarguello02/">
                    <FontAwesomeIcon icon={faLinkedin} />
                  </Link>
                </div>
              </div>
            </div>
            {/*---------------------------------------------------------------------*/}
            <div className={style.card}>
              <img src="img/santi.jpeg" alt="Santi" />

              <div className={style.info}>
                <p className={style.name}>Santiago Álvarez</p>
                <p className={style.carrer}>Desarrollador Web Full Stack</p>

                <div className={style.icons}>
                  <Link target='_blank' rel="noreferrer"
                    href="https://github.com/Santiagoalvarez2022">
                    <FontAwesomeIcon icon={faGithub} />
                  </Link>
                  <Link target='_blank' rel="noreferrer"
                    href="##">
                    <FontAwesomeIcon icon={faLinkedin} />
                  </Link>
                </div>
              </div>
            </div>
            {/*---------------------------------------------------------------------*/}
            <div className={style.card}>
              <img src="img/sandy.jpeg" alt="Sandy" />

              <div className={style.info}>
                <p className={style.name}>Sandy Pestaña</p>
                <p className={style.carrer}>Desarrollador Web Full Stack</p>

                <div className={style.icons}>
                  <Link target='_blank' rel="noreferrer"
                    href="https://github.com/smilena7">
                    <FontAwesomeIcon icon={faGithub} />
                  </Link>
                  <Link target='_blank' rel="noreferrer"
                    href="https://www.linkedin.com/in/sandy-milena-pesta%C3%B1a-diaz-234887222/">
                    <FontAwesomeIcon icon={faLinkedin} />
                  </Link>
                </div>
              </div>
            </div>
            {/*---------------------------------------------------------------------*/}
            <div className={style.card}>
              <img src="img/lechu.jpg" alt="El Lechu" />

              <div className={style.info}>
                <p className={style.name}>Lautaro Gonzalo</p>
                <p className={style.carrer}>Desarrollador Web Full Stack</p>

                <div className={style.icons}>
                  <Link target='_blank' rel="noreferrer"
                    href="https://github.com/lechugaxthz">
                    <FontAwesomeIcon icon={faGithub} />
                  </Link>
                  <Link target='_blank' rel="noreferrer"
                    href="https://www.linkedin.com/in/lautaro-garcia-704aa5205/">
                    <FontAwesomeIcon icon={faLinkedin} />
                  </Link>
                </div>
              </div>
            </div>
            {/*---------------------------------------------------------------------*/}
            <div className={style.card}>
              <img src="img/jony.jpg" alt="Jony" />

              <div className={style.info}>
                <p className={style.name}>Jonathan Hernández</p>
                <p className={style.carrer}>Desarrollador Web Full Stack</p>

                <div className={style.icons}>
                  <Link target='_blank' rel="noreferrer"
                    href="https://github.com/arcanium19">
                    <FontAwesomeIcon icon={faGithub} />
                  </Link>
                  <Link target='_blank' rel="noreferrer"
                    href="https://www.linkedin.com/in/jonnyhz/">
                    <FontAwesomeIcon icon={faLinkedin} />
                  </Link>
                </div>
              </div>
            </div>
            {/*---------------------------------------------------------------------*/}
            <div className={style.card}>
              <img src="img/mauro.jpeg" alt="Mauro" />

              <div className={style.info}>
                <p className={style.name}>Mauro Moyano</p>
                <p className={style.carrer}>Desarrollador Web Full Stack</p>

                <div className={style.icons}>
                  <Link target='_blank' rel="noreferrer"
                    href="https://github.com/MauroMoyano">
                    <FontAwesomeIcon icon={faGithub} />
                  </Link>
                  <Link target='_blank' rel="noreferrer"
                    href="https://www.linkedin.com/in/mauro-moyano-full-stack-in-progress/">
                    <FontAwesomeIcon icon={faLinkedin} />
                  </Link>
                </div>
              </div>
            </div>
            {/*---------------------------------------------------------------------*/}
            <div className={style.card}>
              <img src="img/pedro.jpg" alt="iO" />

              <div className={style.info}>
                <p className={style.name}>Pedro Midueño</p>
                <p className={style.carrer}>Desarrollador Web Full Stack</p>

                <div className={style.icons}>
                  <Link target='_blank' rel="noreferrer"
                    href="https://github.com/PedroMidueno">
                    <FontAwesomeIcon icon={faGithub} />
                  </Link>
                  <Link target='_blank' rel="noreferrer"
                    href="https://www.linkedin.com/in/pedromidueno/">
                    <FontAwesomeIcon icon={faLinkedin} />
                  </Link>
                </div>
              </div>
            </div>
            {/*---------------------------------------------------------------------*/}
            <div className={style.card}>
              <img src="img/diego.jpg" alt="diego" />

              <div className={style.info}>
                <p className={style.name}>Diego Araujo</p>
                <p className={style.carrer}>Scrum Master</p>

                <div className={style.icons}>
                  <Link href="#">
                    <FontAwesomeIcon icon={faGithub} />
                  </Link>
                  <Link target='_blank' rel="noreferrer"
                    href="https://www.linkedin.com/in/diego-araujo-dev/">
                    <FontAwesomeIcon icon={faLinkedin} />
                  </Link>
                </div>
              </div>
            </div>
            {/*---------------------------------------------------------------------*/}
          </div>
        </div>
      </div>
    </div>  
    </Layout>
  );
};

export default aboutUs;
