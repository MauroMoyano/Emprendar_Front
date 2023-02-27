import CardUser from "components/card_user";
import Proyect from "components/card_proyect";
import DetailProyect  from "components/card_proyect_detail";

const Detail = () =>{


    return(
        <div>
            <h1>Este es el componente Detail</h1>

            <CardUser />
            <Proyect />
            <DetailProyect />
        </div>

        // if (condition) {
            //muestro unoo especifico
        // } else {
        //     muestro todos
        // }
    )
    


}
export default Detail;