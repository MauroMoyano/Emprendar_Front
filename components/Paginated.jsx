import CardProject from "./CardProject";

import SyncLoader from "react-spinners/ClipLoader";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentPageHandler, getHomeProjects, getProjectToScroll, resetScroll } from "../redux/actions";
import style from "./styles/Paginated.module.css"
import axios from "axios";

export default function Paginated(/* data */) {

    /* const { toPath } = data */

    /* const currentPage = useSelector(state => state.currentPage) */
    const { allProjects, filterProjects, searchProjects, numPages, pathValue } = useSelector(state => state)

    const dispatch = useDispatch()

    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false)

    const [control, setControl] = useState(true)

    useLayoutEffect(() => {
        dispatch(resetScroll())
        setPage(1)
        console.log('entrooo')
        dispatch(getProjectToScroll(1, pathValue))
        setControl(!control)
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

    /* console.log('scroll top', window.innerHeight + document.documentElement.scrollTop);
    console.log('total scroll', document.documentElement.scrollHeight - 1);

    const handleScroll = () => {
        if (filterProjects?.length !== 0 && searchProjects?.length !== 0) {
            if (window.innerHeight + document.documentElement.scrollTop > document.documentElement.scrollHeight - 1) {
                loadMore()
            }
        }

    };

    if (typeof window !== 'undefined') {
        window.addEventListener('scroll', handleScroll);
    }
 */



    let toView;

    filterProjects.length
        ? toView = filterProjects
        : searchProjects.length
            ? toView = searchProjects
            : toView = allProjects

    return (
        <div className={style.container}>
            <div className={style.cards}>
                {
                    toView?.map(project => {
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
                        )
                    })
                }
                
                    {
                    isLoading && <SyncLoader />
                    }
                
            </div>
            <button type="button" onClick={() => loadMore()}>load More</button>
        </div>
    )
}