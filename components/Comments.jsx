import { useEffect, useRef, useState } from "react"
import style from "./styles/rutaDetailUser/Comments.module.css" 
import { getComments,createComments } from "../redux/actions"
import { useDispatch, useSelector } from "react-redux";



export function Messages(props){
    const {comment, user } = props;
    const {profile_img, name} = user;
    return(
        <div className={style.message}>
            
            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt="" />
            <h3> {name} </h3>
                <br /> 
            <p> {comment} </p>
        </div>
    )
}



export default function Comments(props){
    //por props recibo el id del porjecto para apendear el comentario nuevo que se haga
    const {projectId } = props; 
    const dispatch = useDispatch()
    const selectorComments = useSelector((state)=>state.comments)


    const user = useSelector((state)=>state.user)


    useEffect(()=>{
        projectId 
        ? dispatch(getComments(projectId)) 
        : null
    },[projectId,selectorComments ])
   
    
    // 1234567489
    //necesitaria traer del reducer todos los comentarios de esta publicaion y renderizar un <Message /> por cada una

    //necesito sacar del redux mi id como usuario que hace un comentario


    const hanlderSubmit =(event)=>{
        event.preventDefault()
    }

    const [text,setTex] = useState("")

    const handlerText = ({target}) =>{
        const {value} = target 
        setTex(value)
    }
    
    //enviar esto {projectId,userId,comment}
    //envio de data 
    const sendData = () =>{
        const userId = user.id
        const comment = text
        
        const data = {userId,projectId,comment} 
        // userId, projectId, comment }
        dispatch(createComments(data))
        dispatch(getComments(projectId))

        setTex("")
    }




    return(
        <div className={style.container}>
            <div className={style.viewMessage}>
              {Object.keys(selectorComments).length 
                ? selectorComments.map((commentObj)=>{
                   const {id, comment, user} = commentObj
                    return <Messages  
                        key={id}
                        comment = {comment}
                        user = {user}
                   /> 
                    
                } ) 
                :<>no hay comentarios aun</> }
            </div>

            <form onSubmit={hanlderSubmit} className={style.writeComment}>
                <input onChange={handlerText} name="input" type="text" placeholder="Dejanos tu comentario" value={text} />
                <button onClick={()=>sendData(text)}>ENVIAR</button>
            </form>
        </div>
    )
} 
