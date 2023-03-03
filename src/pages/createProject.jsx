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
            errors = {...errors, title: "Hay errores en el titulo."}
        }

        if (form.summary.length > 200) {
            errors = {...errors, summary: "Hay errores en el resumen"}
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
                <div className={style.formInput}>
                    <div>
                        <label>Title : </label>
                        <input type="text" value={form.title} onChange={changeHandler} name="title"/>
                        {errors.title && <span>{errors.title}</span>}
                    </div>
                    <div>
                        <label>Summary : </label>
                        <input type="text" value={form.summary.replace(/<[^>]+>/g, '')} onChange={changeHandler}
                               name="summary"/>
                        {errors.summary && <span>{errors.summary}</span>}
                    </div>
                    <div>
                        <label>Description : </label>
                        <textarea rows="8" cols="30" value={form.description} onChange={changeHandler} name="description"/>
                        {errors.description && <span>{errors.description}</span>}
                    </div>
                    <div>
                        <label>Goal : </label>
                        <input type="text" value={form.goal} onChange={changeHandler} name="goal"/>
                        {errors.goal && <span>{errors.goal}</span>}
                    </div>
                    <div>
                        <label>Country : </label>
                        <input type="text" value={form.country} onChange={changeHandler} name="country"/>
                        {errors.country && <span>{errors.country}</span>}
                    </div>
                </div>
                <div className={style.formInput}>
                    <label>Category : </label>
                    {
                        arrCategory.map((cat, index) => {
                            return (
                                <div className={style.formInput} key={index}>
                                    <label>{cat}</label>
                                    <input type="checkbox" name={cat}
                                           value={cat}
                                           onChange={handleCheck}/>

                                </div>
                            )

                        })
                    }
                </div>

                <button  type="submit">Submit</button>

            </form>
            )
        </Layout>
    )
}