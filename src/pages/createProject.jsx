import Layout from "../../components/Layout";
import {useState} from "react";
import style from "./styles/createProject.module.css"
import axios from "axios";
import {useDispatch} from "react-redux";


export default function CreateProject() {
    const dispatch = useDispatch()
    let arrCategory = ["tecnologia", "ambiental", "cultural", "social", "medicina", "educacion", "emprendimiento"]

    const [form, setForm] = useState({
        title: "",
        summary: "",
        description: "",
        goal: "",
        country: "",
        category: []
    })

    const [errors, setErrors] = useState({
        title: "",
        summary: "",
        description: "",
        goal: "",
        country: ""
    })

    const changeHandler = (event)=>  {
        const property = event.target.name
        const value = event.target.value

        setErrors(validate({...form, [property]: value}))
        setForm({...form, [property]: value})
    }

    const submitHandler = async (event) => {
        event.preventDefault()
        const {data} = await axios.post("http://localhost:3001/project", form)
        dispatch(createProject(data))
        history.push('/home')
    }

    const handleCheck = (event) => {
        const check = event.target.value

        if (arrCategory.length) {
            const aux = arrCategory.filter((cat) => cat !== check)
            aux.length === arrCategory.length //si da verdadera significa que no estaba check dentro de arrCategory, por lo tanto lo pusheamos
                ? arrCategory.push(check)
                : arrCategory = [...aux] // si estaba adentro devolvemos el array filtrado

        } else {
            arrCategory.push(check)
        }
        setForm({...form, Category: arrCategory})
    }

    const validate = (form) => {
        const regTitle = /^[^0-9]{1,100}$/
        // console.log("pasando por validate")
        let errors = {}

        if (regTitle.test(form.title)) {
            // console.log("pasando por validate              if")
            errors = {...errors, title: ""}
        } else {
            // console.log("pasando por validate              else")
            errors = {...errors, title: "El título es necesario"}
        }

        if (form.summary.length > 200) {
            errors = {...errors, summary: "El límite de caracteres es 200"}
        } else {
            errors = {...errors, summary: ""}
        }

        /*if (form.step.length) {
            errors = {...errors, step: ""}
        } else {
            errors = {...errors, step: "Hay errores en los pasos introducidos."}
        }*/

        return errors


    }
 
    return (
        <Layout>
            <form onSubmit={submitHandler} className={style.formContainer}>
                <h1 className={style.title}>Crea tu proyecto:</h1>
                <div className={style.formInput}>
                    <div>
                        {errors.title && <span className={style.danger}>{errors.title}</span>}
                    </div>
                    <div  className={style.question}>
                        <input type="text" value={form.title} onChange={changeHandler} name="title"/>
                        <label className={form.title !== "" ? style.fix : ""}>Título</label>
                    </div>
                   
                    <div>
                        {errors.summary && <span className={style.danger}>{errors.summary}</span>}
                    </div>
                    <div  className={style.question}>
                        <input type="text" value={form.summary.replace(/<[^>]+>/g, '')} onChange={changeHandler}
                               name="summary"/>
                        <label className={form.summary !== "" ? style.fix : ""}>Resumen</label> 
                    </div>

                    <div>
                        {errors.description && <span className={style.danger}>{errors.description}</span>}
                    </div>
                    <div  className={style.questionText}>
                        <textarea rows="8" cols="30" value={form.description} onChange={changeHandler} name="description"/>
                        <label className={form.description !== "" ? style.fixTextarea : ""}>Tu descripción aquí...</label>
                    </div>
                    <div>
                        {errors.goal && <span className={style.danger}>{errors.goal}</span>}
                    </div>
                    <div  className={style.question}>
                        <input type="text" value={form.goal} onChange={changeHandler} name="goal"/>
                        <label className={form.goal !== "" ? style.fix : ""}>Meta</label>
                    </div>
                    <div>
                        {errors.country && <span className={style.danger}>{errors.country}</span>}
                    </div>
                    <div  className={style.question}>
                        <input type="text" value={form.country} onChange={changeHandler} name="country"/>
                        <label className={form.country !== "" ? style.fix : ""}>País</label>
                    </div>
                </div>
                <div className={style.containerQuestionCategory}>
                    <h2>Categorías: </h2>
                    <div className={style.questionCategory}>
                    {
                        arrCategory.map((cat, index) => {
                            return (
                                <div className={style.divInput} key={index}>
                                    <label>{cat}</label>
                                    <input type="checkbox" name={cat}
                                           value={cat}
                                           onChange={handleCheck}/>
                                </div>
                            )
                        })
                    }
                </div>
                </div>  
                <button className={style.submit} type="submit">Enviar datos</button>
            </form>
        </Layout>
    )
}