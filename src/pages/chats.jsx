import Layout from "components/Layout";
import clienteAxios from "config/clienteAxios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import style from "./styles/chats.module.css"



function Message(props){
    return(

        <div>
            <h3>usuario que envia {props.obj.userSender}</h3>
            <h3>usuario que recibe {props.obj.userReceiver}</h3>

            <h2>{props.obj.message}</h2>
        </div>
    )
}





export default function Chats(props){

    const User = useSelector(state => state.user)

    const [messages, setMessages] = useState() 

    let response = null

    useEffect(()=>{
        if(User){
            //traer todos los chats
            async function getChats (){
                response = await clienteAxios.get("/chats?userSender=2")
                setMessages(response.data)
            } 
            getChats()
        }
    },[User])



    return(
        <Layout>
            <div className={style.container}>

                <div className={style.box}>
                {
                    messages ? messages?.map((obj)=>{

                        return <Message 
                           obj = {obj}
                        />

                    }): <>cargando</> 
                  
                }
                </div>
                
            </div>   
        </Layout>
    )
}
