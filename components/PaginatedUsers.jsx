import { useDispatch, useSelector } from "react-redux";
import { useState, useLayoutEffect } from "react";
import { getUsersToScroll, resetScroll } from "redux/actions";
import { CardsUsers } from "./CardsUsers"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import style from './styles/PaginatedUsers.module.css'





export const PaginatedUsers = () => {


    const { allUsers, numPages, pathUserValue } = useSelector(state => state)

    const dispatch = useDispatch()

    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false)

    const [control, setControl] = useState(true)

    useLayoutEffect(() => {
        let fetchData = async () => {
            await Promise.all([])
                .then(() => dispatch(resetScroll()))
                .then(() => setPage(1),)
                .then(() => dispatch(getUsersToScroll(1, pathUserValue)),)
                .then(() => setControl(!control))
            console.log('entrooo')
        }

        fetchData()
    }, [pathUserValue])

    const loadMore = () => {
        if (numPages > page) {
            setIsLoading(true)
            dispatch(getUsersToScroll(page + 1, pathUserValue))
            setPage(page + 1)
            setIsLoading(false)
            setControl(false)
        }
    }
    //aca voy a guardar los compentes que ya renderice
    let  renderizados = []
    

    return (
        <div className={style.boxCard}>
            <div className={style.cards}>
                {
                    allUsers?.map(user => {
                        let result = renderizados.findIndex(data => data === user.id )
                        if (result === -1) {
                            renderizados.push(user.id)
                            return (
                                <CardsUsers
                                    key={user.id}
                                    userId={user.id}
                                    user_name={user.user_name}
                                    name={user.name}
                                    last_name={user.last_name}
                                    reputation={user.reputation}
                                    profile_img={user.profile_img}
                                    projects={user.projects}
    
                                />
                            )
                        } else {
                          
                        }
                      
                    })
                }
                <div className={style.buttonContainer}>
                    <button type="button" onClick={() => loadMore()}><FontAwesomeIcon icon={faCirclePlus} /* className={style.theIcon} */ />Mas Usuarios</button>
                </div>
            </div>
        </div>
    )


}