import CardProject from "./CardProject";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { currentPageHandler, getHomeProjects } from "../redux/actions";
import style from "./styles/Paginated.module.css"

export default function Paginated() {
    const currentPage = useSelector(state => state.currentPage)
    const allProjects = useSelector(state => state.allProjects)
    const dispatch = useDispatch()
    const page = []

    useEffect(() => {
        async function fetchData() {
            if (!allProjects.length) {
                await dispatch(getHomeProjects())
                // console.log("get ",allProjects)
                // console.log("carga de get ")
                /* setTimeout(()=>{dispatch(Loading())}, 0 )*/
            }
            fetchData()
        },
        [currentPage])

for (let i = 0; i < allProjects.length ; i = i + 3) {
        page.push(allProjects.slice(i, i + 3 || allProjects.length))
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

    return (
        <div className={style.container}>
            <div>

                <button onClick={handlePrevClick}> Back</button>
                {
                    page?.map((p, index) => <button onClick={handlePage}
                        value={index}
                        key={index}>{index + 1}</button>)

                }
                <button onClick={handleNextClick}> Next</button>
            </div>

            <div className={style.cards}>
                {page[currentPage]?.map(({ id, title, summary, description, date, goal, img, userId }) => {
                    return (
                        <CardProject
                            key={id}
                            idProject={id}
                            name={title}
                            summary={summary}
                            description={description}
                            date={date}
                            goal={goal}
                            img={img}
                            userId={userId}
                        />


                    )
                })}
                {/* <hr /> */}
            </div>
        </div>
    )
}