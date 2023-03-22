import Layout from "../../components/Layout";
import { useEffect, useState, useCallback } from "react";
import style from "./styles/createProject.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  authedUser,
  createProject,
  getHomeProjects,
} from "../../redux/actions";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import clienteAxios from "config/clienteAxios";
import { ClipLoader } from "react-spinners";
import Swal from "sweetalert2";
export default function CreateProject() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(getHomeProjects());
  }, []);

  const [loading, setLoading] = useState(false);

  const [urlImage, setUrlImage] = useState(null);

  let arrCategory = useSelector((state) => state.category);
  let arrCountry = useSelector((state) => state.country);

  const userId = useSelector((state) => state.user?.id);
  const user_name = useSelector((state) => state.user?.user_name);

  const initialFormValues = {
    title: "",
    summary: "",
    description: "",
    goal: "",
    country: "",
    category: [],
    userId: null,
    user_name: null,
  };

  const [form, setForm] = useState(initialFormValues);
  const [message, setMessage] = useState(null);


  const [errors, setErrors] = useState({
    title: "",
    summary: "",
    description: "",
    goal: "",
    country: "",
    category: "",
  });

  useEffect(() => {
    if (userId) {
      setForm({
        ...form,
        userId: userId,
        user_name: user_name,
        img: urlImage,
      });
    }
  }, [userId, user_name, urlImage]);
  const [alert, setAlert] = useState("");

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
      form.description !== "" &&
      form.goal !== "" &&
      form.country !== "" &&
      form.category.length !== 0 &&
      form.category.length <= 5
    ) {
      if (
        errors.title === "" &&
        errors.summary === "" &&
        errors.description === "" &&
        errors.goal === ""
      ) {
        setForm({ ...form, userId: userId, user_name: user_name });
        // console.log(form)
       
          try {
            const response =  await clienteAxios.post("/project", form);

            setForm({
              title: "",
              summary: "",
              description: "",
              goal: "",
              country: "",
              category: [],
              userId: null,
              user_name: null,
            })

            Swal.fire({
              icon: 'success',
              title: 'Proyecto creado correctamente',
              text: 'Tu proyecto se encuentra en revision, te enviamos un correo para mas informacion',
              timer: 2000,
              showConfirmButton: false,
              willClose: () => {
                 router.push('/home')
              }
          })
          } catch (error) {
            console.log(error)
          }
        // dispatch(createProject(form));

      }
    }
  };

  const handleCheck = (event) => {
    const check = event.target.value;
    let arrAux = [...form.category];
    if (arrAux.length) {
      const aux = arrAux.filter((cat) => cat !== check);
      aux.length === arrAux.length //si da verdadera significa que no estaba check dentro de arrCategory, por lo tanto lo pusheamos
        ? arrAux.push(check)
        : (arrAux = [...aux]); // si estaba adentro devolvemos el array filtrado
    } else {
      arrAux.push(check);
    }
    if (arrAux.length > 5) {
      setErrors({
        ...errors,
        category: "solo se permiten hasta 5 categorias por proyecto",
      });
      setForm({ ...form, category: arrAux });
    } else {
      setErrors({ ...errors, category: "" });
      setForm({ ...form, category: arrAux });
    }
  };

  const handleCountry = (event) => {
    setForm({ ...form, country: event.target.value });
  };

  const validate = (form) => {
    const regTitle = /^[^0-9]{1,40}$/;
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
        if (/[0-9]/.test(form.title)) {
          errors = {
            ...errors,
            title: "El título no puede contener números",
          };
        } else {
          errors = {
            ...errors,
            title: "El título no puede contener más de 30 caracteres",
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
    const regDescription = /^[a-zA-Z0-9ñáéíóúÁÉÍÓÚÜü .,]{1,2000}$/;
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

    if (form.goal < 1000001 && form.goal > 99) {
      errors = { ...errors, goal: "" };
    } else {
      if (form.goal === "") {
        errors = { ...errors, goal: "" };
      } else {
        errors = {
          ...errors,
          goal: "El número ingresado como meta debe ser entre 100 y 1.000.000",
        };
      }
    }

    return errors;
  };

  //dropzone configuraciones

  const onDropRejected = () => {
    setAlert(
      "No se pudo subir la imagen. Asegúrate que sea una imagen PNG, JPG, JPEG o WEBP y que no supere 5MB"
    );
  };

  const onDropAccepted = useCallback(async (acceptedFiles) => {
    const formData = new FormData();
    formData.append("image", acceptedFiles[0], acceptedFiles[0].name);

    await uploadImage(formData);
  }, []);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDropRejected,
      onDropAccepted,
      accept: {
        "image/png": [".png", ".jpg", ".jpeg", ".webp"],
      },
    });

  const uploadImage = async (formdata) => {
    try {
      setLoading(true);

      const response = await clienteAxios.post("images/upload", formdata);

      setUrlImage(response.data.imageUrl);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const files = acceptedFiles.map((file) => (
    <li key={file.lastModified}>
      <p>{file.path}</p>
      <p>{(file.size / Math.pow(1024, 2)).toFixed(2)} MB</p>
    </li>
  ));

  const isValid =
    form.title !== "" &&
    form.summary !== "" &&
    form.description !== "" &&
    form.goal !== "" &&
    form.country !== "" &&
    form.category.length !== 0 &&
    form.category.length <= 5 &&
    errors.title === "" &&
    errors.summary === "" &&
    errors.description === "" &&
    errors.goal === "";

  return (
    <Layout>
      <div className={style.containerCreateProject}>
        <form onSubmit={submitHandler} className={style.formContainer}>
        

          <h1 className={style.title}>Crea tu proyecto:</h1>
          <div className={style.formInput}>
            <div>
              {errors.title && (
                <span className={style.danger}>{errors.title}</span>
              )}
            </div>
            <div className={style.question}>
              <input
                type="text"
                value={form.title}
                onChange={changeHandler}
                name="title"
                maxLength='40'
              />
              <label className={form.title !== "" ? style.fix : ""}>
                Título
              </label>
            </div>


            <div>
              {errors.summary && (
                <span className={style.danger}>{errors.summary}</span>
              )}
            </div>
            <div className={style.question}>
              <input
                type="text"
                value={form.summary.replace(/<[^>]+>/g, "")}
                onChange={changeHandler}
                name="summary"
                maxLength='200'
              />
              <label className={form.summary !== "" ? style.fix : ""}>
                Resumen
              </label>
            </div>

            <div>
              {errors.description && (
                <span className={style.danger}>{errors.description}</span>
              )}
            </div>
            <div className={style.questionText}>
              <textarea
                rows="8"
                cols="30"
                value={form.description}
                onChange={changeHandler}
                name="description"
                maxLength='2000'
              />
              <label
                className={form.description !== "" ? style.fixTextarea : ""}
              >
                Tu descripción aquí...
              </label>
            </div>
            <div>
              {errors.goal && (
                <span className={style.danger}>{errors.goal}</span>
              )}
            </div>
            <div className={style.question}>
              <input
                type="number"
                value={form.goal}
                onChange={changeHandler}
                name="goal"
                min='100'
                max='1000000'
              />
              <label className={form.goal !== "" ? style.fix : ""}>Meta</label>
            </div>
            <div>
              {errors.country && (
                <span className={style.danger}>{errors.country}</span>
              )}
            </div>
            <div className={style.question}>
              {/*<input type="text" value={form.country} onChange={changeHandler} name="country"/>*/}
              <div className={style.questionCategory}>
                {
                  <select className={style.select} onChange={handleCountry}>
                    <option disabled selected>
                      País
                    </option>
                    {arrCountry.map((c, index) => {
                      return (
                        <option value={c} key={index}>
                          {c}
                        </option>
                      );
                    })}
                  </select>
                }
              </div>
              <label>País</label>
            </div>
          </div>

          <div className={style.containerDrop}>
            <ul>{files}</ul>
            <ul>
              <img className={style.img} src={urlImage} alt="" />
            </ul>
            {alert && <p>{alert}</p>}
            <div {...getRootProps({ className: style.dropzone })}>
              {loading ? <ClipLoader /> : null}
              <input {...getInputProps()} />

              {isDragActive ? (
                <p>Solta tu imagen aqui</p>
              ) : (
                <p>Selecciona o arrastra tu imagen</p>
              )}
            </div>
          </div>

          <div className={style.containerQuestionCategory}>
            <h2>Categorías: </h2>
            {errors.category && (
              <span className={style.danger}>{errors.category}</span>
            )}
            <div className={style.questionCategory}>
              {arrCategory.map((cat, index) => {
                return (
                  <div className={style.divInput} key={index}>
                    <label>{cat}</label>
                    <input
                      type="checkbox"
                      name={cat}
                      value={cat.toLowerCase()}
                      onChange={handleCheck}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <button
            // disabled={
            //   errors.title === "" &&
            //   errors.summary === "" &&
            //   errors.description === "" &&
            //   errors.goal === "" &&
            //   true
            // }
            className={isValid ? style.submit : style.disabled}
            type="submit"
            disabled={!isValid}
          >
            Enviar datos
          </button>
          {message && <p>{message}</p> }  
        </form>
      </div>
    </Layout>
  );
}
