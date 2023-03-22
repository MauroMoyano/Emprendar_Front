import { useEffect, useState } from "react"
import style from "./styles/sugerencias.module.css"
import axios from "axios";
import clienteAxios from "config/clienteAxios";
import { useDispatch, useSelector } from "react-redux";
import { similares } from "redux/actions";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { getDetailProject, getUser, getComments } from "redux/actions";
import Link from "next/link";


export function CardSugerencia(props) {

    const { img, summary, title, id, userId } = props.data

    const dispatch = useDispatch()

    // <Link href={`/detailUser/${props.userId}/${props.idProject}`}


    return (<div className={style.card}>
        <Link href={`/detailUser/${userId}/${id}`}  >
            <div className={style.img_container} onClick={() => dispatch(getUser(userId))}>
                <div className={style.img}>
                    <div id={style.container_information}>
                        <div>
                            <img className={style.imgD} src={img} alt="" />
                        </div>
                        <p> {title} </p>
                    </div>
                </div>
                <div className={style.description}>
                    {/* <span className={style.title}>
                            {title}
                        </span> */}
                </div>
            </div>
        </Link>
    </div>
    )
}




export default function Sugerencia(props) {


    const selector = useSelector((state => state.detailProject))


    const [state, setState] = useState()
    let response

    useEffect(() => {

        if (Object.keys(selector).length) {
            let nameCategories = ""
            selector.categories.forEach(element => {
                nameCategories += "categories=" + element.name + "&"
            });

            async function name() {
                response = await clienteAxios.get(`/category/similares?${nameCategories}`)
                setState(response.data)
            }
            name()

        }

    }, [selector])

    const settings = {
        dots: false,
        autoplay: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        useCSS: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };




    return (<div className={style.sugerencias}>
        <div>
            <h3>PROYECTOS SIMILARES</h3>
            <div className={style.containerSug} >
                <div >
                    <Slider className={style.scroll} {...settings} >
                        {
                            state
                                ? state?.map((obj) => {

                                    return <CardSugerencia
                                        data={obj}
                                        key={obj.id}
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
