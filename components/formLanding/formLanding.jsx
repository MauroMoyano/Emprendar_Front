import style from "../../src/pages/styles/landing.module.css";
import { useState } from "react";
import clienteAxios from "config/clienteAxios";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, signInUser } from "redux/actions";
import { useRouter } from "next/router";

const validateSignIn = (form, users) => {
  //user va a contener todos los user para ver si ya existe ese usuario
  const error = {};
  const { name, last_name, user_name, email, password, profile_img } = form;

  !name || !last_name || !user_name || !email || !password || !profile_img
    ? (error.error = "Se necesitan todos los datos para crear una cuenta")
    : null;
  return error;
};


export default function FormLanding() {


  const message = useSelector(state => state.message)

  const dispatch =useDispatch()

  //SIGN IN
  const [error, setError] = useState({});

  const [confirm, setConfirm] = useState({});

  const router = useRouter()
  const [formSignIn, setFormSignIn] = useState({
    name: "",
    last_name: "",
    user_name: "",
    email: "",
    password: "",
    profile_img: "",
  });

  //manejo de estado formSignIn
  const handlerSignIn = (event) => {
    const prop = event.target.name;
    const value = event.target.value;
    setFormSignIn({ ...formSignIn, [prop]: value });

    //hardcodeo el seundo parametro para ver si funciona
    //validateSignIn({...formSignIn,[prop]:value},[{name:"santiago"}])
    setError();
  };
  //envio de datos SignIn
  const sendDataSignIn = async (data ) => {
    //despachar action
    console.log(data);

      try {
        dispatch(signInUser(data, () => { 
            setFormSignIn({
              name: "",
              last_name: "",
              user_name: "",
              email: "",
              password: "",
              profile_img: "",
            })
         } )) 
        
      } catch (error) {
          console.log('error')
      }
     
  };

    

  //LOG IN
  const [formLogIn, setFormLogIn] = useState({
    email: "",
    password: "",
  });

  //manejo de estado formSignIn
  const handlerLogIn = (event) => {
    const prop = event.target.name;
    const value = event.target.value;
    setFormLogIn({ ...formLogIn, [prop]: value });
  };
  //envio de datos SignIn
  const sendDataLogIn = async (data) => {
    //despachar action
        try {
          dispatch(loginUser(data, () => {
            router.push('/home')
          } ))
        } catch (error) {
          console.log('error')
        }
        
  };

  //funcion que elimina el default que recarga la pagina cuando se envia un formulario
  const handlerSubmit = (event) => {
    event.preventDefault();
  };

  const [checked, setChecked] = useState(false);
  //Con esta funcion manejamos el estado del checkbox si es true mostramos un formulario de Log In si es false de Sign In
  const handlerCheckbox = (event) => {
    event.target.id === "signIn" ? setChecked(!checked) : setChecked(false);
  };

  return (
    <>

    {console.log(message)}

      {message && message.includes('éxito')  ? <p className={style.confirmMessage}>{message}</p> :null }

      {message && !message.includes('éxito') ? <p className={style.errorMessage}>{message}</p>: null}

      <div className={style.main}>
        <input
          type="checkbox"
          className={style.chk}
          id="chk"
          aria-hidden="true"
          checked={checked}
        />

        <div className={style.logIn}>
          <form onClick={handlerSubmit} className={style.form}>
            <label
              onClick={handlerCheckbox}
              id="logIn"
              className={style.label}
              htmlFor="chk"
              aria-hidden="true"
            >
              Iniciar Sesion
            </label>
            <input
              className={style.input}
              name="email"
              value={formLogIn.email}
              onChange={handlerLogIn}
              type="email"
              placeholder="Email del usuario"
            />
            <input
              className={style.input}
              name="password"
              value={formLogIn.password}
              onChange={handlerLogIn}
              type="password"
              placeholder="Contraseña"
            />
            <button onClick={() => sendDataLogIn(formLogIn)}>Entrar</button>
          </form>
        </div>
        <div className={style.sign_In}>
          <form onClick={handlerSubmit} className={style.form}>
            <label
              onClick={handlerCheckbox}
              id="signIn"
              className={style.label}
              htmlFor="chk"
              aria-hidden="true"
            >
              Registrarse
            </label>
            <input
              className={style.input}
              name="name"
              value={formSignIn.name}
              onChange={handlerSignIn}
              type="text"
              placeholder="Nombre"
            />
            <input
              className={style.input}
              name="last_name"
              value={formSignIn.last_name}
              onChange={handlerSignIn}
              type="text"
              placeholder="Apellido"
            />
            <input
              className={style.input}
              name="user_name"
              value={formSignIn.user_name}
              onChange={handlerSignIn}
              type="text"
              placeholder="Nombre de Usuario"
            />
            <input
              className={style.input}
              name="email"
              value={formSignIn.email}
              onChange={handlerSignIn}
              type="text"
              placeholder="Email"
            />
            <input
              className={style.input}
              name="password"
              value={formSignIn.password}
              onChange={handlerSignIn}
              type="password"
              placeholder="Contraseña"
            />
            <input
              className={style.input}
              name="profile_img"
              value={formSignIn.profile_img}
              onChange={handlerSignIn}
              type="text"
              placeholder="foto"
            />
            <p onClick={handlerCheckbox}>Ya tengo cuenta</p>
            <button onClick={() => sendDataSignIn(formSignIn)}>
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
