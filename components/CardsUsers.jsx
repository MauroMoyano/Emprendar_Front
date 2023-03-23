import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { getUser } from 'redux/actions'
import { useModal } from './ModalProject/hooks/useModal'
import ModalProject from './ModalProject/ModalProject'
import style from './styles/CardUsers.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'



export const CardsUsers = (user) => {

    const [isOpen, openModal, closeModal] = useModal(false)

    const dispatch = useDispatch()

    console.log(user);


    return (
        <>
            <div className={style.cardContainer}>
                <div className={style.dataUser}>
                    <div>
                        <div className={style.textContainer}>
                            <div className={style.title}>
                                <h3 className={style.nick_name}>{user?.user_name}</h3>
                            </div>
                            <div className={style.subTitle}>
                                <p>{user?.name} {user?.last_name}</p>
                            </div>
                            <div className={style.subTitle}>
                                <p>Reputacion: {user.reputation?.reputation} <FontAwesomeIcon icon={faStar} className={style.star}/> [{user.reputation?.count}]</p>
                            </div>
                        </div>
                        <div className={style.buttonContainer}>
                            <Link href={`/chats?IduserReceiver=${user?.userId}`}>
                                <button type='button' className={style.button1}>
                                    Contactar
                                </button>
                            </Link>
                            <button type='button' onClick={openModal} className={style.button2}>Sus proyectos</button>
                            <ModalProject isOpen={isOpen} closeModal={closeModal}>
                                <>
                                    <button className={style.modal_close} onClick={closeModal}>X</button>
                                    <div className={style.projects}>
                                        {
                                            user.project.length !== 0
                                                ? user.project?.map(pj => {
                                                    return (
                                                        <div className={style.project}>
                                                            <p className={style.titleProject}>
                                                                {pj?.title}
                                                            </p>
                                                            <Link href={`/detailUser/${user.userId}/${pj.id}`}>
                                                                <button type='button' onClick={() => dispatch(getUser(user.userId))} className={style.buttonProject} >Ver detalles</button>
                                                            </Link>
                                                        </div>
                                                    )
                                                })
                                                : (
                                                    <p className={style.noProject}>
                                                        Este usuario aún no cuenta con proyectos creados.
                                                    </p>
                                                )
                                        }
                                    </div>
                                </>
                            </ModalProject>
                        </div>
                    </div>
                    <img src={user?.profile_img} alt='imagen de perfil' />
                </div>
            </div>
        </>
    )
}