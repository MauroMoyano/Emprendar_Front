import ViewMessage from "components/chats/containerMessages";
import Layout from "components/Layout";
import clienteAxios from "config/clienteAxios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import style from "./styles/chats.module.css"



export default function Chats(props){


    //datos del usurio logeado
    const User = useSelector(state => state.user)
    //funcion que cambia el usuario al que se envia un msj
    const [receptor,setReceptor] = useState({})
    const [users, setUsers] = useState([]) 
         //function que se ejecuta desde el detail de project

 function getDataReceptor (){
    console.log("este es el id",props.querys.IduserReceiver);
    console.log("este es users", users);
    let searchUser = users.find((u)=> u.id === props.querys.IduserReceiver)
    console.log("no encuetro al usuario de ese id", searchUser);
    setReceptor(searchUser)
    
    }
    console.log("esta es la query",props.querys.IduserReceiver);
    let flag = props.querys.IduserReceiver
    useEffect(()=>{
        if(User){
            async function getChats (){
                
                //traigo todos los users                
                let result = await clienteAxios.get(`/chats/users`)
                setUsers(result.data)
                
            } 
            getChats()
            
        }
        return ()=>{
            props.querys.IduserReceiver = flag
        }
      
    },[User])


    useEffect(()=>{

        if (props.querys.IduserReceiver) {
            getDataReceptor()
               
             } else{
                 console.log("nop entro");
             }

    },[users])

   
  

    //manejasdor del select
    const handlerSelect = (event) => {
        props.querys.IduserReceiver = null
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

                    {/* /*{selectorProject ? (
                    Object.keys(selectorProject).length ? (
                      <CardProjectDetail obj={selectorProject} />
                    ) : (
                      <>cargando en el detail</>
                    )
                  ) : null} */ }


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
                        : null    )
                        :<>cargando</>
                    }              
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
// <div className={style.sinReceptor} ></div>