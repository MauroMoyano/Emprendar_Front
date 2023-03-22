import { use, useEffect, useRef, useState } from "react";
import style from "./styles/Comments.module.css";
import {
  getComments,
  createComments,
  deleteComment,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

import io from 'socket.io-client'
let socket




export function Messages(props) {
  const { comment, user, userId } = props;
  const { id } = user;

  const dispatch = useDispatch();

  const handleDelete = async (commentId) => {
    Swal.fire({
      title: "Estas seguro de eliminar el comentario?",
      text: "Esta accion no se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar",
    }).then(async (result) => {
      if (result.isConfirmed) {


    

        dispatch(deleteComment(commentId));

        //console.log(props.projectId)
        socket.emit('eliminar comentario',props.projectId)

        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  return (
    <div className={style.container_message}>
      <div className={style.perfil}>
        <img src={props.commentUser.profile_img} alt="" />
        <p> {props.commentUser.user_name} </p>
      </div>
      <div className={style.message}>
        <p> {comment} </p>
      </div>
      {id === userId ? (
        <FontAwesomeIcon
          className={style.theIcon}
          onClick={() => handleDelete(props.commentId)}
          icon={faTrash}
        />
      ) : null}
    </div>
  );
}

export default function Comments(props) {

    useEffect(() => {
        socket = io(process.env.NEXT_PUBLIC_BACK_APP_URL)

        socket.emit('abrir proyecto', props.projectId)
      },[])

      useEffect(() => { 
            socket.on('comentario agregado', (comentarioNuevo) => {
                dispatch(getComments(comentarioNuevo.projectId))
            })

            socket.on('comentario eliminado', (comentarioNuevo) => {
                //console.log(comentarioNuevo)
                dispatch(getComments(comentarioNuevo))
            })
      }) 

  //por props recibo el id del porjecto para apendear el comentario nuevo que se haga
  const { projectId } = props;
  const dispatch = useDispatch();
  const selectorComments = useSelector((state) => state.comments);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    projectId ? dispatch(getComments(projectId)) : null;
  }, [dispatch]);

  const hanlderSubmit = (event) => {
    event.preventDefault();
  };

  const [text, setTex] = useState("");
  const [error, setError] = useState();

  const handlerText = ({ target }) => {
    const { value } = target;
    if (value.trim() === "") {
      setError("No puedes enviar un comentario vacio");
    } else {
      setError();
    }

    setTex(value);
  };

  const sendData = () => {
    const userId = user.id;
    const comment = text;
    const data = { userId, projectId, comment };

    dispatch(createComments(data));
    // socket io

    socket.emit('nuevo comentario',data)

    

    setTex("");
  };

  const divRef = useRef(null);
  const scrollToBottom = () => {};

  useEffect(() => {
    scrollToBottom();
  }, [selectorComments]);

  return (
    <div className={style.container}>
      <div ref={divRef} id="mensajes" className={style.viewMessage}>
        {Object.keys(selectorComments).length ? (
          selectorComments.map((commentObj) => {
            const { userId, id, comment } = commentObj;
           
            return (
              <Messages
                key={id}
                comment={comment}
                user={user}
                userId={userId}
                commentId={id}
                commentUser={commentObj.user}
                projectId = {commentObj.projectId}
              />
            );
          })
        ) : (
          <>no hay comentarios aun</>
        )}
      </div>

      <form onSubmit={hanlderSubmit} className={style.writeComment}>
        <input
          onChange={handlerText}
          name="input"
          type="text"
          placeholder="Dejanos tu comentario"
          value={text}
        />
        <button className={style.buttonSendMsg} onClick={() => sendData(text)} disabled={error}>OK</button>
      </form>
    </div>
  );
}
