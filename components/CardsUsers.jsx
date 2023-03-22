import Link from 'next/link'
import style from './styles/CardUsers.module.css'



export const CardsUsers = (user) => {

    //console.log(user);


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
                                <p>Reputacion: {user.reputation?.reputation} [{user.reputation?.count}]</p>
                            </div>
                        </div>
                        <div className={style.buttonContainer}>
                            <Link href={`/chats?IduserReceiver=${user?.userId}`}>
                                <button type='button' className={style.button1}>
                                    Contactar
                                </button>
                            </Link>
                            <button type='button' className={style.button2}>Sus proyectos</button>
                        </div>
                    </div>
                    <img src={user?.profile_img} alt='imagen de perfil' />
                </div>
            </div>
        </>
    )
}