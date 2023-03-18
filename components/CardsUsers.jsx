import style from './styles/CardUsers.module.css'



export const CardsUsers = (user) => {




    return (
        <>
            {/*  */}
            <div className={style.card}>
                <div className={style.blob} />
                <img className={style.img} src={user?.profile_img} alt="imagen de perfil" />
                <h2>
                    <p>
                        {user?.user_name}
                    </p>
                    <br />
                    <span>
                        <p>
                            {user?.name}
                        </p>
                        <p>
                            {user?.last_name}
                        </p>
                    </span>
                </h2>
                <p>
                    <span>
                        <p>
                            Contactar
                        </p>
                        <p>
                            Ver proyectos
                        </p>
                    </span>
                </p>
            </div>
            {/*  */}
            {/* <h3>{user?.user_name}</h3>
            <h3>{user?.name}</h3>
            <h3>{user?.last_name}</h3>
            <h3>{user?.reputation}</h3>
            <img src={user?.profile_img} alt="imagen de perfil" />
            <ul>
                {
                    user.projects?.map(project => {
                        return (
                            <li>{project.title}</li>
                        )
                    })
                }
            </ul> */}
        </>
    )
}