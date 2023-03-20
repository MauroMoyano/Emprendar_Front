import ModalProject from "./ModalProject/ModalProject"
import { useModal } from "./ModalProject/hooks/useModal"
import modalStyle from './styles/modalProject.module.css'
import style from './styles/profileProject.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"


export default function ProfileProject({ projectData }) {

    console.log('projectData ->', projectData)

    const [isOpen, openModal, closeModal] = useModal(false)

    return (
        <div>
            <button onClick={openModal}><FontAwesomeIcon icon={faPenToSquare}/></button>
            <div>
                <img src={projectData.img} alt="" />
            </div>
            <h4>{projectData.title}</h4>
            <h5>{projectData.summary}</h5>
            <ModalProject isOpen={isOpen} closeModal={closeModal}>
                <div>
                    {/* <img src={projectData.img} alt="" /> */}
                    <h2 className={modalStyle.prueba}>{projectData.title}</h2>
                    <h2 className={modalStyle.prueba}>{projectData.summary}</h2>
                    <h2 className={modalStyle.prueba}>{projectData.description}</h2>
                    <h2 className={modalStyle.prueba}>{projectData.goal}</h2>
                    <h2 className={modalStyle.prueba}>{projectData.date}</h2>
                    <h2 className={modalStyle.prueba}>{projectData.project_state}</h2>
                    <h2 className={modalStyle.prueba}>{projectData.country.name}</h2>
                    <h2 className={modalStyle.prueba}>{projectData.categories[0].name}</h2>
                    
                </div>
            </ModalProject>
        </div>
    )
}
