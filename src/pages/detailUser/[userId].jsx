import CardUser from "components/cardUser";
import Project from "components/CardProject";
import DetailProject from "components/cardProjectDetail";
import {useRouter} from "next/router";
import axios from "axios";
import {useEffect, useState} from "react";

const Detail = () => {
    const [user, setUser] = useState()
    const router = useRouter()
    const {userId} = router.query
    console.log("user " + userId)

    useEffect(() => {
        async function fetchData() {
            const {data} = await axios.get(`http://localhost:3001/user/${userId}`)
            setUser(data)
        }
        fetchData()
    },[])
console.log(user)
    return (
        <div>
        <span>
            <h1>Este es el componente Detail de usuario </h1>

            <br/>

            <h1>{user?.user_name}</h1>
            <h1>{user?.name}</h1>
            <h1>{user?.last_name}</h1>
            <h1>{user?.email}</h1>
            <h1>{user?.reputation}</h1>


            <br/>
        </span>
            <span>
            <h1>componente de resumen de proyectos</h1>
                <ul>
                {
                    user?.userProjects.map((p)=>{
                        return (<li>
                            <h1>{p.title}</h1>
                        </li>)
                    })
                }
            </ul>
        </span>

        </div>
        // if (condition) {
        //muestro unoo especifico
        // } else {
        //     muestro todos
        // }

    )


}
export default Detail;