import Layout from "../../../components/Layout";
import style from "../styles/profile.module.css";
import clienteAxios from "config/clienteAxios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import ProfileProject from "components/profileProject";


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
                })
                goHome()
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
        // const inputEmail = document.getElementById('input_email')

        inputName.removeAttribute('readOnly')
        inputLastName.removeAttribute('readOnly')
        // inputEmail.removeAttribute('readOnly')
    }

    const disableInputsDatos = () => {
        const inputName = document.getElementById('input_name')
        const inputLastName = document.getElementById('input_last_name')
        // const inputEmail = document.getElementById('input_email')

        inputName.setAttribute('readOnly', "")
        inputLastName.setAttribute('readOnly', "")
        // inputEmail.setAttribute('readOnly', "")
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
            window.location.reload()
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

    console.log('userInfo ->', userInfo)

    return (

        <Layout>
            {!!userData &&
                <div className={style.container}>
                    <div>
                        {/* Mis datos personales */}
                        <h1>Mis datos personales</h1>
                        <div>
                            <img src={profile_img} alt="Image not Found" />
                            <div>
                                <label htmlFor="input_name">Nombre(s):</label>
                                <input type="text" name='name' readOnly value={userInfo.name}
                                    id='input_name' onChange={handleDataInputsChange} />
                                <p>{userInfo.name === '' && 'Campo obligatorio'}</p>
                                <label htmlFor="input_last_name">Apellido(s):</label>
                                <input type="text" name='last_name' readOnly value={userInfo.last_name}
                                    id='input_last_name' onChange={handleDataInputsChange} />
                                <p>{userInfo.last_name === '' && 'Campo obligatorio'}</p>
                                <h5>@{user_name}</h5>
                            </div>
                            <h4>Valoración:</h4>
                            <h4>{reputation} estrellas</h4>
                            <label htmlFor="input_email">Correo electrónico:</label>
                            <input type="text" name="email" readOnly value={email}
                                id='input_email' />
                            <div>
                                <button onClick={enableInputsDatos}>Editar datos</button>
                                <button onClick={sendUserData}>Guardar cambios</button>
                                <button onClick={disableInputsDatos}>Cancelar</button>
                            </div>
                        </div>

                        {/* Contraseña */}
                        <h1>Contraseña</h1>
                        <div>
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

                    <div>
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