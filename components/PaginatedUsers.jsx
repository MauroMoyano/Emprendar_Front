import { useDispatch, useSelector } from "react-redux";
import { useState, useLayoutEffect } from "react";
import { getUsersToScroll, resetScroll } from "redux/actions";
import { CardsUsers } from "./CardsUsers"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";






export const PaginatedUsers = () => {


    const { allUsers, numPages, pathUserValue } = useSelector(state => state)

    const dispatch = useDispatch()

    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false)

    const [control, setControl] = useState(true)

    useLayoutEffect(() => {
        dispatch(resetScroll())
        setPage(1)
        console.log('entrooo')
        dispatch(getUsersToScroll(1, pathUserValue))
        setControl(!control)
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





    return (
        <>
            paginado de usuarios
            <br />
            {
                allUsers?.map(user => {
                    return (
                        <CardsUsers
                            key={user.id}
                            user_name={user.user_name}
                            name={user.name}
                            last_name={user.last_name}
                            reputation={user.reputation}
                            profile_img={user.profile_img}
                            projects={user.projects}

                        />
                    )
                })
            }
            <div>
                <button type="button" onClick={() => loadMore()}><FontAwesomeIcon icon={faCirclePlus} /* className={style.theIcon} */ />Mas Usuarios</button>
            </div>
        </>
    )


}