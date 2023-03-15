import CardProject from "./CardProject";
import SyncLoader from "react-spinners/ClipLoader";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {currentPageHandler, getHomeProjects} from "../redux/actions";
import style from "./styles/Paginated.module.css"
import axios from "axios";

let bandera = true

export default function Paginated() {


    const currentPage = useSelector(state => state.currentPage)
    const allProjects = useSelector(state => state.allProjects)
    const dispatch = useDispatch()

    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {

        loadMore()
    }, []);

    const loadMore = async () => {

        setIsLoading(true)
        const {data} = await axios.get(`${process.env.NEXT_PUBLIC_BACK_APP_URL}/project?numPage=${page}`)
        if (data.length === 0) bandera = false
        // console.log(bandera)
        setList([...list, ...(data)]);
        setPage(page + 1);
        setIsLoading(false)


    }

    const handleScroll = () => {
        if (bandera) {
            if (window.innerHeight + document.documentElement.scrollTop > document.documentElement.scrollHeight - 1) {
                loadMore()
            }
        }
    };

    if (typeof window !== 'undefined') {
        window.addEventListener('scroll', handleScroll);
    }

    return (
        <div className={style.container}>
            <div className={style.cards}>
                {list?.map(project => {
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
                            categories={project.categories}
                            country={project.country.name}
                        />
                    )
                })}
            </div>
                <div>
                    {
                    isLoading && <SyncLoader />
                    }
                </div>
        </div>
    )
}