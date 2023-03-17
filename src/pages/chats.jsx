import ViewMessage from "components/chats/containerMessages";
import Layout from "components/Layout";
import clienteAxios from "config/clienteAxios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import style from "./styles/chats.module.css"
import hiddenImg from "../../components/chats/img/undraw_Online_test_re_kyfx.png"


export default function Chats(props){

    //datos del usurio logeado
    const User = useSelector(state => state.user)
    
    const [users, setUsers] = useState([]) 
    console.log(users, 'hola')
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
    const handlerSelect = (value) => {
        let user_receptor = users.find((obj)=> obj.id === value)
        setReceptor(user_receptor);
      };

    return(
        <Layout>
            <div className={style.container}>
                <div className={style.box}>
                    <div className={style.conversaciones}>
                        { users.length
                            ? users?.map(u =>{
            
                                return (
                                    <>
                                       <div className={style.chatUser}  onClick={() => handlerSelect(u.id)} >
                                           <img src={u.profile_img} alt="user" />
                                           <p> {u.user_name}</p>
                                       </div>
                                    </>
                                )
                            })  
                            : null 
                        }
                    </div>
                    {
                      Object.keys(receptor).length

                        ?   <div className={style.viewMessage}>
                                <div className={style.receptor}>
                                    <h3>{receptor.user_name}</h3>   
                                </div>
                                <div className={style.view}>

                                    <ViewMessage
                                        userLogeado = {User}
                                        userSender = {User}
                                        receptor = {receptor}
                                    />
                                </div>
                            </div>
                        : <div className={style.hidden}>
                            <img src={hiddenImg} alt="chatImg" />
                            <p>Selecciona un usuario para iniciar un chat</p>   
                        </div>
                    }              
                </div>        
            </div>   
        </Layout>
    )
}

// <div className={style.sinReceptor} ></div>