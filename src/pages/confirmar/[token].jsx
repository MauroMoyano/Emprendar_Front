import {useEffect} from "react";

export default function Detail(props) {
    console.log("estas son las props", props);
    //props.token tiene el toqken que pasen por url
    useEffect(() => {
        return async () => {
        }
    }, [])

    return (
        <h1>{props.token}</h1>
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