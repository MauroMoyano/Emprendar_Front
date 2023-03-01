import cardProject from "./cardProject";
import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {currentPageHandler, getHomeProjects} from "../redux/actions";

export default function Paginated(){
    const currentPage = useSelector(state => state.currentPage)
    const allProjects = useSelector(state => state.allProjects)
    const dispatch = useDispatch()
    const page = []

    useEffect(() => {

            if (!allProjects.length) {
                dispatch(getHomeProjects())
                /* setTimeout(()=>{dispatch(Loading())}, 0 )*/
            }
        },
        [currentPage, allProjects, dispatch])

    for (let i = 0; i < allProjects.length; i = i + 9) {
        page.push(allProjects.slice(i, i + 9 || allProjects.length))
    }

    const handlePage = (event) => {
        dispatch(currentPageHandler(parseInt(event.target.value)))
    }

    const handlePrevClick = () => {
        currentPage > 0 && dispatch(currentPageHandler(currentPage - 1))
    };

    const handleNextClick = () => {
        currentPage < page.length - 1 && dispatch(currentPageHandler(currentPage + 1))
    }

    return(
        <div>
            <h1>Este es el componete Paginated</h1>
            <button onClick={handlePrevClick}> Back </button>
            {
                page?.map((p, index) => <button onClick={handlePage}
                                               value={index}
                                               key={index} >{index + 1}</button>)

            }
            <button onClick={handleNextClick}> Next </button>
            {/*<CardsConteiner foods={page[currentPage]}/> /////////aqui va el componente o mapeo de la pagina///////////*/}
        </div>
    )
}