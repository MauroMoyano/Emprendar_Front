import ModalProject from "./ModalProject/ModalProject"
import { useModal } from "./ModalProject/hooks/useModal"
import style from './styles/profileProject.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import EditProject from '../components/EditProject'


export default function ProfileProject({ projectData }) {

    console.log('projectData ->', projectData)

    const [isOpen, openModal, closeModal] = useModal(false)

    return (
        <div>
            <button onClick={openModal}><FontAwesomeIcon icon={faPenToSquare} /></button>
            <div>
                <img src={projectData.img} alt="" />
            </div>
            <h4>{projectData.title}</h4>
            <h5>{projectData.summary}</h5>
            <ModalProject isOpen={isOpen} closeModal={closeModal}>
                <div>
                    <EditProject />

                </div>
            </ModalProject>
        </div>
    )
}
