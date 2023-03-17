



export const CardsUsers = (user) => {




    return (
        <>
            <h3>{user?.user_name}</h3>
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
            </ul>
        </>
    )
}