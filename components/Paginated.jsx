import CardProject from "./CardProject";

import SyncLoader from "react-spinners/ClipLoader";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentPageHandler, getHomeProjects, getProjectToScroll, resetScroll } from "../redux/actions";
import style from "./styles/Paginated.module.css"
import axios from "axios";

//importacion de iconos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

export default function Paginated(/* data */) {

    /* const { toPath } = data */

    /* const currentPage = useSelector(state => state.currentPage) */
    const { allProjects, numPages, pathValue } = useSelector(state => state)

    const dispatch = useDispatch()

    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false)

    const [control, setControl] = useState(true)

    useLayoutEffect(() => {
        let fetchData = async () => {
            await Promise.all([
                dispatch(resetScroll()),
                setPage(1),
                console.log('entrooo'),
                dispatch(getProjectToScroll(1, pathValue)),
                setControl(!control)
            ])
        }
        fetchData()
    }, [pathValue])

    const loadMore = () => {
        if (numPages > page) {
            setIsLoading(true)
            dispatch(getProjectToScroll(page + 1, pathValue))
            setPage(page + 1)
            setIsLoading(false)
            setControl(false)
        }

    }
    let  renderizados = []


    return (
        <div className={style.container}>
            <div className={style.cards}>
                {
                    allProjects?.map(project => {
                        let result = renderizados.findIndex(data => data === project.id )
                        if (result === -1) {
                        return (
                            <CardProject
                                key={project.id}
                                idProject={project.id}
                                name={project.title}
                                summary={project.summary}
                                date={project.date}
                                goal={project.goal}
                                img={project.img}
                                userId={project.userId}
                                user_name={project.user?.user_name}
                                profile_img={project.user?.profile_img}
                                categories={project?.categories}
                                country={project.country?.name}
                            />
                        )  } else {
                          
                        }
                      
                    })
                }

                {
                    isLoading && <SyncLoader />
                }

            </div>
            <div className={style.buttonContainer}>
                <button type="button" onClick={() => loadMore()}><FontAwesomeIcon icon={faCirclePlus} className={style.theIcon} />Proyectos</button>
            </div>
        </div>
    )
}