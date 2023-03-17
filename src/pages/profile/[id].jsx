import Layout from "../../../components/Layout";
import style from "../styles/profile.module.css";
import clienteAxios from "config/clienteAxios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import ProfileProject from "components/profileProject";

// import de iconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";


export default function Profile({ userData, error }) {

    const { user } = useSelector(state => state)
    const router = useRouter()

    // console.log('userData ->', userData)
    // console.log('userData.id ->', userData?.id)
    // console.log('user.id ->', user?.id)

    const goHome = () => {
        router.push('/home')

    }

    useEffect(() => {
        if (user && userData) {
            if (user.id != userData.id) {

                Swal.fire({
                    icon: 'error',
                    title: 'Acceso denegado',
                    text: 'Serás redirigido al inicio'
                }).then(() => {
                    goHome()
                })

            }
        }
    }, [user, userData])

    const user_name = userData?.user_name || null
    const name = userData?.name || null
    const last_name = userData?.last_name || null
    const reputation = userData?.reputation || null
    const profile_img = userData?.profile_img || null
    const userProjects = userData?.userProjects || null
    const email = userData?.email || null

    console.log('userProjects ->', userProjects)

    const [userInfo, setUserInfo] = useState({
        name,
        last_name
    })

    const handleDataInputsChange = (event) => {
        setUserInfo({
            ...userInfo,
            [event.target.name]: event.target.value
        })
    }



    //------------------------------------------------------------------------------------------------------------------------

    const enableInputsDatos = () => {
        const inputName = document.getElementById('input_name')
        const inputLastName = document.getElementById('input_last_name')
        
        inputName.classList.add(style.edit)
        inputLastName.classList.add(style.edit)

        inputName.removeAttribute('readOnly')
        inputLastName.removeAttribute('readOnly')
        
    }

    const disableInputsDatos = () => {
        const inputName = document.getElementById('input_name')
        const inputLastName = document.getElementById('input_last_name')

        inputName.classList.remove(style.edit)
        inputLastName.classList.remove(style.edit)

        inputName.setAttribute('readOnly', "")
        inputLastName.setAttribute('readOnly', "")
    }

    const enableInputsPassword = () => {
        const inputPassword = document.getElementById('input_password')
        inputPassword.removeAttribute('readOnly')
    }

    const disableInputsPassword = () => {
        const inputPassword = document.getElementById('input_password')
        inputPassword.setAttribute('readOnly', "")
    }

    //------------------------------------------------------------------------------------------------------------------------

    const sendUserData = async () => {
        if (userInfo.name === '' || userInfo.last_name === '') {
            Swal.fire({
                icon: 'error',
                title: 'Faltan campos por completar',
            })
            return
        }

        try {
            await clienteAxios.put(`${process.env.NEXT_PUBLIC_BACK_APP_URL}/user/${userData.id}`, userInfo)
            Swal.fire('Hecho', 'Los datos se actualizaron correctamente', 'success')
            disableInputsDatos()
            setTimeout(window.location.reload(), 1000)

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Ocurrio un error inesperado',
                text: 'Intente de nueva mas tarde',
                footer: `error: ${error.message}`
            })

        }

        return
    }

    const cancelSendUserData = () => {
        disableInputsDatos()
        setUserInfo({
            name,
            last_name
        })
    }

    const addVisibleClass = () => {
        const editImg = document.getElementById('editImg')
        editImg.classList.add(style.visible)
    }

    const removeVisibleClass = () => {
        const editImg = document.getElementById('editImg')
        editImg.classList.remove(style.visible)
    }

    console.log('userInfo ->', userInfo)

    return (

        <Layout>
            {!!userData &&
                <div className={style.div_gral}>
                    <div className={style.container}>
                        <div className={style.div_datos}>
                            {/* Mis datos personales */}
                            <div className={style.div_userInfo}>
                                {/* Foto de perfil */}
                                <div className={style.div_img}>
                                    <div className={style.div_edit_image}
                                        onMouseOver={addVisibleClass} onMouseOut={removeVisibleClass}>
                                        <div title="Cambiar foto" className={style.fa} id='editImg'><FontAwesomeIcon icon={faPen}
                                            className={style.edit_icon} size='xs' /></div>
                                        <img src={profile_img} alt="Image not Found" />
                                    </div>
                                    <h5>@{user_name}</h5>
                                </div>

                                <h1>Mis datos personales</h1>
                                <div className={style.main_user_info}>
                                    <div className={style.div_nombres}>
                                        <h4>Nombre(s):</h4>
                                        <input type="text" name='name' readOnly value={userInfo.name}
                                            id='input_name' onChange={handleDataInputsChange} className={style.input_name}/>
                                        <p className={style.errorInputs}>{userInfo.name === '' && 'Campo obligatorio'}</p>
                                    </div>

                                    <div className={style.div_apellidos}>
                                        <h4>Apellido(s):</h4>
                                        <input type="text" name='last_name' readOnly value={userInfo.last_name}
                                            id='input_last_name' onChange={handleDataInputsChange} className={style.input_apellido}/>
                                        <p className={style.errorInputs}>{userInfo.last_name === '' && 'Campo obligatorio'}</p>
                                    </div>
                                </div>
                                <div className={style.div_extra_info}>
                                    <h4>Valoración:</h4>
                                    <h4>{reputation} estrellas</h4>
                                    <h4>Correo electrónico:</h4>
                                    <h5>{email}</h5>
                                </div>
                                <div className={style.userInfo_buttons}>
                                    <button onClick={enableInputsDatos}>Editar datos</button>
                                    <button onClick={sendUserData}>Guardar cambios</button>
                                    <button onClick={cancelSendUserData}>Cancelar</button>
                                </div>
                            </div>

                            {/* Contraseña */}
                            <h1>Contraseña</h1>
                            <div className={style.div_password}>
                                <label htmlFor="input_password" id="label_password">Contraseña:</label>
                                <input type="password" name="password" readOnly id='input_password' />
                                <label htmlFor="input_password" id="label_password">Escriba su nueva contraseña:</label>
                                <input type="new_password" readOnly id='input_password' />
                                <label htmlFor="input_password" id="label_password">Confirme la nueva contraseña:</label>
                                <input type="confirm_password" readOnly id='input_password' />
                            </div>
                            <div>
                                <button onClick={enableInputsPassword}>Cambiar contraseña</button>
                                <button onClick={disableInputsPassword}>Actualizar contraseña</button>
                                <button onClick={disableInputsPassword}>Cancelar</button>
                            </div>

                        </div>

                        <div className={style.div_projects}>
                            <h2>Mis proyectos</h2>
                            {!userProjects.length && <h4>No tienes ningún proyecto</h4>}
                            {!!userProjects.length && userProjects.map(project => {
                                return (
                                    <ProfileProject
                                        key={project.id}
                                        projectData={project}
                                    />
                                )
                            })}
                        </div>
                    </div>
                </div>

            }

            {!!error &&
                <div>
                    <h1>No se encontró el usuario</h1>
                    <button onClick={goHome}>Regresar a inicio</button>
                </div>}

        </Layout>
    )
}

export async function getServerSideProps({ query }) {
    try {
        const response = await clienteAxios.get(`${process.env.NEXT_PUBLIC_BACK_APP_URL}/user/${query.id}`)
        const userData = response.data

        return {
            props: {
                userData
            }
        }
    } catch (error) {
        return {
            props: {
                error: error.message
            }
        }
    }
}