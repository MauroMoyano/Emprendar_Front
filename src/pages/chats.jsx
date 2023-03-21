import ViewMessage from "components/chats/containerMessages";
import Layout from "components/Layout";
import clienteAxios from "config/clienteAxios";
import { use, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import style from "./styles/chats.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import io from "socket.io-client"
let socket


/*<FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#1c3787",}} /> */

export default function Chats(props){
   
    
    //datos del usurio logeado
    const User = useSelector(state => state.user)

    //funcion que cambia el usuario al que se envia un msj
    const [receptor,setReceptor] = useState({})
    const [switchBo, setSwitch ] = useState(true)
    
    //estado de todos los usuarios y copia para manejar los filtros
    const [users, setUsers] = useState([]) 
    const [allUsers,setAllUsers] = useState([])
   
    //estado de mis conversaciones y copia para manejar los filtros
    const [conversations, setConversations] = useState([])
    const [allConversations, setAllConversations]= useState([])

 function getDataReceptor (){
    
    let searchUser = users.find((u)=> u.id === props.querys.IduserReceiver)
   
    setReceptor(searchUser)
    
    }
    
    let flag = props.querys.IduserReceiver
    useEffect(()=>{
        if(User){
            async function getChats (){
               
                //traigo todos los users                
                let result = await clienteAxios.get(`/chats/users`)
                setUsers(result.data)
                setAllUsers(result.data)

                //traer los usuarios con los que converse
                let conversations = await clienteAxios.get(`/chats/getownchats?user=${User.user_name}`)
                setConversations(conversations.data)
                setAllConversations(conversations.data)

                
            } 
            getChats()
            socket = io(process.env.NEXT_PUBLIC_BACK_APP_URL)
                socket.on("messages", (data)=>{
                    //evaluo si en el mensaje nuevo que envio aparexco como el qe recibo o envio, si la respuesta es si redenrizo mis chats 

                    let {userSender,userReceiver } = data;

                    userSender === User.user_name || userReceiver ===  User.user_name 
                        ? getChats()
                        : null
                })
        }
        return ()=>{
            props.querys.IduserReceiver = flag
        }
        
      
    },[User])


    useEffect(()=>{
        if (props.querys.IduserReceiver) {
            getDataReceptor()
               
        } 

    },[users])

   
  

    //manejasdor del select
    const handlerSelect = (value) => {
        props.querys.IduserReceiver = null
        
        let user_receptor = users.find((obj)=> obj.id === value)

        setReceptor(user_receptor);
    };

    //input para filtrado de todos los users
    const [search,setSearch] = useState("")
    
    const handlerSearch = (event)=>{
        const {value} = event.target;
        setSearch(value);
        let filtro = allUsers.filter((u)=> u.user_name.includes(value) );
        setUsers(filtro);
    }

    const handlerSubmit = (event) =>{
        event.preventDefault();
        setSearch("")
    }


    //input para filtrado de todas mis conversaciones
    const [search_conversation,set_search_conversation] = useState("")


    const handlerSearch_conversation = (event)=>{
        const {value} = event.target;
        set_search_conversation(value);

        let filtro = allConversations.filter((u)=> u.user_name.includes(value) );
        setConversations(filtro);
    }

    const handlerSubmit_conversation = (event) =>{
        event.preventDefault();
        search_conversation("")
    }


    //cambios de estado para las busquedas entre mis conversaciones y todos los usuarios

    const handlerSwich = () =>{
        setSwitch(!switchBo)  
    }

    return(
        <Layout>
            <div className={style.container}>               
                <div className={style.box}>
                   <div className={style.firstBox}>
                        {
                            switchBo 

                            ? <div className={style.MyChats} >
                                <form className={style.form} onSubmit={handlerSubmit_conversation}>
                                    <label className={style.lupa} htmlFor="1"> 
                                        <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#1c3787",display:"flex"}} /> 
                                    </label>
                                    <input id="1" className={style.searchBar} type="text" onChange={handlerSearch_conversation} value={search_conversation}/>
                                </form>
                                <div>  <h3 className={style.title}>Mis chats</h3></div>

                                <div className={style.MyChats_container} >
                                      { conversations.length
                                    ? conversations.map((u)=>{
                                        return (
                                            <>
                                                <div className={style.chat}  onClick={() => handlerSelect(u.id)} >
                                                    <img src={u.profile_img} alt="user" />
                                                    <p> {u.user_name}</p>
                                                </div>
                                        
                                            </>
                                        )
                                    }) 
                                    : null
                                    

                                }
                                </div>
                              
                            </div>

                            
                            : <div className={style.conversaciones}>
                              
                                    <form  className={style.form} onSubmit={handlerSubmit}>
                                            <label className={style.lupa} htmlFor="2"> 
                                                <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#1c3787",display:"flex"}} /> 
                                            </label>
                                            <input  id="2" className={style.searchBar} type="text" onChange={handlerSearch} value={search}/>
                                        </form>

                                    <div> <h3 className={style.title}>Todos los usuarios</h3></div>
                          


                                <div className={style.cards}>
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
                           
                        </div>
                        }
                        <div className={style.switchBotton}>
                            <div  className={style.iconUser}   onClick={()=>handlerSwich()}>
                                <FontAwesomeIcon                      
                                        icon={faUserPlus}
                                        style={{color:"white"}}
                                        />
                            </div>
                                
                        </div>
                   </div>
                    
                    <div className={style.secondBox}>
                        { receptor  ?
                        (Object.keys(receptor).length

                            ?   <div className={style.viewMessage}>
                                    <div className={style.receptor}>
                                        <h3>{receptor.user_name}</h3>   
                                    </div>
                                    <div className={style.view} >

                                        <ViewMessage
                                            userLogeado = {User}
                                            userSender = {User}
                                            receptor = {receptor}
                                        />
                                    </div>
                                </div>
                            : <div className={style.hidden}>
                                {/* <img src={hiddenImg} alt="chatImg" /> */}
                                <p>Selecciona un usuario para iniciar un chat</p>   
                            </div>   )
                            :<>cargando</>
                        }              
                    </div>
                </div>        
            </div>   
        </Layout>
    )
}

export async function getServerSideProps({ query }) {
    
   return{
    props:{
        querys :query
    }
   }
}
