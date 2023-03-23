import ModalProject from "./ModalProject/ModalProject"
import { useModal } from "./ModalProject/hooks/useModal"
import style from './styles/profileProject.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import EditProject from '../components/EditProject'


export default function ProfileProject({ projectData }) {

    // console.log('projectData ->', projectData)

    const [isOpen, openModal, closeModal] = useModal(false)

    const formatGoal = (num) => {
        if (!num) {
            return 'No info';
        }

        const exp = /(\d)(?=(\d{3})+(?!\d))/g;
        const rep = '$1,';
        let arr = num.toString().split('.');
        arr[0] = arr[0].replace(exp, rep);
        return arr[1] ? arr.join('.') : arr[0];
    }


    return (
        <div className={style.card_project}>

            <button onClick={openModal}><FontAwesomeIcon icon={faPenToSquare} title='Editar proyecto' /></button>
            <div className={style.div_img}>
                <img src={projectData.img} alt="Imagen del proyecto" />
            </div>
            <h4 className={style.title}>{projectData.title}</h4>
            <h5 className={style.summary} >{projectData.summary}</h5>
            <h5 className={style.amount}>Cantidad recolectada: <br /> ${formatGoal(projectData.amount_collected)} / ${formatGoal(projectData.goal)} </h5>
            <ModalProject isOpen={isOpen}>
                <>
                    
                    <EditProject projectData={projectData} closeModal={closeModal} />
                </>
            </ModalProject>
        </div>
    )
}
