import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import CardProjectDetail from "../../../components/rutaDetail/cardProjectDetail"
import CardUser from "components/rutaDetail/cardUser";
import Sugerencia from "components/rutaDetail/CardSugerencias";
import Layout from "../../../components/Layout";
import {getDetailProject, getUser, resetDetailProject,  getComments} from "redux/actions";
import style from "../styles/detail.module.css"
import Comments from "components/rutaDetail/Comments";
import { authedUser,similares } from "redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { scrollBottom } from "components/rutaDetail/logic/scroll";

export default function Detail(props) {
    const dispatch = useDispatch()
    let userId = props.userId
    let projectId = props.projectId
    const selectorProject = useSelector(state => state.detailProject)


    
    useEffect(() => {
        dispatch(getDetailProject(projectId))
        dispatch(getUser(userId))
        dispatch(getComments(projectId))
    


        return async () => {
            dispatch(resetDetailProject())
        }
    }, [projectId, userId])

    //me traigo los projectos similares



    if(!Object.keys(selectorProject).length){
        return(
            <>cargando</>
        )
    } else {
        return (
            <Layout>
              <div className={style.allview}>
                      <div className={style.conteiner}>
                          <div className={style.firstPage}>
                              <div className={style.barra}> <Link href={"/home"}> <button>atras </button></Link> </div>
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
                                              <span className={style.button_content}>DONAR </span>
                                          </button>
                                      </div>
                                     <div> </div>
                                  </div>
                              </div>
                              </div>
                          </div>
                          <div className={style.secondPage}>
                              <div className={style.first_container}>
                                      <div > 
                                          <div>
                                             
                                              <div className={style.containerSug} >
                                                  {/* card de proyectos similares */}                                           
                                                  <Sugerencia 
                                                      key ={selectorProject.id}                                                       
                                                  />
                                      

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


    }


   

export async function getServerSideProps({query}) {
    return {
        props: {
            userId: query.userId[0],
            projectId: query.userId[1]
        }
    }
}
