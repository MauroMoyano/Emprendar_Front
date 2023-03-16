import ViewMessage from "components/chats/containerMessages";
import Layout from "components/Layout";
import clienteAxios from "config/clienteAxios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import style from "./styles/chats.module.css"



export default function Chats(props){

    //datos del usurio logeado
    const User = useSelector(state => state.user)
    const [users, setUsers] = useState([]) 
    useEffect(()=>{
        if(User){
            //traer todos los chats
            async function getChats (){
                
                //traigo todos los mensajes que envio este usuario                
                let users = await clienteAxios.get(`/chats/users`)
                
                setUsers(users.data)
            } 
            getChats()
        }
    },[User])

    //funcion que cambia el usuario al que se envia un msj
    const [receptor,setReceptor] = useState({})

    //manejasdor del select
    const handlerSelect = (event) => {
        let value = event.target.value
        let user_receptor = users.find((obj)=> obj.user_name === value)
        setReceptor(user_receptor);
      };


    return(
        <Layout>
            <div className={style.container}>
                <div className={style.users_containers}>
                    <h3>Usuarios :</h3>
                    <select name="" id=""  onChange={handlerSelect} >
                        <option disabled selected>
                            ELIGE UN USUARIO PARA CONTACTAR
                        </option>
                        { users.length
                            ? users.map(u =>{
                                return <option
                                    key={u.id}
                                    value={u.user_name}
                                >
                                    {u.user_name}
                                </option>
                            })  
                            : null 

                        }
                    </select>
                </div>
                <div className={style.box}>
                    <div className={style.conversaciones}> </div>

                    {
                      Object.keys(receptor).length 
                        ?   <div className={style.viewMessage}>
                                <div className={style.receptor}>
                                    <h3>{receptor.user_name}</h3>   
                                </div>
                                <div className={style.view} >
                                    <ViewMessage
                                        
                                        userSender = {User}
                                        receptor = {receptor}
                                    />
                                </div>
                            </div>
                        : null    
                    }              
                </div>        
            </div>   
        </Layout>
    )
}

// <div className={style.sinReceptor} ></div>