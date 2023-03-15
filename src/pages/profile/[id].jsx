import Layout from "../../../components/Layout";
import style from "../styles/profile.module.css";
import clienteAxios from "config/clienteAxios";
import { useState } from "react";

export default function Profile({ user, error }) {

    // console.log('user', user)
    // console.log('error', error)

    const user_name = user?.user || null
    const name = user?.name || null
    const last_name = user?.last_name || null
    const reputation = user?.reputation || null
    const profile_img = user?.profile_img || null
    const userProjects = user?.userProjects || null
    const email = user?.email || null

    // var { user_name, name, last_name, reputation, profile_img, userProjects, email } = user;

    const [userInfo, setUserInfo] = useState({
        name,
        last_name,
        profile_img,
        email
    })

    const handleInputChange = (event) => {
        setUserInfo({
            ...userInfo,
            [event.target.name]: event.target.value
        })
    }

    const enableInputs = () => {
        const inputName = document.getElementById('input_name')
        const inputLastName = document.getElementById('input_last_name')
        const inputEmail = document.getElementById('input_email')
        const inputPassword = document.getElementById('input_password')

        inputName.removeAttribute('readOnly')
        inputLastName.removeAttribute('readOnly')
        inputEmail.removeAttribute('readOnly')
        inputPassword.removeAttribute('readOnly')
    }

    const disableInputs = () => {
        const inputName = document.getElementById('input_name')
        const inputLastName = document.getElementById('input_last_name')
        const inputEmail = document.getElementById('input_email')
        const inputPassword = document.getElementById('input_password')

        inputName.setAttribute('readOnly', "")
        inputLastName.setAttribute('readOnly', "")
        inputEmail.setAttribute('readOnly', "")
        inputPassword.setAttribute('readOnly', "")
    }

    console.log('userInfo ->', userInfo)

    return (

        <Layout>
            {!!user &&
                <div className={style.container}>
                    <div>
                        <div>
                            <img src={profile_img} alt="Image not Found" />
                            <div>
                                <label htmlFor="input_name">Nombre:</label>
                                <input type="text" name='name' readOnly value={userInfo.name} id='input_name' onChange={handleInputChange} />
                                <label htmlFor="input_last_name">Apellidos:</label>
                                <input type="text" name='last_name' readOnly value={userInfo.last_name} id='input_last_name' onChange={handleInputChange} />
                                <h5>{user_name}</h5>
                            </div>
                        </div>
                        <div>
                            <h4>Valoración:</h4>
                            <h4>{reputation} estrellas</h4>
                            <label htmlFor="input_email">Correo electrónico:</label>
                            <input type="text" name="email" readOnly value={userInfo.email} id='input_email' onChange={handleInputChange} />
                            <label htmlFor="input_password">Contraseña:</label>
                            <input type="password" name="password" readOnly id='input_password' />

                        </div>
                        <div>
                            <button onClick={enableInputs}>Editar datos</button>
                            <button onClick={disableInputs}>Guardar cambios</button>
                        </div>
                    </div>

                    <div>
                        <h2>Mis proyectos</h2>
                        {!userProjects.length && <h4>No tienes ningún proyecto</h4>}
                        {!!userProjects.length && userProjects.map(project => {
                            return (
                                <div>Proyecto {project}</div>
                            )
                        })}
                    </div>
                </div>
            }

            {!!error &&
                <div>
                    <h1>No se encontró el usuario</h1>
                    <button>Regresar a inicio</button>
                </div>}

        </Layout>
    )
}

export async function getServerSideProps({ query }) {
    try {
        const response = await clienteAxios.get(`${process.env.NEXT_PUBLIC_BACK_APP_URL}/user/${query.id}`)
        const user = response.data

        return {
            props: {
                user
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