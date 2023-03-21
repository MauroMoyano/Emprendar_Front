import React, {use, useEffect, useState} from "react";
import style from "./styles/dashboard.module.css";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faSackDollar, faE} from "@fortawesome/free-solid-svg-icons";
import clienteAxios from "config/clienteAxios";
import formatDate from "utils/formatDate";
import Modal from "react-modal"
import CardProjectDetail from "../../components/rutaDetail/cardProjectDetail";
import Layout from "../../components/Layout";

const Dashboard = (props) => {
    const pageP = []
    const pageU = []
    const [users, setUsers] = useState(props.users);
    const [pageUsers, setPageUsers] = useState(0)

    const [projects, setProjects] = useState(props.projects);
    const [pageProjects, setPageProjects] = useState(0)
    const [valueSelect, setValueSelect] = useState("all")
    const [stats, setStats] = useState({})


    //Paginado projects
    for (let i = 0; i < projects.length; i = i + 6) {
        pageP.push(projects.slice(i, i + 6 || projects.length))
    }

    const handlePrevClick = () => {
        pageProjects > 0 && setPageProjects(pageProjects - 1)
    }
    const handleNextClick = () => {
        pageProjects < pageP.length - 1 && setPageProjects(pageProjects + 1)

    }
    const handlePage = (event) => {
        setPageProjects(parseInt(event.target.value))
    }

    //Paginado Users
    for (let i = 0; i < users.length; i = i + 3) {
        pageU.push(users.slice(i, i + 3 || users.length))
    }

    const handlePrevClickUsers = () => {
        pageUsers > 0 && setPageUsers(pageUsers - 1)
    }
    const handleNextClickUsers = () => {
        pageUsers < pageU.length - 1 && setPageUsers(pageUsers + 1)

    }
    const handlePageUsers = (event) => {
        setPageUsers(parseInt(event.target.value))
    }

    const [projectFilter, setProjectFilter] = useState(props.projects)


    const [isOpen, setIsOpen] = useState(false)
    const [project, setProject] = useState({})

    const openModal = (project) => {
        setIsOpen(true)
        setProject(project)
    }

    const closeModal = () => {
        setIsOpen(false)
        setProject({})
    }

    const [isOpenU, setIsOpenU] = useState(false)
    const [userModal, setUserModal] = useState({})

    const openModalUser = (user) => {
        setIsOpenU(true)
        setUserModal(user)
    }

    const closeModalUser = () => {
        setIsOpenU(false)
        setUserModal({})
    }

    //Funcion que maneja el filtro
    const handlerSelect = async (event) => {
        const value = event.target.value
        setValueSelect(value)
        if (value !== "all") {
            const {data} = await clienteAxios.get("/project/get/all")
            const result = data.filter((proj) => proj.validated === value)
            setProjects(result)
        } else {
            const {data} = await clienteAxios.get("/project/get/all")
            setProjects(data)
        }
    }

    //Funcion que maneja el cambio de estado del proyecto
    const handlerProject = async (validate, id) => {
        const response = await clienteAxios.put(`/project/validar/${id}`, {validate: validate})
        const {data} = await clienteAxios.get("/project/get/all")
        let result = data
        if (valueSelect !== "all") {
            result = data.filter((proj) => proj.validated === valueSelect)
        }
        setProjects(result)
    }
    // Manejadores y funciones de usuarios
    const handlerDisabled = async (id) => {
        const response = await clienteAxios.put(`/user/admin/deleteUser/${id}`)
        const {data} = await clienteAxios.get("/user/admin/users")
        setUsers(data)
    }

    const handlerEnable = async (id) => {
        const response = await clienteAxios.put(`/user/admin/enableUser/${id}`)
        const {data} = await clienteAxios.get("/user/admin/users")
        setUsers(data)
    }

    //Funciones que obtienen info para el Dashboard
    useEffect(() => {
        async function mauro() {
            const {data} = await clienteAxios.get("/stats")
            console.log("ssssssssssssssssssssssssssssssssssssssssssssssssss", data)
            setStats(data)
        }

        mauro()
    }, [projects, users])
    //console.log("csssssssssssssssssssssssssssssssssssssss",stats)


    return (
        <Layout>

            <div className={style.container}>
                <div className={style.sidebar}>
                    <h3>Navegacion</h3>
                    <nav className={style.nav}>
                        <Link href="#main">
                            {" "}
                            Dashboard{" "}
                        </Link>
                        <Link href="#users"> Usuarios </Link>
                        <Link href="#projects">
                            {" "}
                            Proyectos{" "}
                        </Link>
                    </nav>
                </div>

                <main className={style.main} id="main">
                    <div className={style.performance}>
                        <h2>Estadísticas generales</h2>
                        <div className={style.performanceContainer}>
                            <div className={style.infoConainter}>
                                <div className={style.iconGreen}>
                                    <FontAwesomeIcon icon={faSackDollar}/>
                                </div>
                                <div className={style.info}>
                                    <p>Dinero depositado</p>
                                    <h3>{stats.totalGoal}</h3>
                                </div>
                            </div>

                            <div className={style.infoConainter}>
                                <div className={style.iconBlue}>
                                    <FontAwesomeIcon icon={faUser}/>
                                </div>
                                <div className={style.info}>
                                    <p>Usuarios registrados</p>
                                    <h3>{stats.totalUsers}</h3>
                                </div>
                            </div>

                            <div className={style.infoConainter}>
                                <div className={style.iconPurple}>
                                    <FontAwesomeIcon icon={faE}/>
                                </div>
                                <div className={style.info}>
                                    <p>Proyectos</p>
                                    <h3>{stats.totalProject}</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className={style.users} id="users">
                            <h2>Usuarios</h2>
                            <div>
                                <button onClick={handlePrevClickUsers}> Atrás</button>
                                {
                                    pageU.map((p, index) => <button
                                            key={index}
                                            value={index}
                                            onClick={handlePageUsers}
                                        > {index + 1} </button>
                                    )
                                }
                                <button onClick={handleNextClickUsers}> Siguiente</button>
                            </div>
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
                                {pageU[pageUsers]?.map((e) => (
                                    <tr key={e.id}>
                                        <td>
                                            <img
                                                className={style.avatar}
                                                onClick={() => openModalUser(e)}
                                                src={e.profile_img}
                                                alt=""
                                            />
                                            <Modal
                                                isOpen={isOpenU}
                                                ariaHideApp={false}
                                            >
                                                <button onClick={closeModalUser}> X</button>
                                                <p>Modal de Usuario</p>
                                            </Modal>
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

                                                {e.confirmed ? " Validado " : " No validado "}
                                            </p>
                                        </td>

                                        <td>
                                            <p>{formatDate(e.createdAt)}</p>
                                        </td>

                                        <td>
                                            <p>{e.email}</p>
                                        </td>

                                        <td>
                                            {
                                                e.deletedAt
                                                    ? <button className={style.suspension}
                                                              onClick={() => handlerEnable(e.id)}>Habilitar</button>
                                                    : <button className={style.suspension}
                                                              onClick={() => handlerDisabled(e.id)}>Deshabilitar</button>
                                            }
                                            {/*<button className={style.delete}>Eliminar</button>*/}
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
                                <select name="" id="" onChange={handlerSelect}>
                                    <option value="all"> Todos</option>
                                    <option value="aceptado">Aceptados</option>
                                    <option value="espera">En espera</option>
                                    <option value="rechazado">Rechazados</option>
                                </select>
                                <button onClick={handlePrevClick}> Atrás</button>
                                {
                                    pageP.map((p, index) => <button
                                            key={index}
                                            value={index}
                                            onClick={handlePage}
                                        > {index + 1} </button>
                                    )
                                }
                                <button onClick={handleNextClick}> Siguiente</button>

                            </div>

                            <table className={style.table}>
                                <thead>
                                <tr>
                                    <th>Imagen</th>
                                    <th>Nombre</th>
                                    <th>Estado</th>
                                    <th>Fecha de creación</th>
                                    <th>Monto donado</th>
                                    <th>Acciones</th>
                                </tr>
                                </thead>

                                <tbody>

                                {pageP[pageProjects]?.map((e) => (
                                    <tr key={e.id}>
                                        <td>
                                            <img className={style.imageProject} onClick={() => openModal(e)} src={e.img}
                                                 alt=""/>
                                            <Modal
                                                isOpen={isOpen}
                                                ariaHideApp={false}
                                            >
                                                <button onClick={closeModal}> X</button>
                                                <button className={style.accept} onClick={async () => {
                                                    await handlerProject("aceptado", project.id)
                                                    closeModal()
                                                }}>Aceptar
                                                </button>
                                                <button className={style.delete} onClick={async () => {
                                                    await handlerProject("rechazado", project.id)
                                                    closeModal()
                                                }}>Rechazar
                                                </button>
                                                <CardProjectDetail obj={project}/>
                                            </Modal>
                                        </td>
                                        <td>
                                            <p>{e.title}</p>
                                        </td>
                                        <td>
                                            <p className={e.validated === "aceptado" ? style.validated : style.invalidated}>{e.validated} </p>
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
                                            <button className={style.accept}
                                                    onClick={() => handlerProject("aceptado", e.id)}>Aceptar
                                            </button>
                                            <button className={style.delete}
                                                    onClick={() => handlerProject("rechazado", e.id)}>Rechazar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </Layout>
    );
};


export default Dashboard;

export async function getServerSideProps() {
    const users = await clienteAxios.get("/user/admin/users");

    const project = await clienteAxios.get("/project/get/all");

    project.data.sort((a, b) => a.title - b.title)

    return {
        props: {users: users.data, projects: project.data},
    };
}
