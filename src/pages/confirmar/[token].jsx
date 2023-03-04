import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmEmail } from "redux/actions";

export default function Detail(props) {
    console.log("estas son las props", props);
    //props.token tiene el toqken que pasen por url
    
    const dispatch = useDispatch();

    useEffect(() => {
        return async () => {
            dispatch(confirmEmail(props.token))
        }
    }, [dispatch])

    const response = useSelector(state=> state.message)


    return (
        <div>
            <h1>{props.token}</h1>
            
                <h2>{response}</h2>
            
        </div>
    )
}


export async function getServerSideProps({query}) {
    console.log("query de la url ", query);
    return {
        props: {
            token: query.token
        }
    }
}