import Layout from "../../../components/Layout";
import style from "../styles/profile.module.css";
import clienteAxios from "config/clienteAxios";
import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import ProfileProject from "components/profileProject";
import { useDropzone } from "react-dropzone"

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

    // console.log('userProjects ->', userProjects)

    const [userInfo, setUserInfo] = useState({
        name,
        last_name
    })

    const [imageToSend, setImageToSend] = useState(profile_img)


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

        const saveInfo = document.getElementById('saveInfo')
        const cancelInfo = document.getElementById('cancelInfo')

        saveInfo.classList.add(style.visible)
        cancelInfo.classList.add(style.visible)

    }

    const disableInputsDatos = () => {
        const inputName = document.getElementById('input_name')
        const inputLastName = document.getElementById('input_last_name')

        inputName.classList.remove(style.edit)
        inputLastName.classList.remove(style.edit)

        inputName.setAttribute('readOnly', "")
        inputLastName.setAttribute('readOnly', "")

        const saveInfo = document.getElementById('saveInfo')
        const cancelInfo = document.getElementById('cancelInfo')

        saveInfo.classList.remove(style.visible)
        cancelInfo.classList.remove(style.visible)
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
            Swal.fire({
                icon: 'success',
                title: 'Cambiós realizados correctamente',
                text: 'Recargaremos la página con tus nuevos datos',
                timer: 2000,
                showConfirmButton: false,
                willClose: () => {
                    window.location.reload()
                }
            })

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Ocurrio un error inesperado',
                text: 'Intente de nuevo mas tarde',
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
    //---------------------------------------------------------------------------------------
    const addVisibleClass = () => {
        const editImg = document.getElementById('editImg')
        editImg.classList.add(style.visible)
    }

    const removeVisibleClass = () => {
        const editImg = document.getElementById('editImg')
        editImg.classList.remove(style.visible)
    }

    const changeImage = async () => {
        try {
            await clienteAxios.put(`${process.env.NEXT_PUBLIC_BACK_APP_URL}/user/${userData.id}`, { profile_img: imageToSend })
            Swal.fire({
                icon: 'success',
                title: 'Cambiós realizados correctamente',
                text: 'Recargaremos la página con tus nuevos datos',
                timer: 2000,
                showConfirmButton: false,
                willClose: () => {
                    window.location.reload()
                }
            })
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Ocurrio un error inesperado',
                text: 'Intente de nuevo mas tarde',
                footer: `error: ${error.message}`
            })
        }
    }

    const cancelImage = () => {
        setImageToSend(profile_img)
    }

    const onDropRejected = () => {
        Swal.fire({
            icon: 'error',
            title: 'Formato no soportado',
            text: '"No se pudo subir la imagen. Los formatos aceptadon son PNG, JPG, JPEG y WEBP"'
        })
    };

    const onDropAccepted = useCallback(async (acceptedFiles) => {
        const formData = new FormData();
        formData.append("image", acceptedFiles[0], acceptedFiles[0].name);

        await uploadImage(formData)
    }, []);

    const { getRootProps, getInputProps } =
        useDropzone({
            onDropRejected, onDropAccepted, accept: {
                'image/png': ['.png', '.jpg', '.jpeg', '.webp'],
            }
        });

    const uploadImage = async (formdata) => {
        const loadingMessage = document.getElementById('loading_img')
        try {
            loadingMessage.classList.add(style.visible)
            const response = await clienteAxios.post("images/upload", formdata)
            loadingMessage.classList.remove(style.visible)
            setImageToSend(response.data.imageUrl)
        }
        catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Ocurrio un error inesperado',
                text: 'Intente de nuevo mas tarde',
                footer: `error: ${error.message}`
            })
        }
    }

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
                                        <div title="Cambiar foto" className={style.fa} id='editImg'
                                            {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <FontAwesomeIcon icon={faPen}
                                                className={style.edit_icon} /></div>
                                        <img src={imageToSend} alt="Image not Found" />
                                    </div>
                                    <p id="loading_img" className={style.img_loading}>Cargando...</p>
                                    {imageToSend !== profile_img &&
                                        <div className={style.photo_buttons}>
                                            <button onClick={changeImage}>Confirmar cambio</button>
                                            <button onClick={cancelImage}>Cancelar</button>
                                        </div>
                                    }

                                    <h5>@{user_name}</h5>

                                </div>

                                <h1>Mis datos personales</h1>
                                <div className={style.main_user_info}>
                                    <div className={style.div_nombres}>
                                        <h4>Nombre(s):</h4>
                                        <input type="text" name='name' readOnly value={userInfo.name}
                                            id='input_name' onChange={handleDataInputsChange} className={style.input_name} />
                                        <p className={style.errorInputs}>{userInfo.name === '' && 'Campo obligatorio'}</p>
                                    </div>

                                    <div className={style.div_apellidos}>
                                        <h4>Apellido(s):</h4>
                                        <input type="text" name='last_name' readOnly value={userInfo.last_name}
                                            id='input_last_name' onChange={handleDataInputsChange} className={style.input_apellido} />
                                        <p className={style.errorInputs}>{userInfo.last_name === '' && 'Campo obligatorio'}</p>
                                    </div>
                                </div>

                                <div className={style.userInfo_buttons}>
                                    <button onClick={enableInputsDatos} className={style.edit_info} id='editInfo'>Editar datos</button>
                                    <button onClick={sendUserData} className={style.save_info} id='saveInfo'>Guardar cambios</button>
                                    <button onClick={cancelSendUserData} className={style.cancel_info} id='cancelInfo'>Cancelar</button>
                                </div>

                                <div className={style.div_extra_info}>
                                    <h4>Valoración:</h4>
                                    <h4>{reputation} estrellas</h4>
                                    <h4>Correo electrónico:</h4>
                                    <h5>{email}</h5>
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
                            {!!userProjects.length &&
                                <div className={style.projects_container}>
                                    {userProjects.map(project => {
                                        return (
                                            <ProfileProject
                                                key={project.id}
                                                projectData={project}
                                            />
                                        )
                                    })}
                                </div>
                            }
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