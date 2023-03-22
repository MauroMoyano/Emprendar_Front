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
import { faPen, faCircleInfo, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";





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
            if (user.id !== userData.id && user.isAdmin === false) {

                Swal.fire({
                    icon: 'error',
                    title: 'Acceso denegado',
                    text: 'Serás redirigido al inicio',
                    showConfirmButton: false,
                    timer: 1500,
                    willClose: ()=>{
                        goHome()
                    }
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

    const [passwords, setPasswords] = useState({
        password: '',
        newPassword: '',
        confirmPassword: '',
        passwordHelper: '0',
        newPasswordHelper: '0'
    })



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
        const editInfo = document.getElementById('editInfo')

        editInfo.classList.add(style.hidden)
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
        const editInfo = document.getElementById('editInfo')

        editInfo.classList.remove(style.hidden)
        saveInfo.classList.remove(style.visible)
        cancelInfo.classList.remove(style.visible)
    }

    //------------------------------------------------------------------------------------------------



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

    //-------------------------------------------------------------------------------------------
    const seePassword = () => {
        const inputPassword = document.getElementById('inputPassword')
        const newPassword = document.getElementById('newPassword')
        const confirmPassword = document.getElementById('confirmPassword')
        const seePassword = document.getElementById('seePassword')
        const hidePassword = document.getElementById('hidePassword')

        inputPassword.setAttribute('type', 'text')
        newPassword.setAttribute('type', 'text')
        confirmPassword.setAttribute('type', 'text')

        seePassword.classList.add(style.hidden)
        hidePassword.classList.add(style.visible)
    }

    const hidePassword = () => {
        const inputPassword = document.getElementById('inputPassword')
        const newPassword = document.getElementById('newPassword')
        const confirmPassword = document.getElementById('confirmPassword')
        const seePassword = document.getElementById('seePassword')
        const hidePassword = document.getElementById('hidePassword')

        inputPassword.setAttribute('type', 'password')
        newPassword.setAttribute('type', 'password')
        confirmPassword.setAttribute('type', 'password')

        seePassword.classList.remove(style.hidden)
        hidePassword.classList.remove(style.visible)
    }

    //-----------------------------------------------------------------------------------------------

    const enableInputsPassword = () => {
        const changePassword = document.getElementById('changePassword')
        const updatePassword = document.getElementById('updatePassword')
        const cancelPassword = document.getElementById('cancelPassword')
        const divPassword = document.getElementById('divPassword')

        changePassword.classList.add(style.hidden)
        updatePassword.classList.add(style.visible)
        cancelPassword.classList.add(style.visible)
        divPassword.classList.add(style.visible)

    }

    const disableInputsPassword = () => {
        const changePassword = document.getElementById('changePassword')
        const updatePassword = document.getElementById('updatePassword')
        const cancelPassword = document.getElementById('cancelPassword')
        const divPassword = document.getElementById('divPassword')

        changePassword.classList.remove(style.hidden)
        updatePassword.classList.remove(style.visible)
        cancelPassword.classList.remove(style.visible)
        divPassword.classList.remove(style.visible)

        setPasswords({
            password: '',
            newPassword: '',
            confirmPassword: '',
            passwordHelper: '0',
            newPasswordHelper: '0'
        })

        hidePassword()

    }
    //-------------------------------------------------------------------------------------------
    const handleInputsPassword = (event) => {
        const name = event.target.name
        const value = event.target.value

        if (name === 'password') {
            setPasswords({
                ...passwords,
                password: value,
                passwordHelper: value
            })
            return
        }

        if (name === 'newPassword') {
            setPasswords({
                ...passwords,
                newPassword: value,
                newPasswordHelper: value
            })
            return
        }

        setPasswords({
            ...passwords,
            confirmPassword: value
        })
    }
    //-------------------------------------------------------------------------------------------
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
            {!!userData && !!user && (userData.id === user.id || user.isAdmin === true) &&
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
                                    <div className={style.div_valoracion}>
                                        <h4>Valoración:</h4>
                                        <p>{reputation} estrellas</p>
                                    </div>

                                    <div className={style.div_email}>
                                        <h4>Correo electrónico:</h4>
                                        <FontAwesomeIcon icon={faCircleInfo} className={style.circle_info} />
                                        <span id="emailInfo" className={style.email_info}>El correo electrónico no se puede cambiar</span>
                                        <p>{email}</p>
                                    </div>
                                </div>

                            </div>
                            <hr />
                            {/* Contraseña */}
                            <h1>Contraseña</h1>
                            <div className={style.div_password} id='divPassword'>
                                <div className={style.password}>
                                    <h4>Escriba su contraseña actual:</h4>
                                    <div className={style.curr_password}>
                                        <input type="password" name="password" id='inputPassword' value={passwords.password} onChange={handleInputsPassword} />
                                        <FontAwesomeIcon icon={faEye} className={style.see_password} id='seePassword'
                                            onClick={seePassword} title='Mostrar contraseña' />
                                        <FontAwesomeIcon icon={faEyeSlash} className={style.hide_password} id='hidePassword'
                                            onClick={hidePassword} title='Ocultar contraseña' />
                                    </div>
                                    {!passwords.passwordHelper && <p>Campo obligatorio</p>}
                                </div>

                                <div className={style.new_password}>
                                    <h4>Escriba su nueva contraseña:</h4>
                                    <input type="password" id='newPassword' name="newPassword" value={passwords.newPassword} onChange={handleInputsPassword} />
                                    {!passwords.newPasswordHelper && <p>Campo obligatorio</p>}
                                </div>

                                <div className={style.confirm_password}>
                                    <h4>Confirme la nueva contraseña:</h4>
                                    <input type="password" id='confirmPassword' name="confirmPassword" value={passwords.confirmPassword} onChange={handleInputsPassword} />
                                    {passwords.newPassword && passwords.confirmPassword && passwords.newPassword !== passwords.confirmPassword && <p>Las contraseñas no coinciden</p>}
                                </div>
                            </div>
                            <div className={style.password_buttons}>
                                <button onClick={enableInputsPassword} id='changePassword' className={style.change_password}>Cambiar contraseña</button>
                                <button onClick={null} id='updatePassword' className={style.update_password}>Actualizar contraseña</button>
                                <button onClick={disableInputsPassword} id='cancelPassword' className={style.cancel_password}>Cancelar</button>
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
                <div className={style.divError}>
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