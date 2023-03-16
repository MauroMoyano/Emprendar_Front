import clienteAxios from "config/clienteAxios"
import { useState,useEffect } from "react"
import style from "./style/containerMessages.module.css"
import io from "socket.io-client"

//conexion



let socket

function Message(props){
    return(
        <div className={style.messages}>
          {props.obj.message}
        </div>
    )
}


export default function ViewMessage(props){
    const [messages, setMessages] = useState([])

    async function getMessages (){
                //userSender, userReceiver
                let result = await clienteAxios(`/chats?userSender=${props.userSender.user_name}&&userReceiver=${props.receptor.user_name}`)
                console.log(result.data);
                setMessages(result.data)
    }


    useEffect(()=>{
        socket = io(process.env.NEXT_PUBLIC_BACK_APP_URL)
      
        getMessages()

        socket.emit("abrir_chat", 123)

    },[])


    useEffect(()=>{
        socket.on("send_message", () => getMessages())
    
        

        return () => {
            socket.off("message",  data => console.log(data))
        }
    })
    

    //control del mensaje
    const [text,setTex] = useState("")



    //menejo del input 
    const handlerText = ({target}) =>{
        const {value} = target 
        setTex(value)
    }



    //quito el default del form
    const hanlderSubmit = async (event)=>{
        let data = {
             userSender : props.userSender.user_name,
             userReceiver : props.receptor.user_name,
             message : text
         }
        event.preventDefault()
        socket.emit("message", data)
        await getMessages()
        console.log("este es el array de porqueria que jode",messages);
        setTex("")
    }


    return(
        <div className={style.container} >
            <div className={style.view}>
                {
                    messages ? messages.map((m)=>{
                        return<Message 
                            obj={m}
                        />
                    })   :null
                }
            </div>
            <div className={style.form}>
                <form onSubmit={hanlderSubmit} >
                    <input onChange={handlerText} name="input" type="text" placeholder="..." value={text} />
                    <button onClick={()=>{}}>ENVIAR</button>
                </form>
            </div>
    </div>
    )
}