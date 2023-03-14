import { use, useEffect, useRef, useState } from "react"
import style from "./styles/Comments.module.css" 
import { getComments,createComments } from "../../redux/actions"
import { useDispatch, useSelector } from "react-redux";
import { Link, animateScroll as scroll } from "react-scroll";



export function Messages(props){
    const {comment, user } = props;   
    const {profile_img, name} = user;
    return(
        <div className={style.container_message}>          
           <div className={style.perfil}>
                <img src={profile_img} alt="" />
                <p> {name} </p>
           </div>
           <div className={style.message} >
                <p> {comment} </p>
           </div>
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
   

    const hanlderSubmit =(event)=>{
        event.preventDefault()
    }

    const [text,setTex] = useState("")
    const [error,setError] = useState()




    const handlerText = ({target}) =>{
        const {value} = target
        if(value.trim()=== ""){
            setError("No puedes enviar un comentario vacio")
        } else {
            setError()
        }

        setTex(value)
        
    }
    
    const sendData = () =>{
        const userId = user.id
        const comment = text
        const data = {userId,projectId,comment} 


        dispatch(createComments(data))
        dispatch(getComments(projectId))

        setTex("")
    }



    const  divRef = useRef(null)
    const scrollToBottom = () => {
     
    }
    

    useEffect(()=>{

        scrollToBottom()

    }, [selectorComments])


  
   
    

    return(
        <div  className={style.container}>
            <div  ref={divRef}   id="mensajes" className={style.viewMessage}>
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
                <button onClick={()=>sendData(text) } disabled={error} >ENVIAR</button>
            </form>
        </div>
    )
} 
