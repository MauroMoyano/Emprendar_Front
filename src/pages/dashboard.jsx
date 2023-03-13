import React, { use, useState } from "react";
import style from "./styles/dashboard.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSackDollar, faE } from "@fortawesome/free-solid-svg-icons";
import clienteAxios from "config/clienteAxios";
import formatDate from "utils/formatDate";
const Dashboard = (props) => {
  const [users, setUsers] = useState(props.users);

  const [projects, setProjects] = useState(props.projects);

  return (
    <div className={style.container}>
      <div className={style.sidebar}>
        <h3>Navegacion</h3>
        <nav className={style.nav}>
          <Link rel="stylesheet" href="#main">
            {" "}
            Dashboard{" "}
          </Link>
          <Link href="#users"> Usuarios </Link>
          <Link rel="stylesheet" href="#projects">
            {" "}
            Proyectos{" "}
          </Link>
        </nav>
      </div>

      <main className={style.main}>
        <div className={style.performance}>
          <h2>Estadisticas generales</h2>
          <div className={style.performanceContainer}>
            <div className={style.infoConainter  }>
              <div className={style.iconGreen}>
                <FontAwesomeIcon icon={faSackDollar} />
              </div>
              <div className={style.info}>
                <p>Dinero depositado</p>
                <h3>1,7M</h3>
              </div>
            </div>

            <div className={style.infoConainter}>
              <div className={style.iconBlue}>
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div className={style.info}>
                <p>Usuarios registrados</p>
                <h3>1,7M</h3>
              </div>
            </div>

            <div className={style.infoConainter}>
              <div className={style.iconPurple}>
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
          <div className={style.users} id="users">
            <h2>Usuarios</h2>

            <table className={style.table}>
              <thead>
                <tr>
                  <th>Perfil</th>
                  <th>Nombre</th>
                  <th>Estado</th>
                  <th>Fecha de registro</th>
                  <th>Email</th>

                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {users.map((e) => (
                  <tr key={e.id}>
                    <td>
                      <img
                        className={style.avatar}
                        src={e.profile_img}
                        alt=""
                      />
                    </td>
                    <td>
                      <p>{e.name + " " + e.last_name}</p>
                    </td>
                    <td>
                      <p
                        className={
                          e.confirmed ? style.validated : style.invalidated
                        }
                      >
                        {" "}
                        {e.confirmed ? "Validado" : "No validado"}{" "}
                      </p>
                    </td>

                    <td>
                      <p>{formatDate(e.createdAt)}</p>
                    </td>

                    <td>
                      <p>{e.email}</p>
                    </td>

                    <td>
                      <button className={style.suspension}>Suspender</button>
                      <button className={style.delete}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={style.projects} id="projects">
            <h2>Proyectos</h2>
            <div className={style.filter}>
              <p>Filtrar por</p>
              <select name="" id="">
                <option value="">Aceptados</option>
                <option value="">En espera</option>
                <option value="">Rechazados</option>
              </select>
            </div>

            <table className={style.table}>
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Estado</th>
                  <th>Fecha de creacion</th>
                  <th>Monto donado</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {/* {console.log(projects)} */}

                {projects.map((e) => (
                  <tr key={e.id}>
                    <td>
                      <img className={style.imageProject} src={e.img} alt="" />
                    </td>
                    <td>
                      <p>{e.title}</p>
                    </td>
                    <td>
                      <p className={style.validated}>{e.validated} </p>
                    </td>

                    <td>
                      <p>{formatDate(e.createdAt).toLocaleLowerCase()}</p>
                    </td>

                    <td>
                      <p>{parseInt((e.amount_collected / e.goal) * 100)}%</p>
                      {/* {console.log()} */}
                      <div className={style.progressBar}>
                        <div
                          className={style.bg_progress}
                          style={{width: `${(e.amount_collected / e.goal) * 100}%`}}>
                        </div>
                      </div>
                    </td>

                    <td>
                      <button className={style.accept}>Aceptar</button>
                      <button className={style.delete}>Rechazar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

export async function getServerSideProps() {
  const users = await clienteAxios.get("/user/admin/users");

  const project = await clienteAxios.get("/project/get/all");
  return {
    props: { users: users.data, projects: project.data },
  };
}
