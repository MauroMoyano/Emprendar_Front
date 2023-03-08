import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import CardProjectDetail from "../../../components/CardProjectDetail"
import CardUser from "components/CardUser";
import CardDetail from "components/CardDetail"
import Layout from "../../../components/Layout";
import {getDetailProject, getUser, resetDetailProject,  getComments} from "redux/actions";
import style from "../styles/detail.module.css"
import Comments from "components/Comments";
import { authedUser } from "redux/actions";
import Sugerencia from "components/CardSugerencias";

export default function Detail(props) {
    const dispatch = useDispatch()

    //en el use effect tengo que hacer un dspatch para llenar detail user y detailProject
    //tomar la info del id usuario de lla card project 
    useEffect(() => {
        const token = localStorage.getItem('token')

            if(token) {
              
                dispatch(authedUser( () => { 
                    router.push('/home')
                 } ))
                  
            }
    }, [dispatch])

    let userId = props.userId
    let projectId = props.projectId

    useEffect(() => {
        dispatch(getDetailProject(projectId))
        dispatch(getUser(userId))
        dispatch(getComments(projectId))

        return async () => {
            dispatch(resetDetailProject())
        }
    }, [projectId, userId])


    const selectorProject = useSelector(state => state.detailProject)
    const selectorUser = useSelector(state => state.detailUsuario)


    // //manejador de input
    // const handlerDetailProject = (event, obj) => {
    //     dispatch(getDetailProject(obj.id))
    //     event.target.id === "signIn"
    //         ? setChecked(!checked)
    //         : setChecked(false)
    // }

  

    const [checked, setChecked] = useState(false)


    //Con esta funcion manejamos el estado del checkbox si es true mostramos un formulario de Log In si es false de Sign In
    const handlerCheckbox = (event) => {
        event.target.id === "signIn"
            ? setChecked(!checked)
            : setChecked(false)
    }

    //HACER UN PEDIDO A LA API PARA PONER LOS SIMILARES

    return (
              <Layout>
                <div className={style.allview}>
                        <div className={style.conteiner}>
                            <div className={style.firstPage}>
                                <div className={style.barra}></div>
                                <div className={style.cardContainer}>
                                     {/* <!-- /aca tiene que estar detailproject, y otro div donde dentro este el user y botones de donar o comentar --> */}
                                <div className={style.container_detail}>
                                    {
                                       selectorProject 
                                       ? 
                                        Object.keys(selectorProject).length 
                                            ? <CardProjectDetail 
                                                obj={selectorProject}/>

                                            : <>cargando en el detail</>
                                        : null      
                                    }
                                </div>
                                <div className={style.container_muro}> 

                                    <div className={style.info_creator}>
                                        <CardUser />
                                    </div>

                                    <div className={style.container_buttons}>
                                       <div> 
                                            <button className={style.button }>
                                                <span class={style.button_content}>DONAR </span>
                                            </button>
                                        </div>
                                       <div> <button>VER COMENTARIOS</button></div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className={style.secondPage}>
                                <div className={style.first_container}>
                                        <div className={style.sugerencias}> 
                                            <div>
                                                <h3>PROYECTOS SIMILARES</h3>
                                                <div className={style.containerSug} >
                                                    {/* card de proyectos similares */}
                                                    
                                                    <Sugerencia />
                                                    <Sugerencia />
                                                    <Sugerencia />
                                                    
                                                </div>
                                            </div>
                                        </div>


                                        <div className={style.container_comentarios}> 
                                             <Comments projectId ={selectorProject.id} /> 
                                        </div>
                                </div> 
                                <div className={style.second_container}>
                                </div>                      
                            </div>
                        </div>
                    </div>                
                </Layout>
    )
}


export async function getServerSideProps({query}) {
    return {
        props: {
            userId: query.userId[0],
            projectId: query.userId[1]
        }
    }
}

{/* <div className={style.Conteiner}>
                <div className={style.allView}>
                  
                    <div>
                        <label onClick={handlerCheckbox} id="logIn" className={style.label} htmlFor="chk"
                            aria-hidden="true">Detalle
                            del Proyecto</label>
                        {Object.keys(selectorProject).length ?
                            <CardProjectDetail 
                                obj={selectorProject}
                            />
                            : <>cargando en el detail</>
                        }
                        <input type="checkbox" className={style.chk} id="chk" aria-hidden="true" checked={checked}/>

                        <div className={style.tarjetsProjets}>
                            <label onClick={handlerCheckbox} id="signIn" className={style.label} htmlFor="chk"
                                aria-hidden="true">Más Proyectos</label>

                            {
                                selectorUser.userProjects ? selectorUser.userProjects.map((obj) => {
                                        const {id, title, summary, description, date, goal, img, userId} = obj
                                        //enviar este obj al state si es necesario
                                        return (
                                            <div onClick={(event) => handlerDetailProject(event, obj)} id="logIn">

                                                <CardDetail
                                                    key={id}
                                                    idProject={id}
                                                    name={title}
                                                    summary={summary}
                                                    description={description}
                                                    date={date}
                                                    goal={goal}
                                                    img=""
                                                    userId={userId}
                                                />
                                            </div>
                                        )
                                    })
                                    : null
                            }
                        </div>
                        <div className={style.Conteiner_sugerencias}>

                        </div>

                    </div>
                </div>
          </div> */ }