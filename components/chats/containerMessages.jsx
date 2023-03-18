import clienteAxios from "config/clienteAxios"
import { useState,useEffect } from "react"
import style from "./style/containerMessages.module.css"
import io from "socket.io-client"

let socket

function Message(props){
   console.log("esta es la flag", props.flag);
   let {flag} = props;
    return(
        <div id={  flag || style.enviados} className={style.recividos}>
            <div>
                {props.obj.message}
            </div>
        </div>
    )
}




export default function ViewMessage(props){
    const [messages, setMessages] = useState([])
    // const [receptor, setReceptor] = useState({})
    const [text,setTex] = useState("")
    //

    // console.log( "Props de viewMessage", props);
    async function getMessages (){
        console.log("se hizo una peticion");
                let result = await clienteAxios(`/chats?userSender=${props.userSender.user_name}&&userReceiver=${props.receptor.user_name}`)
                setMessages(result.data)
    }


    useEffect(()=>{
        //monto el historial de mensajes
        getMessages()

        console.log("se monto el components")
        socket = io(process.env.NEXT_PUBLIC_BACK_APP_URL)
        socket.on("messages", (text)=>{
            getMessages()
        })
        return ()=>{
            socket.off("messages", console.log("me desconecto", text))
        }
        //si cambia el receptor cambia el historial
    },[props.receptor.id])

    


    
    
    
    
    //menejo del input 
    const handlerText = ({target}) =>{
        const {value} = target 
        setTex(value)
    }
    //quito el default del form
    const hanlderSubmit = async (event)=>{
        socket.emit("messages", text)
        event.preventDefault()
        let data = {
             userSender : props.userSender.user_name,
             userReceiver : props.receptor.user_name,
             message : text
        }
        //creo el mensaje  
        let newMessage = await clienteAxios.post("/chats",data) 
        setMessages([...messages,newMessage.data])        
        setTex("")
    }


    return(
        <div className={style.container} >
            <div className={style.view}>
                {
                    messages ? messages.map((m)=>{
                        // UserLog = { props.userLogeado}

                        if (props.userLogeado.user_name === m.usersender ) {
                            let flag = false;
                            return<Message
                                flag = {flag}
                                key ={m.id}
                                obj={m}
                                />
                        } else {
                            let flag = false;
                            return<Message
                                flag = {true}
                                key ={m.id}
                                obj={m}
                                />
                        }
                      
                    })   :null
                }
            </div>
            <div className={style.form}>
                <form onSubmit={hanlderSubmit} >
                <input onChange={handlerText} name="input" type="text" placeholder="Escribe tu mensaje aquí..." value={text} />
                    <button onClick={()=>{}}>ENVIAR</button>
                </form>
            </div>
    </div>
    )
}

 {/* 
                            const [flag, set flag] = useState(true)
                            handlerFalg = () =>{
                                setFlag(!flag)
                            }
                            button => onClick = handlerFalg
                            
                            flag = true => {

                                muiestro todas mis conversaciones
                           
                            }

                            false => {
                                todos los users 
                            }
                            
                            */}
