import clienteAxios from "config/clienteAxios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getUser } from "redux/actions";
import style from "./styles/cardUser.module.css"


export default function CardUser({ userId }) {


    const dispatch = useDispatch();

    const { detailUsuario, user } = useSelector(state => state)

    let dataToSearchRep = { userQualifier: user?.id, qualifiedUser: detailUsuario?.id }

    console.log(dataToSearchRep);

    const [bandera, setBandera] = useState(true)

    const [value, setValue] = useState('')

    const [rep, setRep] = useState('')


    let valuess = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

    useEffect(() => {
        async function getRep() {
            await Promise.all([await clienteAxios.get(`/reputation/user?userQualifier=${dataToSearchRep?.userQualifier}&qualifiedUser=${dataToSearchRep?.qualifiedUser}`)])
                .then(data => {
                    setValue(data)
                    dataToSearchRep.qualification = data
                    dispatch(getUser(dataToSearchRep.qualifiedUser))
                })
        }
        getRep()
    }, [bandera])

    console.log(bandera);

    console.log(value[0]?.data);

    async function postRep(e) {
        e.preventDefault();
        dataToSearchRep.qualification = e.target.value
        await clienteAxios.post(`/reputation`, dataToSearchRep)
    }

    async function putRep(e) {
        e.preventDefault();
        dataToSearchRep.qualification = e.target.value
        await clienteAxios.put(`/reputation`, dataToSearchRep)
    }



    if (!Object.keys(detailUsuario).length) {
        return (
            <>cargando</>
        )
    } else {
        return (
            <div className={style.cardUser}>
                <div className={style.perfil}>
                    <img className={style.img} src={detailUsuario.profile_img} alt="" />
                </div>
                <div className={style.detailPerfil}>
                    <h5>{detailUsuario.user_name}</h5>
                    <p>Reputacion</p>
                    <p>{detailUsuario?.reputation} [{detailUsuario?.count}]</p>
                    {
                        value[0]?.data === 0
                            ? (
                                (
                                    <div>
                                        valora al usuario:
                                        <select value={dataToSearchRep?.qualification} onChange={(e) => {
                                            postRep(e)
                                            setRep(e.target.value)
                                            setBandera(!bandera)
                                        }}>
                                            {
                                                valuess.map((val,i) => {
                                                    return (<option key={i} value={val} >{val}</option>)
                                                })
                                            }
                                        </select>
                                    </div>
                                )
                            )
                            : (
                                (
                                    <div>
                                        cambiar valoración:
                                        <select value={dataToSearchRep?.qualification} onChange={(e) => {
                                            putRep(e)
                                            setRep(e.target.value)
                                            setBandera(!bandera)
                                        }}>
                                            {
                                                valuess.map((val,i) => {
                                                    return (<option key={i} value={val} >{val}</option>)
                                                })
                                            }
                                        </select>
                                    </div>
                                )
                            )
                    }
                </div>

            </div >
        )
    }


}

