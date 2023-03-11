import React from "react";
import style from "./styles/dashboard.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSackDollar, faE } from "@fortawesome/free-solid-svg-icons";
const Dashboard = () => {
  return (
    <div className={style.container}>
      <div className={style.sidebar}>
        <h3>Naevgacion</h3>
        <nav className={style.nav}>
          <Link rel="stylesheet" href="#main">
            {" "}
            Dashboard{" "}
          </Link>
          <Link rel="stylesheet" href="#main">
            {" "}
            Usuarios{" "}
          </Link>
          <Link rel="stylesheet" href="#main">
            {" "}
            Proyectos{" "}
          </Link>
        </nav>
      </div>

      <main className={style.main}>
        <div className={style.performance}>
          <h2>Estadisticas generales</h2>
          <div className={style.performanceContainer}>
            <div className={style.infoConainter}>
              <div className={style.icon}>
                <FontAwesomeIcon icon={faSackDollar} />
              </div>
              <div className={style.info}>
                <p>Dinero depositado</p>
                <h3>1,7M</h3>
              </div>
            </div>

            <div className={style.infoConainter}>
              <div className={style.icon}>
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div className={style.info}>
                <p>Usuarios registrados</p>
                <h3>1,7M</h3>
              </div>
            </div>

            <div className={style.infoConainter}>
              <div className={style.icon}>
                <FontAwesomeIcon icon={faE} />
              </div>
              <div className={style.info}>
                <p>Proyectos</p>
                <h3>1,7M</h3>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className={style.users}>
            <h2>Usuarios</h2>

            <table className={style.table}>
              <thead>
                <tr>
                  <th>Perfil</th>
                  <th>Nombre</th>
                  <th>Estado</th>
                  <th>Fecha de registro</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>
                    <img
                      className={style.avatar}
                      src="https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos-810x540.jpg"
                      alt=""
                    />
                  </td>
                  <td>
                    <p>Emilia Eskere</p>
                  </td>
                  <td>
                    <p>Validado</p>
                  </td>

                  <td>
                    <p>12 dec</p>
                  </td>

                  <td>
                    <button className={style.suspension}>Suspender</button>
                    <button className={style.delete}>Eliminar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
