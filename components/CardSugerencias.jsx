import { useEffect, useState } from "react"
import style from "./styles/rutaDetailUser/sugerencias.module.css" 
import axios from "axios";
import clienteAxios from "config/clienteAxios";
import { useDispatch, useSelector } from "react-redux";
import { similares } from "redux/actions";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getDetailProject, getUser, getComments } from "redux/actions";


export  function CardSugerencia(props){

 console.log("estas son las props", props);
    const {img, summary, title, id,userId } = props.data

    const dispatch = useDispatch()
 
    const handlerDetail = () =>{
        dispatch(getDetailProject(id))
        dispatch(getUser(userId))
        dispatch(getComments(id))

    }

    return(<div onClick={()=>handlerDetail()} className={style.card}>
            <div className={style.img_container}>
                <div className={style.img}>
                    <div id={style.container_information}>
                       <div>
                        <img className={style.imgD } src={img}  alt="" />
                       </div>
                        <p> {title} </p>
                    </div>
                </div>
                <div className={style.description }>
                    {/* <span className={style.title}>
                        {title}
                    </span> */}
                </div>
            </div>
        </div>
)}




export default function Sugerencia(props){ 
    

    const selector =  useSelector((state => state.detailProject))
    const [state,setState] = useState()
    let response

    useEffect(()=>{
 
        if(Object.keys(selector).length){
            let nameCategories = ""
            selector.categories.forEach(element => {
                nameCategories += "categories=" + element.name + "&" 
            });

            async function  name () {
                response = await clienteAxios.get(`/category/similares?${nameCategories}`)
                setState(response.data)
            }
            name()

        }

    },[selector])
    
    const settings = {
        dots: false,
        autoplay: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
    };




    return(  <div className={style.sugerencias}> 
        <div>
            <h3>PROYECTOS SIMILARES</h3>
            <div className={style.containerSug} >
                <div >
                    <Slider   arrowColor= "red"  className={style.scroll} {...settings} >
                    {
                        state
                        ? state?.map((obj)=>{
                            console.log(obj);
                            return<CardSugerencia
                            data = {obj}
                            />

                        })
                        : <>cargando</>
                    }
                </Slider>
            
                </div>
            </div>
        </div>
    </div>
    )
} 
