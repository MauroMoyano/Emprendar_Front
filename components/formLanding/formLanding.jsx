import style from "../../src/pages/styles/landing.module.css"
import { useState } from "react";
import validate from "./validateSignIn"
const validateSignIn = (form, users) =>{
//user va a contener todos los user para ver si ya existe ese usuario
    const error = {}
    const {name,last_name,user_name,email,password,profile_img} = form;

    !name||!last_name||!user_name||!email ||!password||!profile_img 
        ? error.error = "Se necesitan todos los datos para crear una cuenta"  
        : null
    return error
}

export default function FormLanding(){
    
    //SIGN IN 
    const [error,setError] = useState({
        error:""
    })


    const [formSignIn,setFormSignIn] = useState({
        name:"",
        last_name:"",
        user_name:"",
        email:"",
        password:"",
        profile_img:""
    })

    //manejo de estado formSignIn 
    const handlerSignIn = (event) =>{
        const prop = event.target.name; 
        const value = event.target.value;
        setFormSignIn({...formSignIn,[prop]:value})

        //hardcodeo el seundo parametro para ver si funciona
        //validateSignIn({...formSignIn,[prop]:value},[{name:"santiago"}])
        setError()
    }
    //envio de datos SignIn
    const sendDataSignIn = (data) =>{
        //despachar action
        console.log(data);
        setFormSignIn(
           { name:"",
            last_name:"",
            user_name:"",
            email:"",
            password:"",
            profile_img:""}
        )
    }
   

    //LOG IN
    const [formLogIn, setFormLogIn] = useState({
        user_name:"",
        password:""
    })

    //manejo de estado formSignIn 
    const handlerLogIn = (event) =>{
        const prop = event.target.name; 
        const value = event.target.value;
        setFormLogIn({...formLogIn,[prop]:value})
    }
    //envio de datos SignIn
    const sendDataLogIn = (data) =>{
        //despachar action
        setFormLogIn({
            user_name:"",
            password:""
        })

    }
    


    //funcion que elimina el default que recarga la pagina cuando se envia un formulario
    const handlerSubmit = (event) =>{
        event.preventDefault() 
    }

    const [checked, setChecked] = useState(false)
    //Con esta funcion manejamos el estado del checkbox si es true mostramos un formulario de Log In si es false de Sign In
    const handlerCheckbox = (event) =>{
        event.target.id === "signIn" 
            ?  setChecked(!checked)
            : setChecked(false)
    }
   
    return(
        <div  className={style.main}>
            <input type="checkbox" className={style.chk} id ="chk" aria-hidden="true" checked={checked}/>

            <div className={style.logIn}>
                <form onClick={handlerSubmit} className={style.form}>
                    <label onClick={handlerCheckbox}  id="logIn" className={style.label} htmlFor="chk" aria-hidden="true">Log in</label> 
                    <input className={style.input} name="user_name" value={formLogIn.user_name} onChange={handlerLogIn} type="text" placeholder="Nombre de Usuario"/>
                    <input className={style.input} name="password" value={formLogIn.password}   onChange={handlerLogIn} type="text" placeholder="Contraseña"/>
                    <button onClick={()=>sendDataLogIn(formLogIn)}>Entrar</button>
                </form>
            </div>
            <div className={style.sign_In}>
                <form onClick={handlerSubmit} className={style.form}>
                    <label onClick={handlerCheckbox} id="signIn" className={style.label} htmlFor="chk" aria-hidden="true">Registrarse</label> 
                    <input className={style.input} name="name" value={formSignIn.name} onChange={handlerSignIn} type="text" placeholder="Nombre"/>
                    <input className={style.input} name="last_name" value={formSignIn.last_name}onChange={handlerSignIn} type="text" placeholder="Apellido"/>
                    <input className={style.input} name="user_name" value={formSignIn.user_name}onChange={handlerSignIn} type="text" placeholder="Nombre de Usuario"/>
                    <input className={style.input} name="email" value={formSignIn.email}onChange={handlerSignIn} type="text" placeholder="Email"/>
                    <input className={style.input} name="password" value={formSignIn.password}onChange={handlerSignIn} type="text" placeholder="Contraseña"/>
                    <input className={style.input} name="profile_img" value={formSignIn.profile_img}onChange={handlerSignIn} type="text" placeholder="foto"/>
                    <p onClick={handlerCheckbox}>Ya tengo cuenta</p>
                    <button onClick={()=>sendDataSignIn(formSignIn)}>Registrarse</button>
                </form>
            </div>

        </div>
    )
}