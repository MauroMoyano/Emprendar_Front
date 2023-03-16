import ModalProject from "./ModalProject/ModalProject"
import { useModal } from "./ModalProject/hooks/useModal"
import modalStyle from './styles/modalProject.module.css'

export default function ProfileProject(props) {

    // console.log('props en profileProject ->', props)

    const [isOpen, openModal, closeModal] = useModal(false)

    return (
        <>
            <div>Titulo: {props.projectData.title}</div>
            <button onClick={openModal}>Abrir Modal</button>
            <ModalProject isOpen={isOpen} closeModal={closeModal}>
                <h3 className={modalStyle.prueba}>Este es el modal</h3>
                <h5>Titulo del proyecto: {props.projectData.title}</h5>
            </ModalProject>
        </>
    )
}