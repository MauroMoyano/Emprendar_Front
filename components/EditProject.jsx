import { useEffect, useState, useCallback } from "react";
import style from "./styles/editProject.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
    authedUser,
    createProject,
    getHomeProjects,
} from '../redux/actions'
import { useRouter } from "next/router";
import clienteAxios from "config/clienteAxios";
import Swal from "sweetalert2";

// import de iconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";


export default function EditProject({ projectData }) {

    console.log('projectData en edit ->', projectData)

    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        dispatch(getHomeProjects());
    }, []);

    const [form, setForm] = useState({
        title: projectData.title,
        summary: projectData.summary,
        description: projectData.description
    });

    const [errors, setErrors] = useState({
        title: "",
        summary: "",
        description: ""
    });

    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;
        // console.log(form)
        setErrors(validate({ ...form, [property]: value }));
        setForm({ ...form, [property]: value });
        // console.log(form)
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        if (
            form.title !== "" &&
            form.summary !== "" &&
            form.description !== ""
        ) {
            if (
                errors.title === "" &&
                errors.summary === "" &&
                errors.description === ""
            ) {
                await clienteAxios.put(`${process.env.NEXT_PUBLIC_BACK_APP_URL}/project/${projectData.id}`, form)
                Swal.fire({
                    icon: 'success',
                    title: 'Cambios realizados correctamente',
                    text: 'Recargaremos la página con tus nuevos datos',
                    timer: 2000,
                    showConfirmButton: false,
                    willClose: () => {
                        window.location.reload()
                    }
                })
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Faltan campos por completar',
            })
        }
    };

    const validate = (form) => {
        const regTitle = /^[^0-9]{1,70}$/;
        // console.log("pasando por validate")
        let errors = {};

        form.title?.trim();
        form.title?.replaceAll("\\s{2,}", " ");
        if (regTitle.test(form.title)) {
            errors = { ...errors, title: "" };
        } else {
            if (form.title === "") {
                errors = { ...errors, title: "" };
            } else {
                if (/^[^0-9]/.test(form.title)) {
                    errors = {
                        ...errors,
                        title: "El título no puede ser mayor de 70 caracteres",
                    };
                } else {
                    errors = {
                        ...errors,
                        title: "El título no puede contener números",
                    };
                }
            }
        }

        form.summary?.trim();
        form.summary?.replaceAll("\\s{2,}", " ");
        const regSummary = /^[a-zA-Z0-9ñáéíóúÁÉÍÓÚÜü .,]{1,200}$/;

        if (regSummary.test(form.summary)) {
            errors = { ...errors, summary: "" };
        } else {
            if (form.summary === "") {
                errors = { ...errors, summary: "" };
            } else {
                !/^[@#$%]*$/.test(form.summary)
                    ? (errors = {
                        ...errors,
                        summary: "Estás usando simbolos no aceptados",
                    })
                    : (errors = { ...errors, summary: "El límite de caracteres es 200" });
            }
        }

        form.description?.trim();
        form.description?.replaceAll("\\s{2,}", " ");
        const regDescription = /^[a-zA-Z0-9ñáéíóúÁÉÍÓÚÜü  .,]{1,2000}$/;
        if (regDescription.test(form.description)) {
            errors = { ...errors, description: "" };
        } else {
            if (form.description === "") {
                errors = { ...errors, description: "" };
            } else {
                errors = {
                    ...errors,
                    description: "El texto ingresado contiene errores",
                };
            }
        }

        return errors;
    };

    const deleteProject = async () => {
        Swal.fire({
            title: '¿Está seguro(a) de eliminar este proyecto?',
            text: "Esta acción no se puede revertir",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#007200',
            cancelButtonColor: '#9d0208',
            confirmButtonText: 'Confirmar'
        }).then(async (result) => {
            if (result.isConfirmed) {

                try {
                    await clienteAxios.delete(`${process.env.NEXT_PUBLIC_BACK_APP_URL}/project/${projectData.id}`)

                    Swal.fire({
                        icon: 'success',
                        title: 'Cambios realizados correctamente',
                        text: 'Recargaremos la página con tus nuevos datos',
                        timer: 2000,
                        showConfirmButton: false,
                        willClose: () => {
                            window.location.reload()
                        }
                    })
                } catch (error) {
                    console.log(error.message)
                }
            }
        })
    }

    const toMayus = (str) => {
        return str[0].toUpperCase() + str.slice(1)
    }

    const formatGoal = (num) => {
        if (!num) {
            return 'No info';
        }

        const exp = /(\d)(?=(\d{3})+(?!\d))/g;
        const rep = '$1,';
        let arr = num.toString().split('.');
        arr[0] = arr[0].replace(exp, rep);
        return arr[1] ? arr.join('.') : arr[0];
    }

    const isValid =
        form.title !== "" &&
        form.summary !== "" &&
        form.description !== "" &&
        errors.title === "" &&
        errors.summary === "" &&
        errors.description === ""

    return (
        <>
            <form onSubmit={submitHandler} className={style.formContainer}>
                <h1 className={style.title}>Edita tu proyecto:</h1>
                <div className={style.formInput}>
                    <div>
                        {errors.title && (
                            <span className={style.danger}>{errors.title}</span>
                        )}
                    </div>
                    <div className={style.question}>
                        <label>Título</label>
                        <input
                            type="text"
                            value={form.title}
                            onChange={changeHandler}
                            name="title"
                        />

                    </div>

                    <div>
                        {errors.summary && (
                            <span className={style.danger}>{errors.summary}</span>
                        )}
                    </div>
                    <div className={style.question}>
                        <label>Resumen</label>
                        <input
                            type="text"
                            value={form.summary.replace(/<[^>]+>/g, "")}
                            onChange={changeHandler}
                            name="summary"
                        />

                    </div>

                    <div>
                        {errors.description && (
                            <span className={style.danger}>{errors.description}</span>
                        )}
                    </div>
                    <div className={style.questionText}>
                        <label>Tu descripción aquí...</label>
                        <textarea
                            rows="8"
                            cols="30"
                            value={form.description}
                            onChange={changeHandler}
                            name="description"
                        />

                    </div>
                    <div>
                        {errors.goal && (
                            <span className={style.danger}>{errors.goal}</span>
                        )}
                    </div>
                </div>

                <div className={style.div_extrainfo}>
                    <div className={style.div_info}>
                        <FontAwesomeIcon icon={faCircleInfo} /> La siguiente información no puede ser editada
                    </div>

                    <div className={style.div_status}>
                        <label>Estado del proyecto:</label>
                        <h3>{toMayus(projectData.validated)}</h3>
                    </div>

                    <div className={style.div_goal}>
                        <label>Meta:</label>
                        <h3>${formatGoal(projectData.goal)}</h3>
                    </div>

                    <div className={style.div_date}>
                        <label>Fecha de creación:</label>
                        <h3>{projectData.date}</h3>
                    </div>

                    <div className={style.div_country}>
                        <label>País:</label>
                        <h3>{projectData.country.name}</h3>
                    </div>

                    <div className={style.div_categories}>
                        <label>Categorías</label>
                        {
                            projectData.categories.map((elem, index) => {
                                if (elem.name.includes('null')) {
                                    return null
                                } else {
                                    return (
                                        <h3 key={index}>{`${index + 1}) ${toMayus(elem.name)}`}</h3>
                                    )
                                }
                            })
                        }
                    </div>

                    <div className={style.div_img}>
                        <label>Imagen del proyecto</label>
                        <img src={projectData.img} alt="Imagen del proyecto" />
                    </div>
                </div>

                <button

                    className={isValid ? style.submit : style.disabled}
                    type="submit"
                    disabled={!isValid}
                >
                    Actualizar proyecto
                </button>

                <button className={style.delete_project} onClick={deleteProject} type='button'>
                    Eliminar proyecto
                </button>
            </form>
        </>
    );
}


/*
Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui architecto fuga omnis Ipsum perferendis temporibus excepturi esse ipsam necessitatibus consequatur quidem molestias architecto doloribus mollitia eligendi quae, voluptate adipisci nemo.
*/
