import style from '../styles/modalProject.module.css'

const ModalProject = ({ children, isOpen, closeModal }) => {

    const handleModalContainerClick = e => e.stopPropagation()

    return (

        <article onClick={closeModal} className={`${style.modal} ${isOpen && style.is_open}`}>
            <div className={style.modal_container} onClick={handleModalContainerClick}>
                <button className={style.modal_close} onClick={closeModal}>X</button>
                {children}
            </div>
        </article>
    )
}

export default ModalProject