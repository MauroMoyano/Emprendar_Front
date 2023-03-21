import ModalProject from "./ModalProject/ModalProject"
import { useModal } from "./ModalProject/hooks/useModal"
import style from './styles/profileProject.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import EditProject from '../components/EditProject'


export default function ProfileProject({ projectData }) {

    // console.log('projectData ->', projectData)

    const [isOpen, openModal, closeModal] = useModal(false)

    return (
        <div className={style.card_project}>
            <button onClick={openModal}><FontAwesomeIcon icon={faPenToSquare} title='Editar proyecto' /></button>
            <div className={style.div_img}>
                <img src={projectData.img} alt="" />
            </div>
            <h4 className={style.title}>{projectData.title}</h4>
            <h5 className={style.summary} >{projectData.summary}</h5>
            <ModalProject isOpen={isOpen} closeModal={closeModal}>
                <div>
                    <EditProject projectData={projectData} />

                </div>
            </ModalProject>
        </div>
    )
}
